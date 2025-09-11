import { SidebarInset, SidebarProvider } from '../../components/ui/sidebar'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="max-w-full">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
