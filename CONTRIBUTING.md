# Contributing to TRY-ON

Thank you for your interest in contributing to TRY-ON! We appreciate your support and welcome contributions of all kinds.

## 🙏 How to Contribute

### Reporting Issues

Before creating an issue, please:
1. **Search existing issues** to avoid duplicates
2. **Check the documentation** in the `/docs` folder
3. **Use the appropriate issue template**:
   - 🐛 Bug Report - for bugs or unexpected behavior
   - ✨ Feature Request - for new features or enhancements
   - ❓ Question - for questions about the project

When creating an issue, please provide:
- A clear and descriptive title
- Detailed description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots or code examples when relevant
- Environment details (OS, browser, Node version, etc.)

### Submitting Pull Requests

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following the project's coding style
3. **Test your changes** thoroughly:
   - Run `npm run build` to ensure the project builds
   - Run `npm test` if tests are available
   - Test manually in the browser
4. **Write clear commit messages** describing what and why
5. **Update documentation** if you're changing functionality
6. **Submit a pull request** with a clear description of your changes

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/tryon-app.git
cd tryon-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start the API server
node server.js
```

### Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns in the project
- Keep functions small and focused
- Write modular, reusable code

### Testing

- Test your changes in multiple browsers if possible
- Verify that existing functionality still works
- Test edge cases and error conditions
- Run `npm test` if test suite exists

## 🤖 AI Agents

This project includes AI agents in the `/agents` folder. When working with agents:
- Follow the existing agent structure
- Document new agents in `AGENTS.md`
- Ensure agents have proper error handling
- Test agent functionality before submitting

## 📝 Documentation

Good documentation helps everyone:
- Update README.md if you add new features
- Add new docs to the `/docs` folder for complex features
- Include code examples and usage instructions
- Keep documentation clear and concise

## 🔍 Code Review Process

All pull requests go through code review:
1. Automated checks run (build, tests, linting)
2. Project maintainers review the code
3. Feedback is provided if changes are needed
4. Once approved, changes are merged

## 🎯 Getting Help

If you need help:
- Check the `/docs` folder for guides
- Look at existing code for examples
- Ask questions in issue discussions
- Reach out to maintainers

## 📜 Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what's best for the project
- Accept constructive criticism gracefully

## 🏆 Recognition

Contributors are recognized:
- In pull request comments
- In release notes for significant contributions
- As part of the project community

Thank you for contributing to TRY-ON! 🦚
