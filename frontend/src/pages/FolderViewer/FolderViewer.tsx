import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Folder as FolderIcon, Plus, Upload } from 'lucide-react'
import { columns } from '../../components/DataTable/columns'
import { DataTable } from '../../components/DataTable/data-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../../components/ui/shadcn-io/dropzone'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { FolderBreadcrumb } from '@/components/BreadCrumb'
import type { FolderViewerLoaderData } from './loader'
import CreateFolderDialogForm from '@/forms/CreateFolderDialogForm'

const FolderViewer = () => {
  const { folder, path } = useLoaderData() as FolderViewerLoaderData

  const [files, setFiles] = useState<File[] | undefined>()
  const [dialogError, setDialogError] = useState<string | undefined>()
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false)

  const handleDrop = (files: File[]) => {
    console.log(files)
    setFiles(files)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <FolderBreadcrumb path={path} />
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
              <DropdownMenuItem onClick={() => setCreateFolderDialogOpen(true)}>
                <FolderIcon className="h-4 w-4" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {folder && (
        <div className="flex-1 overflow-auto p-4">
          <DataTable columns={columns} data={folder.children} />
        </div>
      )}

      {folder && (
        <CreateFolderDialogForm
          open={createFolderDialogOpen}
          setOpen={setCreateFolderDialogOpen}
          parentFolder={folder}
        />
      )}
    </div>
  )
}

export default FolderViewer
