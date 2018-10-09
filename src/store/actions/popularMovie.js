import { FETCH_POPULAR_MOVIE } from './types';
import axios from 'axios';

const nowPlayingApi = "https://api.themoviedb.org/3/movie/popular?api_key=5c3b5f822f7052ad5aaf92e4c4560618&page=1&region=ID";

export const fetchPopularMovie = () => dispatch => {

    axios.get(nowPlayingApi)
      .then(res => {
        let { results } = res.data;
        // console.log(res.data);
        return dispatch({
          type: FETCH_POPULAR_MOVIE,
          payload: results
        });
  
      })
      .catch(err => {
        // console.log(err);
        throw new Error('Could not fetch movie. Try again later.');
      });
  }