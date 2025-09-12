import { ArrowDown, ArrowUp } from 'lucide-react'
import { match } from 'ts-pattern'
import type { SortingColumn } from '@tanstack/react-table'
import type { DataEntity } from '@/types'

const DirectionIcon = ({ direction }: { direction: ReturnType<SortingColumn<DataEntity>['getIsSorted']> }) => {
  return match(direction)
    .with('asc', () => <ArrowUp className="ml-2 h-4 w-4" />)
    .with('desc', () => <ArrowDown className="ml-2 h-4 w-4" />)
    .otherwise(() => null)
}

export default DirectionIcon
