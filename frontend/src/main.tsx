import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FolderViewer from './pages/FolderViewer/FolderViewer.tsx'
import Layout from './pages/Layout/Layout.tsx'
import { createBrowserRouter, type ActionFunctionArgs } from 'react-router'
import { RouterProvider } from 'react-router'
import { folderViewerLoader } from './pages/FolderViewer/loader.ts'
import {
  deleteFolderAction,
  deleteFileAction,
  renameFolderAction,
  renameFileAction,
  createFolderAction,
  uploadFileAction,
} from './actions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: ':id?',
        element: <FolderViewer />,
        loader: folderViewerLoader,
        action: async ({ request }: ActionFunctionArgs) => {
          const formData = await request.formData()
          const actionType = formData.get('action')

          switch (actionType) {
            case 'deleteFile':
              return await deleteFileAction(formData)
            case 'deleteFolder':
              return await deleteFolderAction(formData)
            case 'renameFile':
              return await renameFileAction(formData)
            case 'renameFolder':
              return await renameFolderAction(formData)
            case 'createFolder':
              return await createFolderAction(formData)
            case 'uploadFile':
              return await uploadFileAction(formData)
          }
        },
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
