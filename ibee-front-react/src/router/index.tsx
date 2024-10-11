import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import React from 'react'
// import Home from '@/views/Home'
import Login from '@/views/Login'
// 路由懒加载
const Home = lazy(() => import('@/views/Home'))
const KnowledgeManage = lazy(
  () => import('@/views/Home/HomeContent/KnowledgeManage')
)
const ProblemManage = lazy(
  () => import('@/views/Home/HomeContent/ProblemManage')
)
// 路由懒加载需要外套一层Suspense
const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
)
const router = [
  {
    path: '/',
    element: <Navigate to="/login"></Navigate>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/home',
    element: withLoadingComponent(<Home></Home>),
    children: [
      {
        path: '/home/knowledgeManage',
        element: withLoadingComponent(<KnowledgeManage></KnowledgeManage>)
      },
      {
        path: '/home/problemManage',
        element: withLoadingComponent(<ProblemManage></ProblemManage>)
      }
    ]
  }
]

export default router
