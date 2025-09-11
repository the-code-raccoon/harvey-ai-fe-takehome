export type DataEntity = {
  id: string
  parentFolder: string | null // only the base directory can be null
  name: string
  type: 'folder' | 'file'
}

export type File = DataEntity & {
  type: 'file'
}

export type Folder = DataEntity & {
  type: 'folder'
}
