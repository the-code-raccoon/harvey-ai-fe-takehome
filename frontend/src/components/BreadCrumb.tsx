import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { Folder } from '@/types'
import { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router'

type FolderBreadcrumbProps = {
  currentId: string
}

export function FolderBreadcrumb({ currentId }: FolderBreadcrumbProps) {
  const navigate = useNavigate()
  const [path, setPath] = useState<Folder[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/folder/path/${currentId}`)

      if (!response.ok) {
        throw new Error('No path for folder found')
      }

      setPath((await response.json()).path)
    }

    fetchData()
  }, [currentId])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, index) => (
          <Fragment key={item.id}>
            <BreadcrumbItem>
              {index === path.length - 1 ? (
                <span>{item.name}</span>
              ) : (
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => {
                    if (item.type === 'folder') {
                      navigate(`/${item.id}`)
                    }
                  }}
                >
                  {item.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== path.length - 1 ? <BreadcrumbSeparator /> : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
