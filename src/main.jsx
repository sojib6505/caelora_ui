import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/Router.jsx'
import AuthProvider from './context/authContext/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
     <div className='font-poppins'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
   </QueryClientProvider>
  </StrictMode>,
)
