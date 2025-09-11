import type { ColumnDef, Row } from '@tanstack/react-table'
import { Folder, File } from 'lucide-react'
import { Button } from '../ui/button'
import DirectionIcon from './DirectionIcon'
import { match } from 'ts-pattern'
import ActionsCell from './ActionsCell'
import type { DataEntity } from '@/types'

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
                <Folder className="h-4 w-4 ml-1.5" />
                {name}
              </>
            ))
            .with('file', () => (
              <>
                <File className="h-4 w-4 ml-1.5" />
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
      let displayText = '-'

      if (type === 'folder') displayText = 'Folder'
      if (type === 'file') displayText = 'File'

      return displayText
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      // @ts-expect-error: to avoid having to type table.options.meta
      const onRename = table.options.meta?.onRename as (row: Row<DataEntity>) => void
      return <ActionsCell row={row} onRename={onRename} />
    },
  },
]
