import { FETCH_MOVIE_DETAIL } from './types';
import axios from 'axios';

export const fetchMovieDetails = (id) => dispatch => {

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5c3b5f822f7052ad5aaf92e4c4560618`)
      .then(res => {
        var movDetail = {}
        movDetail['details']=res.data;
        let { details } = movDetail;
        return dispatch({
          type: FETCH_MOVIE_DETAIL,
          payload: details
        });
  
      })
      .catch(err => {
        // console.log(err);
        throw new Error('Could not fetch movie. Try again later.');
      });
  }