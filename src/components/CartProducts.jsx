import React, { useContext} from 'react'
import { CartContext } from '../context/CartContext'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function CartProducts() {

const  {addItemStorage,mins,pls,total,addFav,removeFromCart,addTOCartEvent,favorites,products}= useContext(CartContext)

  return (
    <>
    <section className="fav pt-4">
      <div className="container mt-4 pt-4">
        <div className="products row">
          <table className="table table-striped w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left tHead">Image</th>
                <th className="p-2 text-left tHead">Title</th>
                <th className="p-2 text-left tHead">Quantity</th>
                <th className="p-2 text-left tHead">Color</th>
                <th className="p-2 text-left tHead">Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {addItemStorage?.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                    />
                  </td>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">
                    <span className="text-danger mins" onClick={()=>mins(item.id,item.salePrice)}>-</span>
                    <span className="border border-2 rounded-circle px-2 py-1 mx-1" id={`quantity-${item.id}`}>{+(localStorage.getItem(`quantity-${item.id}`)) || 1}</span>
                    <span className="text-success pls " onClick={()=>pls(item.id,item.salePrice)}>+</span>
                  </td>
                  <td className="p-2">{item.color}</td>
                  <td className="p-2">{item.salePrice} EGP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div  className="d-flex justify-content-center border-bottom mb-4 pt-2 pb-4 text-dard fs-3 gap-5">
        <p >Total</p>
        <p >{total} EGP</p>
      </div>
    </section>

    {/* <!-- ---------------------------------------------------------------------------------------------- --> */}

    <div className="h-100">
      <div className="fav-Header mb-4">
        <h2 className="fav-header-title text-center text-dark">Favorites</h2>
        <div className="line"></div>
      </div>
<div className="carousel-container">      
<Carousel
  additionalTransfrom={0}
  arrows
  autoPlay
  autoPlaySpeed={3000}
  centerMode={true}
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite={false}
  itemClass="m-2"
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  const responsive = {{
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40, // Space for partially visible items
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  }}
  rewind
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
          {favorites.length > 0 ? (
          favorites.map((id) => {
            const item = products.find((product) => product.id === id);
            return item ? (
              <div key={item.id} className="product-item">
                <div className="card border border-dark pt-3 px-2">
                  <img
                    className="product-item-img card-img-top mx-auto"
                    src={item.imageURL}
                    alt={item.title}
                    style={{
                      height: '240px',
                      maxWidth: '240px',
                    }}
                  />
                  <div className="product-itm-desc card-body pb-0 px-2">
                    <p className="card-title">Product: {item.title}</p>
                    <p className="card-text">Category: {item.category}</p>
                    <p className="color">Color: {item.color}</p>
                    <p className="card-price">
                      Price: <span>
                        <del>{item.price} EGP</del> {item.salePrice} EGP
                      </span>
                    </p>
                  </div>
                  <div className="product-item-action d-flex justify-content-between px-2">
                    <button
                      className="btn btn-dark mb-2"
                      onClick={() =>
                        addItemStorage.some((cartItem) => cartItem.id === item.id)
                          ? removeFromCart(item.id)
                          : addTOCartEvent(item.id)
                      }
                    >
                      {addItemStorage.some((cartItem) => cartItem.id === item.id)
                        ? 'Remove From Cart'
                        : 'Add To Cart'}
                    </button>
                    <i
                      id={`fav-${item.id}`}
                      className={`text-dark ${favorites.includes(item.id) ? '' : 'text-opacity-50'}`}
                      onClick={() => addFav(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon
                        icon={`${favorites.includes(item.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}
                      />
                    </i>
                  </div>
                </div>
              </div>
            ) : null;
          })
        ) : (
          <div className="text-center text-danger fs-5">No favorite items added.</div>
        )}
       
      </Carousel>
       </div>
    </div>
    </>
  )
}

