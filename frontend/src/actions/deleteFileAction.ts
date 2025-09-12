import { deleteFile } from '@/lib/db'
import { getAPI } from '@/lib/utils'

export async function deleteFileAction(formData: FormData) {
  const id = formData.get('id') as string

  const response = await fetch(`${getAPI()}/file/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Could not delete file')
  }

  await deleteFile(id)

  return null
}
