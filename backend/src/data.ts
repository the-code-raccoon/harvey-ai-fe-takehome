import type { DataEntity } from './types.ts'

const data: DataEntity = {
  id: '1',
  parentFolder: null,
  name: 'Home',
  type: 'folder',
  children: [
    {
      id: '3',
      parentFolder: '1',
      name: 'A Folder',
      type: 'folder',
      children: [],
    },
    {
      id: '2',
      parentFolder: '1',
      name: 'Folder 1',
      type: 'folder',
      children: [
        {
          id: '101',
          parentFolder: '2',
          name: 'document2.pdf',
          type: 'file',
        },
      ],
    },
    {
      id: '100',
      parentFolder: '1',
      name: 'document1.pdf',
      type: 'file',
    },
  ],
}

export default data
