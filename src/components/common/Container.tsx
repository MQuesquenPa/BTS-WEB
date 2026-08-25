import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement>

export function Container({ className = '', children, ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
