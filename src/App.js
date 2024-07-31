import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Cookies from 'js-cookie';
import RequireAuth from './pages/auth/RequireAuth';

function App() {

  const accessToken = Cookies.get('accessToken');

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='auth' >
        <Route path='login' element={accessToken ?
          <Navigate to='/Dashboard' replace /> : <Login />} />
        <Route path='register' element={accessToken ?
          <Navigate to='/Dashboard' replace /> : <Register />} />
      </Route>
      <Route path='Dashboard' element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />
    </Route>
  ))

  return <RouterProvider router={router} />
}

export default App;
