# TryOnMe - Help & Troubleshooting Guide

Welcome to the TryOnMe help documentation! This guide will help you set up, run, and troubleshoot the application.

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.16.0
- **npm** (comes with Node.js)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tryonme-com/tryon-app.git
   cd tryon-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you see warnings about deprecated packages (like `inflight` or `glob`), these are normal and can be safely ignored. They come from transitive dependencies.

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your API keys and configuration.

### Running the Application

#### Development Mode
```bash
npm run dev
```
Opens the app at `http://localhost:5173` (or another port if 5173 is in use)

#### Production Build
```bash
npm run build
```
Generates optimized files in the `dist/` directory

#### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

#### Run Tests
```bash
npm test
```
Runs all test suites using Jest

## 🔧 Common Issues & Solutions

### Issue: "postinstall script failed"

**Symptom**: Error during `npm install` mentioning "vercel: not found"

**Solution**: This has been fixed. The postinstall script no longer automatically tries to deploy. To deploy manually, use:
```bash
npm run deploy
```

### Issue: Port 5173 is already in use

**Symptom**: Vite says "Port 5173 is in use, trying another one..."

**Solution**: Vite will automatically pick another port (like 5174). This is normal behavior. You can also:
- Kill the process using port 5173: `lsof -ti:5173 | xargs kill`
- Or specify a different port: `vite --port 3000`

### Issue: Module not found errors

**Symptom**: Import errors when running the app

**Solution**: 
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear the Vite cache: `rm -rf node_modules/.vite`

### Issue: Build fails

**Symptom**: `npm run build` produces errors

**Solution**:
1. Ensure you're using Node.js >= 18.16.0: `node --version`
2. Clear cache: `npm cache clean --force`
3. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Issue: Tests failing

**Symptom**: `npm test` shows failed tests

**Solution**:
1. Ensure all dependencies are installed: `npm install`
2. Check if specific test files have issues
3. Run tests in watch mode for debugging: `npm test -- --watch`

### Issue: API endpoints not working

**Symptom**: Fetch errors or 404 responses from `/api/*` endpoints

**Solution**:
1. Ensure the API server is running: `node server.js`
2. Check that `server.js` is configured correctly
3. Verify environment variables in `.env` are set
4. The API server runs on port 4000 by default

### Issue: Environment variables not loading

**Symptom**: Application can't find API keys or configuration

**Solution**:
1. Copy `.env.example` to `.env`: `cp .env.example .env`
2. Fill in all required values in `.env`
3. Restart the dev server after changing `.env`
4. For Vite, only variables prefixed with `VITE_` are exposed to the client

## 📚 Documentation

- **[README.md](README.md)** - Main project documentation
- **[AGENTS.md](AGENTS.md)** - Information about AI agents
- **[docs/deployment_overview.md](docs/deployment_overview.md)** - Deployment guide
- **[docs/repository_structure.md](docs/repository_structure.md)** - Project structure
- **[IMPORTANT_INFO_SUMMARY.md](IMPORTANT_INFO_SUMMARY.md)** - Key project information

## 🔑 Environment Variables

Key environment variables you may need:

### Required for Development
- `NODE_ENV` - Set to `development` or `production`

### Optional for Full Features
- `VERCEL_TOKEN` - For Vercel deployments
- `OPENAI_API_KEY` - For AI features
- `SHOPIFY_ACCESS_TOKEN` - For Shopify integration
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store URL
- `NOTION_TOKEN` - For Notion integration
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - For email notifications

See `.env.example` for a complete list.

## 🛠️ Development Workflow

### Adding a New Feature
1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Build to verify: `npm run build`
5. Commit and push your changes

### Running Linters
Currently, the project uses Jest for testing. To add linting:
```bash
npm install --save-dev eslint
npx eslint --init
```

### Building for Production
```bash
npm run build
```
This creates an optimized build in the `dist/` directory.

## 🚢 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `npm run deploy`
3. Or connect your GitHub repo to Vercel for automatic deployments

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes

### Environment Variables in Production
Make sure to set all required environment variables in your hosting platform's dashboard.

## 🧪 Testing

### Running All Tests
```bash
npm test
```

### Running Specific Tests
```bash
npm test -- tests/agents.test.js
```

### Test Coverage
```bash
npm test -- --coverage
```

## 🤖 AI Agents

The project includes several AI agents in the `agents/` directory:

- **deployScriptMaster** - Automated deployments
- **testRunnerGPT** - Test generation
- **refactorAgentJS** - Code refactoring
- **brandGuardian** - Brand consistency checks
- **fitAIAssistant** - Size recommendations
- And many more...

See [AGENTS.md](AGENTS.md) for detailed information.

## 📞 Getting More Help

### Check the Docs
- Review the `docs/` directory for detailed guides
- Check `IMPORTANT_INFO_SUMMARY.md` for key project info

### GitHub Issues
- Search existing issues: https://github.com/Tryonme-com/tryon-app/issues
- Create a new issue with:
  - Clear description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Your environment (Node version, OS, etc.)

### Common Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Deploy (requires Vercel CLI)
npm run deploy

# Start API server
node server.js

# Check Node version
node --version

# Clear npm cache
npm cache clean --force
```

## 🔒 Security

- Never commit `.env` files
- Keep API keys secure
- Regularly update dependencies: `npm audit fix`
- Report security issues privately to the maintainers

## 📋 Project Status

- ✅ Core application: Working
- ✅ Build system: Working  
- ✅ Tests: Passing
- ✅ Vite dev server: Working
- ✅ Production build: Working

For the latest status, check the GitHub Actions workflows.

---

**Last Updated**: 2025-10-27

Need more help? Open an issue on GitHub or check the documentation in the `docs/` folder.
