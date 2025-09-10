import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import AppSidebar from './app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './components/ui/breadcrumb'
import { Button } from './components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { File, Folder, MoreHorizontal, Plus, Upload } from 'lucide-react'
import { columns, type DataEntity } from './components/DataTable/columns'
import { DataTable } from './components/DataTable/data-table'

const data: DataEntity[] = [
  {
    id: '1',
    parentFolder: null,
    name: 'Home',
    type: 'folder',
  },
  {
    id: '3',
    parentFolder: '1',
    name: 'A Folder',
    type: 'folder',
  },
  {
    id: '2',
    parentFolder: '1',
    name: 'Folder 1',
    type: 'folder',
  },
  {
    id: '100',
    parentFolder: '1',
    name: 'document1.pdf',
    type: 'file',
  },
  {
    id: '101',
    parentFolder: '2',
    name: 'document2.pdf',
    type: 'file',
  },
]

const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-w-full">
        <div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Drive</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Folder 1</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Folder 2</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus />
                      New
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Folder />
                      New Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <File />
                      New File
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
