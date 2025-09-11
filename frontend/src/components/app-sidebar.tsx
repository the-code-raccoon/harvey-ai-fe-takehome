import { Home, Inbox, Calendar, Settings, Trash } from 'lucide-react'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from './ui/sidebar'

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Trash',
    url: '#',
    icon: Trash,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

const AppSidebar = () => {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="flex flex-row items-center justify-between px-3 py-2">
        {state === 'expanded' ? <span className="font-semibold text-lg">DataRoom</span> : null}

        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>somefdhkls</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarGroup>
        <SidebarFooter>Dark Mode</SidebarFooter>
      </SidebarGroup>
    </Sidebar>
  )
}

export default AppSidebar
