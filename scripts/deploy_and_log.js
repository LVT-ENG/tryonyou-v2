import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { Client as NotionClient } from '@notionhq/client'
import env from '../env.js'

dotenv.config()

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

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const arg = process.argv[2]
  if (arg === 'log') {
    logToNotion('🧠 Log manual desde Make')
  } else {
    runAll()
  }
}
