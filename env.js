import dotenv from 'dotenv'

dotenv.config()

const env = {
  VERCEL_TOKEN: process.env.VERCEL_TOKEN,
  PROJECT_NAME: process.env.PROJECT_NAME || 'tryonyou-app',
  GITHUB_REPO_ID: process.env.GITHUB_REPO_ID,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DATASET_URL: process.env.DATASET_URL,
  HTTPS_PROXY: process.env.HTTPS_PROXY || process.env.https_proxy,
  FORCE_FETCH: process.env.FORCE_FETCH,
  WORKSPACE_ID: process.env.WORKSPACE_ID,
  WORKSPACE_DOMAIN: process.env.WORKSPACE_DOMAIN
}

export default env
