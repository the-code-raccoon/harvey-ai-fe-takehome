import { getAPI } from '@/lib/utils'

export async function createFolderAction(formData: FormData) {
  const name = formData.get('name') as string
  const parentFolder = formData.get('parentFolder') as string

  const response = await fetch(`${getAPI()}/folder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, parentFolder }),
  })

  if (!response.ok) {
    throw new Response('Could not create folder', { status: 500 })
  }
  return null
}
