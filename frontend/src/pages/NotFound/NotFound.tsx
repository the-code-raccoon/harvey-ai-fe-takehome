import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-muted-foreground">404</h1>
        <p className="mt-4 text-2xl font-medium text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">The page may have been moved or deleted.</p>
        <Button variant="link" className="mt-6 text-sm " onClick={() => navigate('/')}>
          <HomeIcon className="mr-2 h-4 w-4" />
          Go back to homepage
        </Button>
      </div>
    </div>
  )
}
