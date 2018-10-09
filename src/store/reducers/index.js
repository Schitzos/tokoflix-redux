import { combineReducers } from 'redux';
import movieReducer from './MovieReducer';
import popularMovieReducer from './PopularMovieReducer';
import movieDetailsReducer from './MovieDetailsReducer';
import cartReducer from './cartReducer';
import updateCartReducer from './cartUpdateReducer';
import movieRecom from './MovieRecomReducer';
import movieSimilar from './MovieSimilarReducer';

export default combineReducers({
  results: movieReducer,
  details: movieDetailsReducer,
  cartProducts: cartReducer,
  cartTotals: updateCartReducer,
  movieRec : movieRecom,
  movieSim : movieSimilar,
  popular : popularMovieReducer
});