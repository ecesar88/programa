import { FloatingContext, UseFloatingReturn, useTransitionStyles } from '@floating-ui/react'
import { CSSProperties, forwardRef, MutableRefObject, ReactElement } from 'react'

type FloatingPopoverProps = {
  isPopoverOpen: boolean
  dropdownHeight?: number
  minWidth?: string
  maxWidth?: string
  floatingStyles?: CSSProperties
  context: FloatingContext
  refs?: UseFloatingReturn['refs']
  children?: ReactElement
}

export const FloatingPopover = forwardRef<Element, FloatingPopoverProps>((props, forwardedRef) => {
  const { styles: transitionStyles } = useTransitionStyles(props.context)

  return (
    <div
      ref={(node) => {
        props.refs?.setFloating?.(node)

        // Forward the ref to the parent
        if (forwardedRef) {
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            ;(forwardedRef as MutableRefObject<Element | null>).current = node
          }
        }
      }}
      style={{
        ...props.floatingStyles,
        ...transitionStyles,
        width: props.refs?.reference.current?.getBoundingClientRect().width,
        height: props.dropdownHeight ?? 'fit-content',
        minWidth: props.minWidth ?? 'fit-content',
        maxWidth: props.maxWidth ?? 'unset',
        bottom: 'unset',
        display: props.isPopoverOpen ? 'block' : 'none'
      }}
      className="bg-white border border-lightGray1 shadow-lg shadow-gray3 rounded-md p-2 z-50 mt-4 transition-all overflow-auto"
    >
      {props.children}
    </div>
  )
})

FloatingPopover.displayName = 'FloatingPopover'
