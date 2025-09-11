import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FolderViewer from './pages/FolderViewer/FolderViewer.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Layout from './pages/Layout/Layout.tsx'
import { folderViewerLoader } from './pages/FolderViewer/loader.ts'
import { renameFileAction, renameFolderAction } from './forms/RenameDialogForm/action.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ':id?',
        element: <FolderViewer />,
        loader: folderViewerLoader,
      },
    ],
  },
  {
    path: '/file/:id',
    action: renameFileAction,
  },
  {
    path: '/folder/:id',
    action: renameFolderAction,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
