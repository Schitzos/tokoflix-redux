import { UPDATE_CART} from './types';
import persistentCart from "../../persistentCart";

export const updateCart = (cartList) => dispatch => {

  let totalPrice = cartList.reduce( (sum, p) => {
    const rating = p.vote_average;
    var price ='';
    if(rating){
        if (rating>=1 && rating <3) {
           price ='3500';
        }
        else if(rating>=3 && rating <6){
            price = '8250';
        }
        else if(rating>=6 && rating<8){
            price = '16350';
        }
        else if(rating>=8 && rating <10){
            price = '21250';
        }
        else if(rating<1){
            price = '3500';
        }
        else{
            price = '';
        }
    }
    else{
        price = '3500';
    }

    sum += parseInt(price,10);

    return sum;
  }, 0);  

  let cartTotals = {
    totalPrice,
  }

  persistentCart().persist(JSON.stringify(cartList));

  dispatch({
    type: UPDATE_CART,
    payload: cartTotals,
  });

}
