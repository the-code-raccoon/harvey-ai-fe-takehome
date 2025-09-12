export async function renameFileAction(formData: FormData) {
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
  return null
}
