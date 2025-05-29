import { Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ArticlesPage from './pages/articles/ArticlesPage.jsx'
import ArticlePage from './pages/articles/ArticlePage.jsx'
import SignInPage from './pages/authorization/SignInPage.jsx'
import SignUpPage from './pages/authorization/SignUpPage.jsx'
import UserProfile from './pages/user/UserProfile.jsx'
import NewArticlePage from './pages/articles/NewArticlePage.jsx'
import EditArticlePage from './pages/articles/EditArticlePage.jsx'
import NotFound from './pages/NotFound.jsx'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/articles" /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'article/:slug', element: <ArticlePage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'new-article', element: <NewArticlePage /> },
      { path: 'articles/:slug/edit', element: <EditArticlePage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export default routes
