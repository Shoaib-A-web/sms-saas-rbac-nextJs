'use client'

import DashboardShell from "@/components/layout/DashboardShell"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import DashboardPage from "./dashboard/page"
import { usePathname } from "next/navigation"

export default function Dashboardlayout({ children }){
  const currentPath = usePathname();
    return(
         <ThemeProvider>
          <DashboardShell>
            {currentPath === "/" && <DashboardPage/>}
            {children}
          </DashboardShell>
        </ThemeProvider>
    )
}