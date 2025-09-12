function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fileDB', 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Save a file (File or Blob) under a given ID
export async function saveFile(id: string, file: File | Blob) {
  const db = await openDB()
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite')
    tx.objectStore('files').put({ id, file })
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => reject(tx.error)
  })
}

// Retrieve a file by ID
export async function getFile(id: string): Promise<File | Blob | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readonly')
    const request = tx.objectStore('files').get(id)
    request.onsuccess = () => {
      db.close()
      resolve(request.result?.file)
    }
    request.onerror = () => reject(request.error)
  })
}

export async function deleteFile(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite')
    tx.objectStore('files').delete(id)
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => reject(tx.error)
  })
}
