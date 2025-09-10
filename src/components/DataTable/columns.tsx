import type { ColumnDef } from '@tanstack/react-table'
import { Folder, File } from 'lucide-react'
import { Button } from '../ui/button'
import DirectionIcon from './DirectionIcon'
import { match } from 'ts-pattern'
import ActionsCell from './ActionsCell'

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
    cell: ({ row }) => {
      const name = row.getValue('name') satisfies string
      const type = row.getValue('type')

      return (
        <div className="flex gap-2 items-center">
          {match(type)
            .with('folder', () => (
              <>
                <Folder className="h-4 w-4" />
                {name}
              </>
            ))
            .with('file', () => (
              <>
                <File className="h-4 w-4" />
                {name}
              </>
            ))
            .otherwise(() => name)}
        </div>
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
    cell: ({ row }) => <ActionsCell row={row} />,
    // cell: ({ row }) => {
    //   const type = row.getValue('type')
    //   const [open, setOpen] = useState(false)

    //   return (
    //     <>
    //       <DropdownMenu>
    //         <DropdownMenuTrigger>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="start">
    //           {type === 'file' ? (
    //             <DropdownMenuItem>
    //               <FolderOpen className="h-4 w-4" />
    //               Open
    //             </DropdownMenuItem>
    //           ) : null}
    //           <DropdownMenuItem>
    //             <PencilLine className="h-4 w-4" />
    //             Rename
    //           </DropdownMenuItem>
    //           <DropdownMenuItem>
    //             <Download className="h-4 w-4" />
    //             Download
    //           </DropdownMenuItem>

    //           <DropdownMenuItem onSelect={() => setOpen(true)}>
    //             <Trash className="h-4 w-4" />
    //             Delete
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>

    //       <Dialog open={open} onOpenChange={setOpen}>
    //         <DialogPortal>
    //           <DialogContent>
    //             <DialogHeader>
    //               <DialogTitle>Upload File</DialogTitle>
    //             </DialogHeader>
    //             <DialogDescription>
    //               Are you sure you want to permanently delete {row.getValue('name')}?
    //             </DialogDescription>
    //           </DialogContent>
    //         </DialogPortal>
    //       </Dialog>
    //     </>
    //   )
    // },
  },
]
