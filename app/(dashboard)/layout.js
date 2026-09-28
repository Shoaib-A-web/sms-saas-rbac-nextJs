import DashboardShell from "@/components/layout/DashboardShell"
import { ThemeProvider } from "@/components/theme/ThemeProvider"

export default function Dashboardlayout({ children }){
    return(
         <ThemeProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
        </ThemeProvider>
    )
}