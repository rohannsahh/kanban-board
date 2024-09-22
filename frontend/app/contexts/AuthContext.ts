// 'use client'
// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
// import axios from 'axios'

// interface AuthContextType {
//   user: any | null
//   login: (token: string) => void
//   logout: () => void
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)


// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
//   const [user, setUser] = useState<any | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//       fetchUser()
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
//       setUser(response.data)
//     } catch (error) {
//       console.error('Error fetching user:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const login = (token: string) => {
//     localStorage.setItem('token', token)
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     fetchUser()
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     delete axios.defaults.headers.common['Authorization']
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider
//      value={{ user, login, logout, isLoading }}
//      >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }