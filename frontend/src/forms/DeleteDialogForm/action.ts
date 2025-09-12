export async function deleteFileAction(formData: FormData) {
  const id = formData.get('id') as string

  const response = await fetch(`http://localhost:3000/file/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Could not delete file')
  }
  return null
}

export async function deleteFolderAction(formData: FormData) {
  const id = formData.get('id') as string

  const response = await fetch(`http://localhost:3000/folder/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Could not delete file')
  }
  return null
}
