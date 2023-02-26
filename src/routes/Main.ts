import { default as indexRoute } from './pages/Index'
import { default as catchAllRoute } from './pages/NotFound'
import { default as loginRoute } from './pages/Login'
import { default as logoutRoute } from './pages/Logout'

export default [
  { path: "/", route: indexRoute },
  { path: "/login", route: loginRoute },
  { path: "/logout", route: logoutRoute },
  { path: "*", route: catchAllRoute }, // MUST BE LAST
]