import packageJson from '../../package.json'

/**
 * Extract text content from Vue slot children
 */
export function getTextContent(children: unknown): string {
  if (typeof children === 'string') {
    return children
  }

  if (!children) {
    return ''
  }

  if (Array.isArray(children)) {
    return children.map((child: unknown) => getTextContent(child)).join('\n')
  }

  if (typeof children === 'object' && children !== null) {
    const obj = children as Record<string, unknown>

    // Handle VNode with children
    if ('children' in obj) {
      if (typeof obj.children === 'string') {
        return obj.children
      }
      if (Array.isArray(obj.children)) {
        return obj.children.map((child: unknown) => getTextContent(child)).join('\n')
      }
    }

    // Handle text nodes
    if (obj.type === 'text' || obj.type === Symbol.for('v-txt')) {
      return (obj.children as string) || ''
    }

    // Handle VNode props (for text content)
    if (obj.props && typeof (obj.props as Record<string, unknown>).children === 'string') {
      return (obj.props as Record<string, unknown>).children as string
    }
  }

  return ''
}

/**
 * Utility function to combine class names (similar to clsx/cn)
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPackageVersion(): string {
  try {
    // In a Vite environment, we can use import.meta.env or read from a build-time constant
    // For now, we'll return a fallback that can be overridden at build time
    return packageJson.version || '0.1.0'
  } catch {
    return '0.1.0'
  }
}
