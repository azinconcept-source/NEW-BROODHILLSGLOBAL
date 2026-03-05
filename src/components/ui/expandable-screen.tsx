"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface ExpandableScreenContextType {
  isExpanded: boolean
  setIsExpanded: (value: boolean) => void
}

const ExpandableScreenContext = createContext<ExpandableScreenContextType | undefined>(undefined)

export function ExpandableScreen({
  children,
  layoutId,
  triggerRadius = "100px",
  contentRadius = "24px",
  className,
}: {
  children: ReactNode
  layoutId: string
  triggerRadius?: string
  contentRadius?: string
  className?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ExpandableScreenContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className={cn("relative", className)}>
        {children}
      </div>
    </ExpandableScreenContext.Provider>
  )
}

export function ExpandableScreenTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(ExpandableScreenContext)
  if (!context) throw new Error("ExpandableScreenTrigger must be used within ExpandableScreen")

  return (
    <div 
      onClick={() => context.setIsExpanded(true)} 
      className={cn("cursor-pointer", className)}
    >
      {children}
    </div>
  )
}

export function ExpandableScreenContent({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(ExpandableScreenContext)
  if (!context) throw new Error("ExpandableScreenContent must be used within ExpandableScreen")

  return (
    <AnimatePresence>
      {context.isExpanded && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1999] bg-black/60 backdrop-blur-sm"
            onClick={() => context.setIsExpanded(false)}
          />
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div 
              layoutId="expandable-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "relative w-full max-w-[1100px] max-h-[90vh] overflow-y-auto bg-primary rounded-[24px] shadow-2xl pointer-events-auto",
                className
              )}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  context.setIsExpanded(false);
                }}
                className="absolute top-6 right-6 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full text-primary-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
