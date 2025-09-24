import React, { useState } from 'react'

export interface MenuItem {
    label: string
    href?: string
    onClick?: () => void
    active?: boolean
    disabled?: boolean
}

export interface HeaderProps {
    logo?: React.ReactNode
    logoText?: string
    logoHref?: string
    menuItems?: MenuItem[]
    className?: string
    onLogoClick?: () => void
    mobileMenuButton?: boolean
    sticky?: boolean
}

const MenuIcon = () => (
    <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
    </svg>
)

const CloseIcon = () => (
    <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
)

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
    (
        {
            logo,
            logoText,
            logoHref = '/',
            menuItems = [],
            className = '',
            onLogoClick,
            mobileMenuButton = true,
            sticky = false,
            ...props
        },
        ref
    ) => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

        const toggleMobileMenu = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
        }

        const handleLogoClick = (e: React.MouseEvent) => {
            if (onLogoClick) {
                e.preventDefault()
                onLogoClick()
            }
        }

        const handleMenuItemClick = (item: MenuItem) => {
            if (item.onClick) {
                item.onClick()
            }
            // Close mobile menu when item is clicked
            setIsMobileMenuOpen(false)
        }

        const baseStyles = 'bg-white shadow-sm border-b border-gray-200'
        const stickyStyles = sticky ? 'sticky top-0 z-50' : ''

        const combinedClassName = [
            baseStyles,
            stickyStyles,
            className
        ].filter(Boolean).join(' ')

        const renderLogo = () => {
            const logoContent = (
                <div className="flex items-center space-x-2">
                    {logo && <div className="flex-shrink-0">{logo}</div>}
                    {logoText && (
                        <span className="text-xl font-bold text-gray-900">{logoText}</span>
                    )}
                </div>
            )

            if (logoHref && !onLogoClick) {
                return (
                    <a
                        href={logoHref}
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                        {logoContent}
                    </a>
                )
            }

            return (
                <button
                    onClick={handleLogoClick}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                    {logoContent}
                </button>
            )
        }

        const renderMenuItem = (item: MenuItem, isMobile = false) => {
            const baseItemStyles = isMobile
                ? 'block px-3 py-2 text-base font-medium rounded-md transition-colors'
                : 'px-3 py-2 text-sm font-medium rounded-md transition-colors'

            const activeStyles = item.active
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'

            const disabledStyles = item.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'

            const itemStyles = [baseItemStyles, activeStyles, disabledStyles]
                .filter(Boolean)
                .join(' ')

            const content = (
                <span className={itemStyles}>
                    {item.label}
                </span>
            )

            if (item.href && !item.onClick && !item.disabled) {
                return (
                    <a
                        key={item.label}
                        href={item.href}
                        className={itemStyles}
                    >
                        {item.label}
                    </a>
                )
            }

            return (
                <button
                    key={item.label}
                    onClick={() => !item.disabled && handleMenuItemClick(item)}
                    disabled={item.disabled}
                    className={itemStyles}
                >
                    {item.label}
                </button>
            )
        }

        return (
            <header ref={ref} className={combinedClassName} {...props}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            {renderLogo()}
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-1">
                            {menuItems.map((item) => renderMenuItem(item))}
                        </nav>

                        {/* Mobile menu button */}
                        {mobileMenuButton && menuItems.length > 0 && (
                            <div className="md:hidden">
                                <button
                                    onClick={toggleMobileMenu}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                    aria-expanded={isMobileMenuOpen}
                                    aria-label="Toggle mobile menu"
                                >
                                    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuButton && isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                            {menuItems.map((item) => renderMenuItem(item, true))}
                        </div>
                    </div>
                )}
            </header>
        )
    }
)

Header.displayName = 'Header'
