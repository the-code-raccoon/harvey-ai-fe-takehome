import type { Folder } from '@/types'
import type { LoaderFunctionArgs } from 'react-router'

export const folderViewerLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id ?? '1'

  // Fetch folder data
  const folderRes = await fetch(`http://localhost:3000/folder/${id}`)
  if (!folderRes.ok) throw new Response('Folder not found', { status: 404 })
  const folder = await folderRes.json()

  // Fetch path data
  const pathRes = await fetch(`http://localhost:3000/folder/path/${id}`)
  if (!pathRes.ok) throw new Response('No path for folder found', { status: 404 })
  const { path } = await pathRes.json()
  console.log('bitch loader', id, folder, path)

  return { folder, path }
}

export type FolderViewerLoaderData = {
  folder: Folder
  path: Omit<Folder, 'children'>[]
}
