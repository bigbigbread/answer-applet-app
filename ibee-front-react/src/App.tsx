import AuthRouter from '@/router/AuthRouter.tsx'
import { BrowserRouter } from 'react-router-dom'
function App(): JSX.Element {
  // const outlet = useRoutes(router)
  return (
    <BrowserRouter>
      <AuthRouter></AuthRouter>
    </BrowserRouter>
  )
}

export default App
