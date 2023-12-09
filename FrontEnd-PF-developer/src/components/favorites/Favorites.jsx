// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { favorites, getProducts } from '../actions/actions'
// import Card from './Card'
// import styles from './Favorites.module.css'

// //import Construction from './Construction'

// const Favorites = () => {
//   const navegation = useNavigate()
//   var array = []
//   const dispatch = useDispatch()
//   const favorite = useSelector(state => state.favorites)
//   const products = useSelector(state => state.shoes)

//   if(products.length === 0){
//     dispatch(getProducts())
//   }
//   useEffect(() => {
//     dispatch(favorites(array))
//   }, [])
//   if(localStorage.getItem('favoritos') != null){
//     array = JSON.parse(localStorage.getItem('favoritos'))
//   }
//   if (localStorage.getItem('favoritos') === null) {
//     return navegation("/shop")
//   }
  
//    if(localStorage.getItem('favoritos') != null || !(Object.values(localStorage.getItem('favoritos')).length === 0) ){
//     return (
//       <div className={styles.containerfav}>
//         <h1 className={styles.titulofav}>Favorites</h1>
//         <div className={styles.icontainerfav}>
//         {
//             !(array[0] === undefined) ? array.map(item =>
//               <Card className={styles.cardfav}
//                 key={item.id}
//                 id={item.id}
//                 fullName={item.masterName}
//                 price={item.price}
//                 img={item.imagecover}
//                 component={"favorites"} />) :
//           navegation("/shop") 
//         }
//         </div>
//       </div>
//     )
//       }else{
//         return (
//           <div>
//             <h1>nothing to show here</h1>
//           </div>
//         )
//       }
// }

// export default Favorites

/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
// pages/favorites.js


// Favorites.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFavs } from "@/redux/actions"; // Asegúrate de importar las acciones correctas
import ProductCard from "./ProductCard"; // Debes tener un componente que muestre los detalles del producto

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.allFavoritesBack);

  useEffect(() => {
    // Obtener la lista de favoritos al cargar el componente
    dispatch(getAllFavs(/* Pasa el ID del usuario si es necesario */));
  }, [dispatch]);

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.map((product) => (
        <ProductCard key={product.id} product={product} />
        // Puedes crear un componente ProductCard para mostrar los detalles del producto
      ))}
    </div>
  );
};

export default Favorites;
