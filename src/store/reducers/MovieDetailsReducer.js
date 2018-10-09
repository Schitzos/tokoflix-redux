import { FETCH_MOVIE_DETAIL } from '../actions/types';

const initialState = {
  items: [],
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_MOVIE_DETAIL:
    return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}