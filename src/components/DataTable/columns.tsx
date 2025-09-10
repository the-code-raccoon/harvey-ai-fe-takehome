import type { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Download, FolderOpen, MoreHorizontal, PencilLine, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import DirectionIcon from './DirectionIcon'

export type DataEntity = {
  id: string
  parentFolder: string | null // only the base directory can be null
  name: string
  type: 'folder' | 'file'
}

export type Folder = DataEntity & {
  type: 'folder'
}

export type File = DataEntity & {
  type: 'file'
}

export const columns: ColumnDef<DataEntity>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const currentSortDirection = column.getIsSorted()
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(currentSortDirection === 'asc')}>
          Name
          <DirectionIcon direction={currentSortDirection} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'parentFolder',
    header: 'Location',
    cell: ({ row, table }) => {
      const parentFolderId = row.getValue('parentFolder')
      const parentFolderName = table
        .getRowModel()
        .rows.find((r) => r.original.id === parentFolderId)
        ?.getValue('name')

      return parentFolderName
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      const currentSortDirection = column.getIsSorted()

      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(currentSortDirection === 'asc')}>
          Kind
          <DirectionIcon direction={currentSortDirection} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue('type')
      if (!type) return '-'

      if (type === 'folder') return 'Folder'
      if (type === 'file') return 'File'
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <FolderOpen className="h-4 w-4" />
              Open
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilLine className="h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
