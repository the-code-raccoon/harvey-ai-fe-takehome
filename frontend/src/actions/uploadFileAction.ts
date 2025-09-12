import { saveFile } from '@/db'
import type { File as FileEntity } from '@/types'

export async function uploadFileAction(formData: FormData) {
  const parentFolder = formData.get('parentFolder')

  for (const [, file] of formData.entries()) {
    if (!(file instanceof File)) continue

    const response = await fetch(`http://localhost:3000/file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: file.name, parentFolder }),
    })

    const uploadedFile = (await response.json()) as FileEntity

    await saveFile(uploadedFile.id, file)
  }
}
