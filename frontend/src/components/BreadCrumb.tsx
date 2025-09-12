import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { truncateString } from '@/lib/utils'
import type { Folder } from '@/types'
import { Fragment } from 'react'
import { useNavigate } from 'react-router'

type FolderBreadcrumbProps = {
  path: Omit<Folder, 'children'>[]
}

export function FolderBreadcrumb({ path }: FolderBreadcrumbProps) {
  const navigate = useNavigate()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, index) => (
          <Fragment key={item.id}>
            <BreadcrumbItem>
              {index === path.length - 1 ? (
                <span>{truncateString(item.name, 20)}</span>
              ) : (
                <>
                  <BreadcrumbLink className="cursor-pointer" onClick={() => navigate(`/${item.id}`)}>
                    {truncateString(item.name, 20)}
                  </BreadcrumbLink>
                </>
              )}
            </BreadcrumbItem>
            {index !== path.length - 1 ? <BreadcrumbSeparator /> : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
