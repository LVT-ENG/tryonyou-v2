import { HttpsProxyAgent } from 'https-proxy-agent'
import { exec } from 'child_process'
import { Client as NotionClient } from '@notionhq/client'
import { fileURLToPath } from 'url'
import env from '../env.js'

export const deployToVercel = async () => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: env.PROJECT_NAME,
      gitSource: {
        type: 'github',
        repoId: env.GITHUB_REPO_ID,
        ref: 'main'
      }
    }),
    signal: controller.signal
  }

  if (env.HTTPS_PROXY) {
    options.agent = new HttpsProxyAgent(env.HTTPS_PROXY)
  }

  try {
    const response = await fetch('https://api.vercel.com/v13/deployments', options)
    const data = await response.json()
    console.log(data.url ? `✅ Deploy URL: ${data.url}` : `❌ Vercel error: ${data.error?.message}`)
  } catch (err) {
    console.error('❌ Network error:', err.message)
  } finally {
    clearTimeout(timeout)
  }
}

export const pushToGitHub = () => {
  exec('git add . && git commit -m "Auto push desde bot" && git push', (err, stdout, stderr) => {
    if (err) return console.error('❌ GitHub error:', stderr)
    console.log('✅ GitHub push:', stdout)
  })
}

const notion = new NotionClient({ auth: env.NOTION_TOKEN })

export const logToNotion = async message => {
  try {
    await notion.pages.create({
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: message } }] }
      }
    })
    console.log(`🧠 Notion log: ${message}`)
  } catch (err) {
    console.error('❌ Notion error:', err.message)
  }
}

export const runAll = async () => {
  console.log('🚀 Iniciando secuencia de despliegue...')
  await deployToVercel()
  pushToGitHub()
  await logToNotion('🚀 Despliegue automático ejecutado correctamente.')
}

const currentFile = fileURLToPath(import.meta.url)

if (process.argv[1] === currentFile) {
  const cmd = process.argv[2]
  const msg = process.argv.slice(3).join(' ') || 'Operación completada'
  switch (cmd) {
    case 'deploy':
      deployToVercel()
      break
    case 'push':
      pushToGitHub()
      break
    case 'log':
      logToNotion(msg)
      break
    case undefined:
    case 'all':
      runAll()
      break
    default:
      console.error(`Comando no reconocido: ${cmd}`)
  }
}
