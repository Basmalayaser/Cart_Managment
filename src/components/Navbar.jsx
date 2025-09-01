import { useContext, useState} from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

  const {user,setUser} =useContext(UserContext)
  const {setFavorites,addItemStorage,pls,mins,total}=useContext(CartContext)

  let [openCart,setOpenCart]=useState(false)

  let navigate = useNavigate()


    function logOut() {
      localStorage.clear();
      setFavorites([])
      setUser('')
      setTimeout(() => {
         navigate('/')
     }, 500);
    }

  return (
    <>
    <header className="bg-black h-70">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <a href="index.html" className="brand d-inline">
            <img
              src={logo}
              alt="Logo"
              id="logo-image"
              height="70px"
            />
          </a>

          <nav className="d-flex justify-content-between align-items-center">
            <ul id="links" className={`mt-3 ${user?'d-none':'d-flex'}`} >
              <li><Link to='login'>Sign In</Link></li>
              <li><Link to='register'>Sign up</Link></li>
            </ul>
            
            <h3 id="user" className="text-white" >{user ? `Welcome ${user}` : ''}</h3>

            <ul
              id="userInfo"
              className={`justify-content-between align-items-center ${user?'d-flex':'d-none'} gap-3`}

            >
               
              <li className="shoppingCart text-decoration-none">
                <FontAwesomeIcon icon={faCartShopping} className='cartIcon mr-4 text-white' onClick={()=>{setOpenCart(!openCart)}} />
                <span className={`${addItemStorage.length>0?"d-flex":"d-none"} badge align-items-center justify-content-center`}>{addItemStorage.length>0 ?addItemStorage.length :""}</span>
                
                <div className={`${openCart?"d-block":"d-none"} cartsProudect bg-black py-1 rounded text-center`}>
                  <div className="buyProudect rounded px-4">
                      {addItemStorage?.map((item)=>(
                         <div key={`buyProudectItem-${item.id}`} id={`buyProudectItem-${item.id}`} className="row my-2 pr-2 align-items-center">
                            <span className="col-6">{item.title}</span>
                            <div className="col-6">
                              <span className="text-danger mins" onClick={()=>mins(item.id,item.salePrice)}>-</span>
                              <span className="border border-2 rounded-circle px-2 py-1 " id={`quantity-${item.id}`}>{+(localStorage.getItem(`quantity-${item.id}`)) || 1}</span>
                              <span className="text-success pls" onClick={()=>pls(item.id,item.salePrice)}>+</span>
                            </div>

                        </div>  
                     ))}
                  </div>
                  <div
                    className="total d-flex justify-content-around border-top mb-1 pt-2 mx-2"
                  >
                    <h5 className="totalTitle text-light mr-3">Total</h5>
                    <div
                      className="totalPrice mr-2 text-light px-3 py-10"
                    >{total}</div>
                  </div>
                  <Link to='cartProducts' className="ViewPro btn bg-light text-black mb-1" onClick={()=>setOpenCart(false)}>
                      View all Proudcts
                  </Link>
                </div>
              </li>

              <li>
                <a href='/' id="logOut" onClick={()=>logOut()}> Log Out</a>
              </li>
            </ul>


          </nav>
        </div>
      </div>
    </header>
    </>
  )
}
