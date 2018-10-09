import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Cart from "../cart/Cart";
import { loadCart ,removeProduct} from '../../store/actions/cart';
import { updateCart } from '../../store/actions/updateCart';
import persistentCart from "../../persistentCart";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          display:'',
        };
    }

    componentWillMount() {
        var a = localStorage.getItem('wallet');
        // console.log('will')
        if(!a){
            localStorage.setItem('wallet', 100000);
        }

        this.props.loadCart( JSON.parse(persistentCart().get()) || [] );
    }
    componentDidMount() {
        // console.log('did')
        setTimeout(() => {
          this.props.updateCart(this.props.cartList);
        }, 0);
      }
    
    componentWillReceiveProps(nextProps) {
        // console.log('willrec');
        // console.log(nextProps);
        if (nextProps.newCart !== this.props.newCart) {
          this.addProduct(nextProps.newCart);
        }
    
        if (nextProps.productToRemove !== this.props.productToRemove) {
          this.removeProduct(nextProps.productToRemove);
        }
    }

    addProduct = (product) => {
        const { cartList, updateCart } = this.props;
        let productAlreadyInCart = false;
              
        if (!productAlreadyInCart) {
            cartList.push(product);
            this.setState({openCart: 'show'});
        }
        updateCart(cartList);
    }

    removeProduct = (product) => {
        const { cartList, updateCart } = this.props;
        // console.log(cartList)
        // console.log(product)
        const index = cartList.findIndex(p => p.id === product.id);
        if (index >= 0) {
            // console.log(index);
            cartList.splice(index, 1);
            updateCart(cartList);
        }
      }
    

    checkout (params){
        const { cartList, updateCart } = this.props;
        var wallet = localStorage.getItem('wallet')

        if(wallet>params.totalPrice){
            this.setState({cost: params});
            var change = parseInt(wallet-params.totalPrice,10)
            localStorage.setItem('wallet', change);
            alert("Your purchase was successfully. The rest of your balance is IDR "+change.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

            cartList.length=0;
            updateCart(cartList);
        }
        else{
            alert("You're of out Balance")
            return
        }

    }

    resetAll(){
        const { cartList, updateCart } = this.props;
        cartList.length=0;
        localStorage.setItem('wallet', 100000);
        updateCart(cartList);
}
    
  render() {
    const {cartList} = this.props
    const {totalCart} = this.props

    const c = cartList.map(c => {
        return (
          <Cart
            cart={c}
            key={c.id}
            remove = {(e) => this.removeProduct(c)}
          />
        );
      });
    // console.log(cartList);
    const subtotal = totalCart.totalPrice.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    var wallet = parseInt(localStorage.getItem('wallet'),10)
    wallet = wallet.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" style={{color:'#42b549'}}>TokoFlix</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to={`/`}>
                            <span style={{color:'#fff'}} className="nav-link" data-menu="nowPlaying">Now Showing <span className="sr-only">(current)</span></span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/popular`}>
                            <span style={{color:'#fff'}} className="nav-link" data-menu="nowPlaying">Popular <span className="sr-only">(current)</span></span>
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li className={`nav-item dropdown ${this.state.openCart}`}>
                            <button className="btn btn-sm btn-success nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true"><i className="fas fa-shopping-cart"></i></button>
                            <div className={`dropdown-menu ${this.state.openCart}`} style={{left:'-300px',maxWidth:'400px',minWidth:'350px'}} aria-labelledby="navbarDropdown2">
                                <div className="dropdown-item">
                                    <h6 className="float-right" style={{wordWrap:"break-word",overflowX:"hidden",fontSize:'11px',marginBottom:'-10px'}}>Balance : IDR {wallet}</h6>
                                    <h6>Shopping Cart</h6>
                                </div>
                                {c}
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item">
                                <div className="row">
                                    <div className="col-12">
                                        <h6 className="float-left">Subtotal : IDR {subtotal}</h6>
                                        <button className="btn btn-success btn-sm float-right" onClick={(e) => this.checkout(totalCart)}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item">
                                <button className="btn btn-warning btn-sm float-right" onClick={(e) => this.resetAll()}>Reset Wallet and Cart</button>
                            </div>
                        </div>
                    </li>                            
                </ul>
            </div>
            </nav>
        </div>
    );
  }
}
Header.propTypes = {
    loadCart: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state => ({
    cartList: state.cartProducts.items,
    newCart: state.cartProducts.item,
    totalCart: state.cartTotals.item,
    productToRemove: state.cartProducts.itemToRemove,
  })
  
  export default connect(mapStateToProps, { loadCart,updateCart, removeProduct })(Header);

