import React from "react";

const Cart = props => (
    <div key={props.id} className="dropdown-item" >
        <div className="row">
            <div className="col-2">
                <img src={`http://image.tmdb.org/t/p/w185/${props.cart.poster_path}`} alt={props.cart.title} style={{minHeight: '50px', maxHeight: '50px'}}/>
            </div>
            <div className="col-10">
                <p style={{wordWrap:"break-word",overflowX:"hidden",fontSize:'11px',marginBottom:'-10px'}}><b>{props.cart.title}</b></p>
                <button className="btn btn-danger btn-sm float-right" type="button" onClick={props.remove}> <i className="fas fa-trash-alt" title="Delete From Shopping Cart"></i></button>
                <hr></hr>
                <Price rating={props.cart.vote_average}></Price>
            </div>
        </div>
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

    return <p style={{fontSize:'14px',marginBottom:'-10px',marginTop:'-10px'}} >{price}</p>;
}
  

export default Cart;