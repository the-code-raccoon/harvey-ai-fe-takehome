import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { File, Folder as FolderIcon, Plus, Upload } from 'lucide-react'
import { columns } from '../components/DataTable/columns'
import { DataTable } from '../components/DataTable/data-table'
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../components/ui/shadcn-io/dropzone'
import { useEffect, useState } from 'react'
import type { Folder } from '../types'

const Home = () => {
  const [files, setFiles] = useState<File[] | undefined>()
  const [dialogError, setDialogError] = useState<string | undefined>()
  const [homeFolder, setHomeFolder] = useState<Folder | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/folder/1')

      if (!response.ok) {
        throw new Error('No home folder found')
      }

      setHomeFolder(await response.json())
    }

    fetchData()
  }, [])

  const handleDrop = (files: File[]) => {
    console.log(files)
    setFiles(files)
  }

  return (
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>
                <Dropzone
                  accept={{ 'application/pdf': [] }}
                  // accept={{ '*': [] }}
                  maxFiles={10}
                  maxSize={1024 * 1024 * 20}
                  onDrop={handleDrop}
                  onError={(error) => setDialogError(String(error))}
                  src={files}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
                <p className="text-sm text-red-400">{dialogError}</p>
                {files && files.length > 0 ? (
                  <ul className="list-disc pl-5 text-muted-foreground text-sm">
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
              </DialogContent>
            </DialogPortal>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FolderIcon className="h-4 w-4" />
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

      {homeFolder && (
        <div className="flex-1 overflow-auto p-4">
          <DataTable columns={columns} data={homeFolder.children} />
        </div>
      )}
    </div>
  )
}

export default Home
