import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Folder as FolderIcon, Plus, Upload } from 'lucide-react'
import { columns } from '../../components/DataTable/columns'
import { DataTable } from '../../components/DataTable/DataTable'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { FolderBreadcrumb } from '@/components/BreadCrumb'
import type { FolderViewerLoaderData } from './loader'
import CreateFolderDialogForm from '@/dialogs/CreateFolderDialogForm'
import UploadFileDialogForm from '@/dialogs/UploadFileDialogForm'

const FolderViewer = () => {
  const { folder, path } = useLoaderData() as FolderViewerLoaderData
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false)
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <FolderBreadcrumb path={path} />
        <div className="flex items-center gap-2">
          <Button variant="default" onClick={() => setUploadFileDialogOpen(true)}>
            <Upload className="h-4 w-4" />
            Upload
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
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

      <UploadFileDialogForm open={uploadFileDialogOpen} setOpen={setUploadFileDialogOpen} folder={folder} />

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
