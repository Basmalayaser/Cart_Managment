import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Products from './components/Products'
import Login from './components/Login'
import Register from './components/Register'
import CartProducts from './components/CartProducts';

function App() {
  const router = createBrowserRouter([
       {path:"/" , element:<Layout/>  ,children:[
         {index:true ,element:<Products/>},
         {path:"login",element:<Login/>},
         {path:"register",element:<Register/>},
         {path:"cartProducts",element:<CartProducts/>},
         

       ]
        
     }
  ])

  return (
    <>
         <RouterProvider  router={router}></RouterProvider>
    </>
  )
}

export default App
