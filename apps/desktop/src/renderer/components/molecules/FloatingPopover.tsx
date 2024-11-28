import { FloatingContext, UseFloatingReturn, useTransitionStyles } from '@floating-ui/react'
import { cn } from '@renderer/utils'
import { CSSProperties, forwardRef, MutableRefObject, ReactElement } from 'react'

type FloatingPopoverProps = {
  isPopoverOpen: boolean
  floatingStyles?: CSSProperties
  containerStyles?: CSSProperties
  context: FloatingContext
  refs?: UseFloatingReturn['refs']
  children?: ReactElement
  classNames?: string
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
        height: 'fit-content',
        bottom: 'unset',
        display: props.isPopoverOpen ? 'block' : 'none',
        minWidth: props.containerStyles?.minWidth ? props.containerStyles.minWidth : 'fit-content',
        ...props.containerStyles
      }}
      className={cn(
        // Shadow bugs out and creates a blur when outside the modal
        // 'bg-white border border-lightGray1 shadow-lg shadow-gray3 rounded-md p-2 z-50 mt-4 transition-all overflow-auto',
        'bg-white border border-gray4 rounded-md p-2 z-50 mt-4 transition-all overflow-auto',
        props.classNames
      )}
    >
      {props.children}
    </div>
  )
})

FloatingPopover.displayName = 'FloatingPopover'
