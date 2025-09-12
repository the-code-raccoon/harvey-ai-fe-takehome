import type { DataEntity } from './types.ts'

const data: { [key: string]: DataEntity } = {
  '1': {
    id: '1',
    parentFolder: null,
    name: 'Home',
    type: 'folder',
  },
  '2': { id: '2', parentFolder: '1', name: 'Folder 1', type: 'folder' },
  '3': { id: '3', parentFolder: '2', name: 'Folder 2', type: 'folder' },
  '4': {
    id: '4',
    parentFolder: '3',
    name: 'Folder 3',
    type: 'folder',
  },
  '5': { id: '5', parentFolder: '1', name: 'Folder 4', type: 'folder' },
}

export default data
