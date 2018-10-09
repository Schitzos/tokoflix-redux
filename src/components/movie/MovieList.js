import React from "react";
import { NavLink } from "react-router-dom";

const MovieList = props => (
    <div key={props.id} className="col-lg-2 col-sm-3 col-md-3 col-xs-6" style={{marginBottom:'5px'}}>
    <NavLink to={`/movie/${props.movie.id}-${props.movie.title.replace(/ /g,"-")}`}>
        <img style={{minHeight:'225px',maxHeight:'225px',width:'100%'}} className="img-thumbnail" src={`http://image.tmdb.org/t/p/w185/${props.movie.poster_path}`} alt={props.movie.title} onError={(e)=>{e.target.onerror = null; e.target.src="https://mbtskoudsalg.com/images/trailers-of-film-png-movie.png"}} />
        <h6 className="text-center" style={{position:'absolute',fontSize:'11px',top:'200px',right:'20px'}}>
            <span style={{color:'white',letterSpacing:'1px',background:'rgb(0,0,0,0.7)',padding:'5px',zIndex:'1'}}>
                <i className="fa fa-star" style={{color:'yellow'}}></i>
                {props.movie.vote_average}
            </span>
        </h6>
        <Price rating = {props.movie.vote_average}></Price>
        <h6 className="text-center" style={{fontSize:'12px',marginTop:'10px'}}><b>{props.movie.title}</b></h6>
    </NavLink>
    </div>
);

function Price(props) {
  const rating = props.rating;
  var price ='';
  if(rating){
      if (rating>=1 && rating <3) {
         price ='IDR 3.500';
      }
      else if(rating>=3 && rating <6){
          price = 'IDR 8.250';
      }
      else if(rating>=6 && rating<8){
          price = 'IDR 16.350';
      }
      else if(rating>=8 && rating <10){
          price = 'IDR 21.250';
      }
      else if(rating<1){
          price = 'IDR 3.500';
      }
      else{
          price = '';
      }
  }
  else{
      price = 'IDR 3.500';
  }
  return <h6 className="text-center" style={{position:'absolute',fontSize:'11px',top:'20px',right:'20px'}}><span style={{color:'white',letterSpacing:'1px',background:'rgb(0,0,0,0.7)',padding:'5px',zIndex:'1'}}>{price}</span></h6>;
  }


export default MovieList;

