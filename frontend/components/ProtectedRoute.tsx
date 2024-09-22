// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../app/contexts/AuthContext'

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push('/auth/login')
//     }
//   }, [user, isLoading, router])

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return user ? <>{children}</> : null
// }