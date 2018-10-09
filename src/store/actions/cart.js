import { LOAD_CART, ADD_CART, REMOVE_PRODUCT } from './types';

export const AddCart = (productData) => dispatch => {
  // console.log(productData);
  dispatch({
    type: ADD_CART,
    payload: productData,
  });
}

export const loadCart = (cartProducts) => dispatch => {
  dispatch({
    type: LOAD_CART,
    payload: cartProducts,
  });
}

export const removeProduct = (productData) => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: productData,
  });
}