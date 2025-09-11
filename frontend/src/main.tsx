import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FolderViewer from './pages/FolderViewer.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Layout from './pages/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ':id?',
        element: <FolderViewer />,
        loader: ({ params }) => {
          return { id: params.id ?? '1' }
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
