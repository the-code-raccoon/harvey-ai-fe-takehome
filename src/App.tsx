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
import { File, Folder, Plus, Upload } from 'lucide-react'
import { columns, type DataEntity } from './components/DataTable/columns'
import { DataTable } from './components/DataTable/data-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from './components/ui/shadcn-io/dropzone'
import { useState } from 'react'

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
  const [files, setFiles] = useState<File[] | undefined>()
  const [dialogError, setDialogError] = useState<string | undefined>()

  const handleDrop = (files: File[]) => {
    console.log(files)
    setFiles(files)
  }

  return (
    <Dialog>
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
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </DialogTrigger>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                        New
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Folder className="h-4 w-4" />
                        New Folder
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <File className="h-4 w-4" />
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription className="flex flex-col gap-4">
                <Dropzone
                  // accept={{ 'image/jpeg': [], 'application/pdf': [] }}
                  accept={{ '*': [] }}
                  maxFiles={10}
                  maxSize={1024 * 1024 * 20}
                  onDrop={handleDrop}
                  onError={(error) => setDialogError(String(error))}
                  src={files}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
                {dialogError}
                {files && files.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {files.map((file) => (
                      <li>{file.name}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex gap-4 justify-end">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default" disabled={!files}>
                    Upload
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </SidebarInset>
      </SidebarProvider>
    </Dialog>
  )
}

export default App
