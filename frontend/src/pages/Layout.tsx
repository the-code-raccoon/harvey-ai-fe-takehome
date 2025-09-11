import { SidebarInset, SidebarProvider } from '../components/ui/sidebar'
import AppSidebar from '../components/app-sidebar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-w-full">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
