import { useContext, useState } from 'react';
import { CartContext } from './../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResponsivePaginationComponent from 'react-responsive-pagination';

export default function Products() {
  const {
    products,
    addFav,
    favorites,
    addTOCartEvent,
    removeFromCart,
    addItemStorage,
  } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchOption, setSearchOption] = useState('searchTittle');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Calculate total pages based on filteredProducts length
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter products based on search input
  const searchData = (value) => {
    const lowerValue = value.toLowerCase();
    const filtered = products.filter((item) => {
      if (searchOption === 'searchTittle') {
        return item.title.toLowerCase().includes(lowerValue);
      } else {
        return item.category.toLowerCase().includes(lowerValue);
      }
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <main className="bg-light pt-4">
        <section className="searchDiv container">
          <div className="row">
            <div className="col-6 p-0">
              <select
                className="form-control text-black"
                id="searchOption"
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
              >
                <option value="searchTittle">Search By Title</option>
                <option value="searchCategory">Search By Category</option>
              </select>
            </div>
            <div className="col-6">
              <input
                onChange={(e) => searchData(e.target.value)}
                className="form-control mb-4"
                type="text"
                id="search"
                placeholder={
                  searchOption === 'searchTittle' ? 'Search By Title' : 'Search By Category'
                }
              />
            </div>
          </div>
        </section>
      </main>
      <div className="Home m-0 mt-4">
        <div className="container">
          <div className="products row">
            {currentItems?.map((item) => (
              <div key={item.id} className="product-item col-md-4 mb-4 p-4">
                <div className="card border border-dark pt-3 px-2">
                  <img
                    className="card-img-top m-auto"
                    src={item.imageURL}
                    alt={item.title}
                    style={{
                      height:
                        item.category === 'phone'
                          ? '330px'
                          : item.category === 'smart watch'
                          ? '240px'
                          : '200px',
                      width: '80%',
                    }}
                  />
                  <div className="card-body pb-0 px-2">
                    <p className="card-title">Product: {item.title}</p>
                    <p className="card-text">Category: {item.category}</p>
                    <p className="">Color: {item.color}</p>
                    <p className="card-price">
                      Price: <span>
                        <del className="text-danger">{item.price} EGP</del>{' '}
                        {item.salePrice} EGP
                      </span>
                    </p>
                  </div>
                  <div className="product-item-action d-flex justify-content-between p-2 ">
                    <button
                      className="btn btn-dark"
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
                      className={`${
                        favorites.includes(item.id) ? 'text-black' : 'text-muted'
                      }`}
                      onClick={() => addFav(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon
                        icon={
                          favorites.includes(item.id)
                            ? 'fa-solid fa-heart'
                            : 'fa-regular fa-heart'
                        }
                      />
                    </i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    <div className="d-flex justify-content-center my-4">
  <ResponsivePaginationComponent
    previousLabel="‹"
    nextLabel="›"
    total={totalPages}
    current={currentPage}
    onPageChange={handlePageChange}
    pageClassName="page-item"
    pageLinkClassName="page-link"
    activeClassName="active"
    previousClassName="page-item"
    nextClassName="page-item"
    disabledClassName="disabled"
  />
</div>
    </>
  );
}