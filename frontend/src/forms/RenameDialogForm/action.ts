import type { ActionFunctionArgs } from 'react-router'

export async function renameFileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const id = formData.get('id') as string

  const response = await fetch(`http://localhost:3000/file/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Response('Could not update name', { status: 500 })
  }
}

export async function renameFolderAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const id = formData.get('id') as string

  const response = await fetch(`http://localhost:3000/folder/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Response('Could not update name', { status: 500 })
  }
}
