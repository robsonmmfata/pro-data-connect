import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft hover:shadow-medical transform hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-lg transform hover:scale-[1.02]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-card hover:shadow-soft",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-soft hover:shadow-medical transform hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        medical: "bg-gradient-to-r from-medical-blue to-medical-green text-white hover:from-medical-blue/90 hover:to-medical-green/90 shadow-medical hover:shadow-lg transform hover:scale-[1.02]",
        hero: "bg-gradient-to-r from-primary to-secondary text-white shadow-medical hover:shadow-lg transform hover:scale-[1.02] hover:from-primary/90 hover:to-secondary/90",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft hover:shadow-lg transform hover:scale-[1.02]",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-soft hover:shadow-lg transform hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
