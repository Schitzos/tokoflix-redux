import {ADD_CART, LOAD_CART,REMOVE_PRODUCT} from '../actions/types';

const initialState = {
    items: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_CART:
        return {
                ...state,
                items: action.payload
            }
        case ADD_CART:
            // this.setState({movie: action.payload});
            localStorage.setItem('item:'+action.payload.id, 1);
            return {
                ...state,
                item: Object.assign({}, action.payload)
            };
        case REMOVE_PRODUCT:
            console.log(action.payload);
            return {
                ...state,
                itemToRemove: Object.assign({}, action.payload)
            };
              default:
            return state;
    }


}