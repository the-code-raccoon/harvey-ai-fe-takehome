import { getAPI } from '@/lib/utils'

export async function deleteFolderAction(formData: FormData) {
  const id = formData.get('id') as string

  const response = await fetch(`${getAPI()}/folder/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Could not delete file')
  }
  return null
}
