import fetch from 'node-fetch'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import { Client as NotionClient } from '@notionhq/client'
import env from '../env.js'

export const deployToVercel = async () => {
  const response = await fetch('https://api.vercel.com/v13/deployments', {
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
    })
  })

  const data = await response.json()
  console.log(data.url ? `✅ Deploy URL: ${data.url}` : `❌ Vercel error: ${data.error?.message}`)
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2]
  if (arg === 'log') {
    logToNotion('✅ Registro automático desde make')
  } else if (!arg) {
    runAll() // ejecuta todo si no se pasa argumento
  } else {
    console.error(`⚠️  Argumento desconocido: ${arg}`)
    process.exit(1)
  }
}
