# Contributing to TRY-ON

Thank you for your interest in contributing to TRY-ON! We welcome contributions from the community and appreciate your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please:

1. **Search existing issues** to see if the problem has already been reported
2. **Check the documentation** to ensure you're using the feature correctly
3. **Verify the bug** in the latest version if possible

When creating a bug report, please use the Bug Report template and include:

- A clear, descriptive title
- Detailed steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots or screen recordings if applicable
- Environment details (browser, OS, device)
- Console logs or error messages

### Suggesting Features

We love to hear new ideas! Before submitting a feature request:

1. **Search existing issues** to see if someone has already suggested it
2. **Check the roadmap** to see if it's already planned
3. **Consider the scope** - does it align with the project's goals?

When suggesting a feature, please use the Feature Request template and include:

- A clear problem statement
- Your proposed solution
- Alternative approaches you've considered
- Use cases and user stories
- Mockups or examples if available

### Submitting Pull Requests

We welcome pull requests! Here's how to get started:

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following our coding guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

#### Pull Request Guidelines

- **Keep changes focused** - one feature/fix per PR
- **Write clear commit messages** - use conventional commits format
- **Include tests** when adding new functionality
- **Update documentation** for user-facing changes
- **Ensure CI passes** - all tests and checks must pass
- **Request review** from maintainers when ready

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat(avatar): add support for custom body measurements

Implement a new feature that allows users to input custom body measurements
for more accurate avatar generation. This includes validation and storage
of measurement data.

Closes #123
```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Tryonme-com/tryon-app.git
   cd tryon-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Structure

```
tryon-app/
├── .github/           # GitHub configuration and workflows
├── agents/            # AI agent modules
├── api/               # Backend API endpoints
├── components/        # Reusable React components
├── css/               # Stylesheets
├── data/              # Static data files
├── docs/              # Documentation
├── frontend/          # Frontend application code
├── public/            # Public static assets
├── scripts/           # Utility scripts
├── src/               # Main source code
├── tests/             # Test files
└── README.md          # Project documentation
```

For a detailed overview, see [docs/repository_structure.md](docs/repository_structure.md).

## Coding Guidelines

### JavaScript/TypeScript

- Use ES6+ syntax
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Avoid console.log in production code

### HTML/CSS

- Use semantic HTML5 elements
- Follow BEM methodology for CSS class names
- Ensure responsive design (mobile-first approach)
- Test across different browsers

### Python

- Follow PEP 8 style guide
- Use type hints where appropriate
- Add docstrings to functions and classes

### General Principles

- **DRY (Don't Repeat Yourself)** - Extract common logic into reusable functions
- **KISS (Keep It Simple, Stupid)** - Favor simple, readable solutions
- **YAGNI (You Aren't Gonna Need It)** - Don't add functionality until it's needed
- **Write self-documenting code** - Code should be clear without excessive comments

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Write tests for new features and bug fixes
- Follow the existing test structure and conventions
- Aim for meaningful test coverage
- Test edge cases and error conditions

### Manual Testing

Before submitting a PR:

1. Test your changes in multiple browsers (Chrome, Firefox, Safari)
2. Test on different screen sizes (desktop, tablet, mobile)
3. Verify that existing functionality still works
4. Check console for errors or warnings

## Documentation

Good documentation helps everyone! When contributing:

- Update the README if you change functionality
- Add JSDoc comments to functions
- Update relevant docs in the `docs/` folder
- Include examples and use cases
- Keep documentation in sync with code changes

### Documentation Standards

- Use clear, concise language
- Include code examples where helpful
- Add screenshots for UI changes
- Link to related documentation
- Keep formatting consistent

## Getting Help

If you need help or have questions:

- 📚 Check the [documentation](README.md)
- 💬 Start a [discussion](https://github.com/Tryonme-com/tryon-app/discussions)
- 🐛 Search [existing issues](https://github.com/Tryonme-com/tryon-app/issues)
- 📧 Contact the maintainers

## Recognition

Contributors will be recognized in:

- The project's README
- Release notes for significant contributions
- Special mentions in the community

Thank you for contributing to TRY-ON! 🎉

---

## Quick Checklist for Contributors

Before submitting your PR, make sure:

- [ ] Code follows the project's style guidelines
- [ ] Tests pass locally (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventional commits format
- [ ] Changes are focused and well-described in the PR
- [ ] You've tested across different browsers/devices
- [ ] No console errors or warnings
- [ ] You've read and followed this contributing guide
