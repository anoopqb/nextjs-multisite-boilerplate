# Publishing Guide

This guide explains how to publish the component library to GitHub Packages.

## Prerequisites

1. **GitHub Repository**: Make sure this code is pushed to a GitHub repository
2. **GitHub Token**: You need a GitHub Personal Access Token with `write:packages` permission

## Setup GitHub Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Component Library Publishing"
4. Select the following scopes:
   - `write:packages` (to publish packages)
   - `read:packages` (to download packages)
   - `repo` (if the repository is private)
5. Click "Generate token"
6. **Important**: Copy the token immediately (you won't see it again)

## Publishing Methods

### Method 1: Automated Publishing (Recommended)

The GitHub Actions workflow will automatically publish when you:

1. Push to the `main` branch with changes in the `component-library/` directory
2. Create a new release
3. Manually trigger the workflow

**Setup:**
1. Push your code to GitHub
2. The workflow will run automatically on the next push to `main`

### Method 2: Manual Publishing

**Step 1: Set up authentication**
```bash
# Set your GitHub token as an environment variable
export NODE_AUTH_TOKEN=your_github_token_here
```

**Step 2: Build and publish**
```bash
cd component-library

# Install dependencies
pnpm install

# Build the package
pnpm run prepublishOnly

# Publish to GitHub Packages
pnpm run publish:github
```

### Method 3: Direct npm publish

```bash
cd component-library

# Login to GitHub Packages (one-time setup)
npm login --scope=@anoopjohn --registry=https://npm.pkg.github.com

# Build and publish
npm run prepublishOnly
npm publish
```

## Version Management

To publish a new version:

1. **Update version in package.json:**
   ```bash
   npm version patch  # for bug fixes (0.1.0 → 0.1.1)
   npm version minor  # for new features (0.1.0 → 0.2.0)
   npm version major  # for breaking changes (0.1.0 → 1.0.0)
   ```

2. **Push the changes:**
   ```bash
   git push origin main --tags
   ```

3. **The automated workflow will publish the new version**

## Verification

After publishing, you can verify the package is available:

1. Go to your GitHub repository
2. Click on the "Packages" tab
3. You should see `@anoopjohn/component-library` listed

## Using the Published Package

### In a Next.js Project

1. **Create `.npmrc` in your Next.js project root:**
   ```
   @anoopjohn:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=your_github_token_here
   ```

2. **Install the package:**
   ```bash
   npm install @anoopjohn/component-library
   ```

3. **Use in your components:**
   ```tsx
   import { Button, Header } from '@anoopjohn/component-library'
   
   export default function MyPage() {
     return (
       <div>
         <Header logoText="My App" />
         <Button>Click me</Button>
       </div>
     )
   }
   ```

## Troubleshooting

### Authentication Issues
- Make sure your GitHub token has the correct permissions
- Verify the token is not expired
- Check that you're using the correct registry URL

### Build Issues
- Run `pnpm run type-check` to check for TypeScript errors
- Run `pnpm run build` to ensure the package builds correctly
- Check that all dependencies are properly installed

### Package Not Found
- Verify the package name matches exactly: `@anoopjohn/component-library`
- Make sure you're authenticated with GitHub Packages
- Check that the package was published successfully

## Security Notes

- **Never commit your GitHub token to version control**
- Use environment variables for tokens in CI/CD
- Consider using fine-grained personal access tokens for better security
- Regularly rotate your access tokens
