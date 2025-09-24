# Component Library

A modern, TypeScript-first React component library built with performance and developer experience in mind.

## Features

- 🎨 **Modern Design System** - Clean, accessible components with multiple variants
- 🔧 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 📦 **Tree Shakeable** - Optimized bundle size with ES modules support
- ♿ **Accessible** - Built with accessibility best practices
- 🎯 **Developer Experience** - Excellent IntelliSense and auto-completion
- 🚀 **Performance** - Optimized for production with minimal runtime overhead

## Installation

This package is published to GitHub Packages. You'll need to configure your project to use GitHub Packages registry for the `@anoopjohn` scope.

### Step 1: Configure Registry

Create or update your `.npmrc` file in your project root:

```bash
@anoopqb:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### Step 2: Generate GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `read:packages` permission
3. Replace `YOUR_GITHUB_TOKEN` in `.npmrc` with your actual token

### Step 3: Install Package

```bash
npm install @anoopqb/component-library
# or
yarn add @anoopqb/component-library
# or
pnpm add @anoopqb/component-library
```

### Alternative: Using Environment Variable

For better security, use an environment variable:

```bash
# .npmrc
@anoopqb:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}

# .env.local (or set in your environment)
NODE_AUTH_TOKEN=your_github_token_here
```

## Usage in Next.js

This component library is optimized for Next.js applications with built-in support for:

- **App Router**: Components work seamlessly with Next.js 13+ App Router
- **Server Components**: Properly marked with `"use client"` directive where needed
- **TypeScript**: Full type safety with Next.js TypeScript setup
- **Tailwind CSS**: Designed to work with Tailwind CSS (make sure it's configured in your Next.js project)

### Next.js Setup Example

```tsx
// app/layout.tsx
import { Header } from '@anoopqb/component-library'
import './globals.css' // Make sure Tailwind CSS is imported

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header 
          logoText="My Next.js App"
          menuItems={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ]}
          sticky
        />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

```tsx
// app/page.tsx
import { Button } from '@anoopqb/component-library'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => console.log('Button clicked!')}
      >
        Get Started
      </Button>
    </div>
  )
}
```

## Usage

### Basic Import

```tsx
import { Button, Header } from '@anoopqb/component-library'

function App() {
  return (
    <div>
      <Header 
        logoText="My App"
        menuItems={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' }
        ]}
      />
      <Button onClick={() => console.log('Clicked!')}>
        Click me
      </Button>
    </div>
  )
}
```

### With TypeScript

```tsx
import { Button, Header, type ButtonProps, type HeaderProps } from '@anoopqb/component-library'

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}

const MyHeader: React.FC<HeaderProps> = (props) => {
  return <Header {...props} />
}
```

## Components

### Header

A responsive navigation header component with logo, menu items, and mobile menu support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `React.ReactNode` | - | Custom logo component/element |
| `logoText` | `string` | - | Text-based logo |
| `logoHref` | `string` | `'/'` | Logo link destination |
| `menuItems` | `MenuItem[]` | `[]` | Array of navigation menu items |
| `className` | `string` | `''` | Additional CSS classes |
| `onLogoClick` | `() => void` | - | Logo click handler (overrides href) |
| `mobileMenuButton` | `boolean` | `true` | Show mobile menu toggle button |
| `sticky` | `boolean` | `false` | Make header sticky to top |

#### MenuItem Interface

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Menu item text |
| `href` | `string` | - | Link destination |
| `onClick` | `() => void` | - | Click handler (overrides href) |
| `active` | `boolean` | `false` | Mark item as active/current |
| `disabled` | `boolean` | `false` | Disable the menu item |

#### Examples

```tsx
// Basic header with logo text
<Header 
  logoText="My Company"
  menuItems={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]}
/>

// Header with custom logo component
<Header 
  logo={<img src="/logo.svg" alt="Logo" className="h-8 w-8" />}
  logoText="My App"
  menuItems={[
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Settings', href: '/settings' }
  ]}
/>

// Header with click handlers
<Header 
  logoText="My App"
  onLogoClick={() => console.log('Logo clicked')}
  menuItems={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Profile', onClick: () => openProfile() },
    { label: 'Logout', onClick: () => logout(), disabled: isLoading }
  ]}
/>

// Sticky header
<Header 
  logoText="My App"
  sticky
  menuItems={menuItems}
/>

// Header without mobile menu
<Header 
  logoText="My App"
  mobileMenuButton={false}
  menuItems={menuItems}
/>
```

#### Features

- **Responsive Design**: Automatically collapses to mobile menu on smaller screens
- **Flexible Logo**: Support for text, images, or custom React components
- **Navigation Options**: Support for both links and click handlers
- **Active States**: Highlight current page/section
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Sticky Option**: Can be made sticky to viewport top
- **Customizable**: Easy to style with additional CSS classes

### Button

A versatile button component with multiple variants, sizes, and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button content |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable the button |
| `className` | `string` | `''` | Additional CSS classes |

All standard HTML button attributes are also supported via `React.ButtonHTMLAttributes<HTMLButtonElement>`.

#### Examples

```tsx
// Basic usage
<Button>Default Button</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Loading...</Button>

// With custom styling
<Button className="my-custom-class">Custom Styled</Button>

// With click handler
<Button onClick={() => alert('Hello!')}>
  Click me
</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

#### Styling

The Button component uses Tailwind CSS classes for styling. Make sure your project has Tailwind CSS configured, or provide your own CSS classes via the `className` prop.

Default styles include:
- Focus ring for accessibility
- Hover states for better UX
- Disabled states with reduced opacity
- Smooth transitions
- Loading spinner animation

## Development

### Prerequisites

- Node.js 16+ 
- pnpm (recommended) or npm/yarn

### Setup

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the library
pnpm build

# Type check
pnpm type-check
```

### Project Structure

```
src/
├── components/
│   └── Button/
│       └── index.tsx
└── index.ts
```

### Building

The library is built using [tsup](https://tsup.egoist.dev/) which provides:

- CommonJS and ES modules output
- TypeScript declaration files
- Source maps
- Tree shaking support

Build outputs:
- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ES modules bundle  
- `dist/index.d.ts` - TypeScript declarations
- Source maps for debugging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Organization]

## Changelog

### 0.1.0

- Initial release
- Button component with variants, sizes, and loading states
- Full TypeScript support
- Accessibility features
