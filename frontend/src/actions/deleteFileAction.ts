import { deleteFile } from '@/db'

export async function deleteFileAction(formData: FormData) {
  const id = formData.get('id') as string

  const response = await fetch(`http://localhost:3000/file/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Could not delete file')
  }

  await deleteFile(id)

  return null
}
