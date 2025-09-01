import { createContext, useState } from 'react';
import Labtop1 from './../assets/images/Labtop1.jpg'
import Labtop2 from './../assets/images/Labtop2.jpg'
import Labtop3 from './../assets/images/Labtop3.jpg'
import Labtop4 from './../assets/images/Labtop4.jpg'

import Earbuds from  './../assets/images/Earbuds.jpg'
import Earbuds1 from  './../assets/images/Earbuds1.jpg'
import Earbuds2 from  './../assets/images/Earbuds2.jpg'
import Earbuds3 from  './../assets/images/Earbuds3.jpg'

import Over_Ear1  from './../assets/images/Over Ear1.jpg'

import smartwatch1 from './../assets/images/smartwatch1.jpg'
import smartwatch2 from './../assets/images/smartwatch2.jpg'
import smartwatch3 from './../assets/images/smartwatch3.jpg'

import phone1 from  './../assets/images/phone1.jpg'
import phone2 from  './../assets/images/phone2.jpg'
import phone3 from  './../assets/images/phone3.jpg'
import phone4 from  './../assets/images/phone4.jpg'
import phone5 from  './../assets/images/phone5.jpg'
import phone6 from  './../assets/images/phone6.jpg'
import phone7 from  './../assets/images/phone7.jpg'

import toast from 'react-hot-toast';

export const CartContext = createContext();

export default function CartContextProvider(props) {

  let products = [
    { id: 1, title: "Dell G15-5520", category: "Labtop", color: "Black", price: 36870, salePrice: 36270, imageURL: Labtop1 },
    { id: 2, title: "Lenovo V15", category: "Labtop", color: "gray", price: 13333, salePrice: 13011, imageURL: Labtop2 },
    { id: 3, title: "HP Victus", category: "Labtop", color: "Black", price: 47699, salePrice: 47438, imageURL: Labtop3 },
    { id: 4, title: "Dell Vostro", category: "Labtop", color: "Black", price: 29660, salePrice: 29320, imageURL: Labtop4 },
    { id: 5, title: "R50i", category: "Earbuds", color: "Black", price: 1699, salePrice: 1399, imageURL: Earbuds},
    { id: 6, title: "R100", category: "Earbuds", color: "White", price: 1600, salePrice: 1499, imageURL: Earbuds1 },
    { id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: 2899, salePrice: 2699, imageURL: Earbuds2 },
    { id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: 2485, salePrice: 1600, imageURL: Earbuds3 },
    { id: 9, title: "Generic", category: "Over Ear", color: "Blue", price: 215, salePrice: 185, imageURL: Over_Ear1 }, 
    { id: 10, title: "Panduo", category: "smart watch", color: "Green", price: 450, salePrice: 375, imageURL: smartwatch1 },
    { id: 11, title: "Muktrics", category: "smart watch", color: "Black", price: 400, salePrice: 350, imageURL: smartwatch2 },
    { id: 12, title: "BigPlayer", category: "smart watch", color: "Brown", price: 730, salePrice: 650, imageURL: smartwatch3 },
    { id: 13, title: "Samsung Galaxy A34", category: "phone", color: "Awesome Silver", price: 11286, salePrice: 10400, imageURL:phone1 },
    { id: 14, title: "A24", category: "phone", color: "Black", price: 49900, salePrice: 38090, imageURL: phone2 },
    { id: 15, title: "Oppo Reno 8T", category: "phone", color: "gray", price: 12793, salePrice: 12445, imageURL: phone3 }, 
    { id: 16, title: "Galaxy S22", category: "phone", color: "Green", price: 24299, salePrice: 24899, imageURL: phone4 },
    { id: 17, title: "Galaxy S22 Ultra", category: "phone", color: "Phantom Black", price: 32800, salePrice: 33400, imageURL: phone5},
    { id: 18, title: "Galaxy S21", category: "phone", color: "Light Green", price: 21990, salePrice: 19299, imageURL: phone6 },
    { id: 19, title: "Galaxy Z Fold5", category: "phone", color: "Light blue", price: 73930, salePrice: 66000, imageURL: phone7},
  ];


  let [favorites,setFavorites]=useState([])
  let [total,setTotal] = useState(0)
  let [addItemStorage,setAddItemStorage] =useState([])

  const [quantities, setQuantities] = useState(() => {
    const savedQuantities = {};
    products.forEach((product) => {
        const saved = localStorage.getItem(`quantity-${product.id}`);
        if (saved) savedQuantities[product.id] = +saved;
    });
    return savedQuantities;
  });
  



  // --------------------------------------------------------------------------

function addFav(id) {
    if (localStorage.getItem("userName")) {
        if (!favorites.includes(id)) {
            addToFavorites(id);
        } else {
            removeFromFavorites(id);
        }
    } else {
         window.location = "/login";
    }
}


function addToFavorites(itemId) {
    setFavorites((prev) => [...prev, itemId]);
    toast.success('Item added successfully to your favorite list');
  }

  function removeFromFavorites(itemId) {
    setFavorites((prev) => prev.filter((id) => id !== itemId));
    toast.success('Item removed successfully from your favorite list');
  }
// -------------------------------------------------------------------

function pls(id, salePrice) {
    const newQuantities = { ...quantities, [id]: (quantities[id] || 1) + 1 };
    setQuantities(newQuantities);
    localStorage.setItem(`quantity-${id}`, newQuantities[id].toString());
    setTotal(total + salePrice);

}

function mins(id, salePrice) {
    if (quantities[id] > 1) {
      const newQuantities = { ...quantities, [id]: quantities[id] - 1 };
      setQuantities(newQuantities);
      localStorage.setItem(`quantity-${id}`, newQuantities[id].toString());
      setTotal((prev) => prev - salePrice);
    } else {
      removeFromCart(id);
    }
  }


function removeFromCart(id) {
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
        addItemStorage.splice(itemIndex, 1);
        setAddItemStorage([...addItemStorage]);
        const newTotal = addItemStorage.reduce((acc, item) => {
            const itemQuantity = +(localStorage.getItem(`quantity-${item.id}`)) || 1;
            return acc + item.salePrice * itemQuantity;
        }, 0);

        setTotal(newTotal);
        toast.success("Product removed from cart successfully");
    }
}



function addTOCartEvent(id) {
    if (localStorage.getItem("userName")) {
        let choosenItem = products.find((item) => item.id === id);
        let itemIndex = addItemStorage.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            addItemStorage = [...addItemStorage, choosenItem];
            setAddItemStorage(addItemStorage)
            let quantity = localStorage.getItem(`quantity-${choosenItem.id}`) ? +(localStorage.getItem(`quantity-${choosenItem.id}`)) : 1;
            setTotal(total += (+choosenItem.salePrice) * quantity)
            toast.success("Product added to cart successfly")
        }
    } else {
        window.location = "/login";
    }
}
  return (
    <CartContext.Provider value={{ products,addFav,favorites,setFavorites ,total ,pls, mins ,addItemStorage,addTOCartEvent,removeFromCart}}>
      {props.children}
    </CartContext.Provider>
  );
}