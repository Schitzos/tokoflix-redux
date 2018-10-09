import React from "react";

const Cart = props => (
    <div>
    <li className={`nav-item dropdown ${props.display}`}>
         <button className="btn btn-sm btn-success nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded={`${props.display}`} ><i className="fas fa-shopping-cart"></i></button>
        <div className={`dropdown-menu ${props.display}`} style={{left:'-300px',maxWidth:'400px',minWidth:'350px'}} aria-labelledby="navbarDropdown2">
            <div className="dropdown-item">
                <h6 className="float-right" style={{wordWrap:"break-word",overflowX:"hidden",fontSize:'11px',marginBottom:'-10px'}}>Balance : IDR {props.wallet.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h6>
                <h6>Shopping Cart</h6>

            </div>
        {props.cartList.map(item => (
            <div key={item.id} className="dropdown-item" >
                <div className="row">
                <div className="col-2">
                <img src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} style={{minHeight: '50px', maxHeight: '50px'}}/>
                </div>
                <div className="col-10">
                    <p style={{wordWrap:"break-word",overflowX:"hidden",fontSize:'11px',marginBottom:'-10px'}}><b>{item.title}</b></p>
                    <button className="btn btn-danger btn-sm float-right" type="button" onClick={this.removeProduct}> <i className="fas fa-trash-alt" title="Delete From Shopping Cart"></i></button>
                    <hr></hr>
                    <Price rating={item.vote_average}></Price>
                </div>
                </div>
            </div>
        ))}
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
                <div className="row">
                    <div className="col-12">
                        <h6 className="float-left">Subtotal : IDR {props.totalCart.totalPrice.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h6>
                        <button className="btn btn-success btn-sm float-right" onClick={props.checkout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </li>
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