import axios from "axios";

import {
  SHOW_LOADER,
  HIDE_LOADER,
  FILTROS_AND_PAGINATION,
  GET_BY_ID,
  GET_PRODUCTS_BY_NAME,
  CLEAR_DETAIL,
  GET_ALL_CATEGORIES,
  SEARCH_PRODUCTS,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  SORT_PRICE,
  GET_FAVORITES,
  RESET
} from "./action-type";

const URL = 'https://autenticacion-prueba-nicolas-s-projects-9dbaafa4.vercel.app';


export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};


export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};



export const getFiltersAndPagination = (filtros, pageNumber) => {
  return async (dispatch) => {
    // Construye un objeto que solo incluye filtros que tienen un valor definido y no son nulos
    const filtrosValidos = Object.keys(filtros).reduce((acc, key) => {
      if (filtros[key] !== null && filtros[key] !== undefined) {
        acc[key] = filtros[key];
      }
      return acc;
    }, {});

    try {
      // Construye la cadena de consulta de la URL para filtros y paginación
      const queryString = new URLSearchParams(filtrosValidos).toString();
      const url = `${URL}/products?${queryString}&page=${pageNumber}`;
      console.log(url)
      const response = await axios.get(url);

      dispatch({
        type: FILTROS_AND_PAGINATION,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error en la solicitud de paginación con filtros:', error);
    }
  };
};

export function getByID(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/products/${id}`);
      dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getProductsname(name) {
  return async function (dispatch) {
    const productsname = (await axios.get(`${URL}/products?name=${name}`)).data;
    console.log(productsname)
    dispatch({
      type: GET_PRODUCTS_BY_NAME,
      payload: productsname,
    });
  };
}

export function clearDetail(){
  console.log("llegue aca")
  return {
    type: CLEAR_DETAIL,
  };
}

export function reset() {
  return async function (dispatch) {
    dispatch({
      type: RESET
    });
  };
}

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/categorias");
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const buscarProductos = ({
  nombre,
  categoria,
  precioMin,
  precioMax,
  page,
}) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/filtros/search?nombre=${nombre}&categoriaId=${categoria}&precioMin=${precioMin}&precioMax=${precioMax}&page=${page}`
      );
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };
};


export const sortProducts = (orderBy) => {
  return {
    type: SORT_PRICE,
    payload: orderBy,
  };
};

export const userRegister = (formData) => async () => {
  try {
    const response = await axios.post("/usuarios", formData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
export const getCarrito = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/carrito/${userId}`);
      console.log("Datos del carrito recibidos:", data);
      dispatch({
        type: GET_CART,
        payload: data.data,
      });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };
};

export const actualizarCarrito = (userId, carritoActualizado) => {
  return async (dispatch) => {
    try {
      await axios.put(`/carrito/${userId}`, { carrito: carritoActualizado });
      console.log("Carrito actualizado:", carritoActualizado);
      dispatch({
        type: UPDATE_CART,
        payload: carritoActualizado,
      });
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };
};
export const agregarAlCarrito =
  (userId, productId, cantidad, idCarrito, subtotal) => async (dispatch) => {
    try {
      const response = await axios.post("/carrito/addItem", {
        id_usuario: userId,
        id_producto: productId,
        cantidad,
        id_carrito: idCarrito,
        subtotal,
      });
      dispatch({
        type: ADD_TO_CART,
        payload: response.data.data,
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

export const eliminarDelCarrito = (userId, productId) => async (dispatch) => {
  try {
    const response = await axios.post("/carrito/delete", {
      id_usuario: userId,
      id_producto: productId,
    });
    console.log("Respuesta del servidor:", response.data);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
  }
};

export const getFavorites = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/favoritos/${id}`);
    dispatch({
      type: GET_FAVORITES,
      payload: data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavorite = (datos) => async () => {
  try {
    const { data } = await axios.post("/favoritos/delete", datos);
  } catch (error) {
    console.error(error);
  }
};


/* --------------------------------------------
  file: redux -actions
 
  description:  Auth0 Management
-----------------------------------------------*/



// export const getApiJWT = (token) => {
//   return new Promise((resolve, reject) => {
//     try {
//       let options = {
//         method: "GET",
//         url: "/auth",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       };

//       axios.request(options).then((res) => {
//         resolve(res.data);
//       });
//     } catch (err) {
//       console.log(">> ERROR");
//       reject(err);
//     }
//   });
// };

// export const getUsers = (apiToken) => {
//   return new Promise((resolve, reject) => {
//     let options = {
//       method: "GET",
//       url: `/users`,
//       headers: {
//         authorization: `Bearer ${apiToken}`,
//       },
//     };

//     axios
//       .request(options)
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// export const getUser = (userId, apiToken) => {
//   return new Promise((resolve, reject) => {
//     let options = {
//       method: "GET",
//       url: `/users/${userId}`,
//       headers: {
//         authorization: `Bearer ${apiToken}`,
//       },
//     };

//     axios
//       .request(options)
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };
