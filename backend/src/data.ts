import type { DataEntity } from './types.ts'

const data: { [key: string]: DataEntity } = {
  '1': {
    id: '1',
    parentFolder: null,
    name: 'Home',
    type: 'folder',
  },
  '3': {
    id: '3',
    parentFolder: '1',
    name: 'A Folder',
    type: 'folder',
  },
  '2': { id: '2', parentFolder: '1', name: 'Folder 1', type: 'folder' },
  '4': {
    id: '4',
    parentFolder: '3',
    name: 'Super nested folder',
    type: 'folder',
  },
  '101': {
    id: '101',
    parentFolder: '2',
    name: 'document2.pdf',
    type: 'file',
  },
  '100': {
    id: '100',
    parentFolder: '1',
    name: 'document1.pdf',
    type: 'file',
  },
  '102': {
    id: '102',
    parentFolder: '1',
    name: 'document3',
    type: 'file',
  },
  '103': {
    id: '103',
    parentFolder: '1',
    name: 'document4',
    type: 'file',
  },
}

export default data
