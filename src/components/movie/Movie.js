import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { NavLink } from "react-router-dom";

import Recomendation from './Recomendation';
import Similar from './Similar';

import { fetchMovieDetails } from '../../store/actions/movieDetails';
import { fetchMovieRecom } from '../../store/actions/movieRecom';
import { fetchMovieSimilar } from '../../store/actions/movieSimilar';
import { AddCart } from '../../store/actions/cart';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
          genres:[],
        };
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        var id = params.id.substr(0,params.id.indexOf('-')); 
        this.handleFetchMovieDetail(id);
        this.handleFetchMovieRecom(id);
        this.handleFetchMovieSimilar(id);
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params } } = nextProps;
        var id = params.id.substr(0,params.id.indexOf('-')); 
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.handleFetchMovieDetail(id);
            this.props.fetchMovieRecom(id);
            this.props.fetchMovieSimilar(id);
        }
    }
    
    handleFetchMovieDetail = (id) => {
        this.props.fetchMovieDetails(id);
    }
    handleFetchMovieRecom = (id) => {
        this.props.fetchMovieRecom(id);
    }
    handleFetchMovieSimilar = (id) => {
        this.props.fetchMovieSimilar(id);
    }

    addToCart(data){
        this.handleAddToCart(data);
    }
    handleAddToCart = (data) => {
        this.props.AddCart(data);
    }

  render() {
    const { detail } = this.props;
    const {recom} = this.props;
    const {similar} = this.props;
    const r = recom.slice(0, 6).map(r => {
      return (
        <Recomendation
          movie={r}
          key={r.id}
        />
      );
    });
    // console.log(similar);

    const s = similar.slice(0, 6).map(s => {
      return (
        <Similar
          movie={s}
          key={s.id}
        />
      );
    });


        return (
        <div className="container">
            <div className="pb-2 mt-4 mb-2 border-bottom">
                <Title title={detail.title}></Title>
            </div>
            <div className="row">
                <div className="col-sm-2 col-xs-12">
                    <Image img={detail.poster_path}></Image>
                </div>
                <div className="col-sm-7 col-xs-12">
                    <div className="row">
                        <div className="col-11">
                            <Overview overview={detail.overview}></Overview>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col" style={{fontSize:'12px'}}>
                            <Genres genres={detail}></Genres>
                            <Duration duration={detail.runtime}></Duration>
                            <Tagline tagline={detail.tagline}></Tagline>
                            <Release release={detail.release_date}></Release>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row" style={{bottom:'0px',top:'0px'}}>
                        <div className="col">
                            <div className="float-left">
                                <Price rating={detail.vote_average}></Price>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-danger" onClick={() => { this.addToCart(detail) }} ><i className="fas fa-shopping-cart fa-lg"></i> Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="text-center">
                        <i className="fa fa-star fa-5x" style={{color:'yellow',padding:'20px'}}></i>
                    </div>
                    <Rating rating={detail.vote_average}></Rating>
                </div>
            </div>
            <div className="row">
                <div className="pb-2 mt-4 mb-2 border-bottom">
                    <h6>Movie Recommendation</h6>
                    <div className="col-12">
                        <div className="row">
                        {r}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="pb-2 mt-4 mb-2 border-bottom">
                    <h6>Similar Movie</h6>
                    <div className="col-12">
                        <div className="row">
                        {s}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

const Title = props => (
    <h1 style={{letterSpacing:'1px'}}>{props.title}</h1>      
);

function Genres (props){
    var tes='';
    if(props.genres.length===0){
        return (<p>-</p>)
    }
    else{
        props.genres.genres.map(item => (
            tes +=  `${item.name},`
        ))
    }
    return <p><b><i className="fas fa-film"></i> Genres</b> : {tes}</p>

}

const Duration = props => (
    <p><b><i className="far fa-clock"></i> Duration</b> : {props.duration} Minutes</p>
);

const Tagline = props => (
    <p><b><i className="fas fa-hashtag"></i> Tagline</b> : {props.tagline}</p>
);

const Release = props => (
    <p><b><i className="fas fa-calendar-alt"></i> Relase Date</b> : {props.release}</p>
);

const Overview = props => (
    <p className="text-justify" style={{letterSpacing:'-1px'}}>{props.overview}</p>
);

const Rating = props => (
    <h6 className="text-center" style={{letterSpacing:'1px'}}><b>Rating {props.rating}</b></h6>
);

const Image = props => (
    <img className="img-thumbnail" src={'http://image.tmdb.org/t/p/w185/'+props.img} style={{width:'100%'}} alt="tes" onError={(e)=>{e.target.onerror = null; e.target.src="https://mbtskoudsalg.com/images/trailers-of-film-png-movie.png"}}/>
);

Movie.propTypes = {
    fetchMovieDetails: PropTypes.func.isRequired,
  }
  

// function CheckMyMovie(props){
//     console.log(props.data.id);

//     const id = props.data.id
//     const check = localStorage.getItem('item:'+id);
//     if(check==1){
//         console.log('in cart: '+check);
//         return <NavLink to={'/checkout/'} style={{color:'inherit',textDecoration:'none'}}><button className="btn btn-success" onClick={props.checkout}><i className="far fa-money-bill-alt"></i> Checkout</button></NavLink>
//     }
//     else{
//         console.log('no cart: '+check);
//         return <button className="btn btn-danger" onClick={props.cart} ><i className="fas fa-shopping-cart fa-lg"></i> Add to Cart</button>
//     }
// }


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
    return <h3>{price}</h3>;
}

const mapStateToProps = state => ({
    detail: state.details.items,
    recom: state.movieRec.items,
    similar: state.movieSim.items
})

export default connect(mapStateToProps, { fetchMovieDetails,fetchMovieRecom,fetchMovieSimilar,AddCart })(Movie);