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
    const obj = children as any

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
      return obj.children || ''
    }

    // Handle VNode props (for text content)
    if (obj.props && typeof obj.props.children === 'string') {
      return obj.props.children
    }
  }

  return ''
}

/**
 * Utility function to combine class names (similar to clsx/cn)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
