import { FETCH_MOVIE_SIMILAR } from './types';
import axios from 'axios';

export const fetchMovieSimilar = (id) => dispatch => {

    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=5c3b5f822f7052ad5aaf92e4c4560618&page=1`)
      .then(res => {
        let { results } = res.data;
        return dispatch({
          type: FETCH_MOVIE_SIMILAR,
          payload: results
        });
  
      })
      .catch(err => {
        // console.log(err);
        throw new Error('Could not fetch movie. Try again later.');
      });
  }