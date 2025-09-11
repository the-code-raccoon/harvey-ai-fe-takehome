type BaseDataEntity = {
  id: string
  parentFolder: string | null // only the base directory can be null
  name: string
  type: 'folder' | 'file'
}

export type File = BaseDataEntity & {
  type: 'file'
}

export type Folder = BaseDataEntity & {
  type: 'folder'
  children: (File | Folder)[]
}

export type DataEntity = File | Folder
