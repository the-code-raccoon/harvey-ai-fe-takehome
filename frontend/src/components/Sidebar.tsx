import { Home, Settings, Trash } from 'lucide-react'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from './ui/sidebar'
import { useNavigate } from 'react-router'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Trash',
    url: '/',
    icon: Trash,
  },
  {
    title: 'Settings',
    url: '/',
    icon: Settings,
  },
]

const AppSidebar = () => {
  const { state } = useSidebar()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="flex flex-row items-center justify-between px-3 py-2">
        {state === 'expanded' ? <span className="font-semibold text-lg">DataRoom</span> : null}

        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="cursor-pointer" onClick={() => navigate(item.url)}>
                    <item.icon />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
