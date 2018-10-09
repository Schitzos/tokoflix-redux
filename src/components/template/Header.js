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
          wallet:100000,
          cost:0,
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
        alert('asdasd');
        const { cartList, updateCart } = this.props;
        // console.log(cartList);
        // console.log(product);
        const index = cartList.findIndex(p => p.id === product.id);
        if (index >= 0) {
            cartList.splice(index, 1);
          updateCart(cartList);
        }
      }
    

    checkout (params){
        if(this.state.wallet>params.totalPrice){
            this.setState({cost: params});
            var change = parseInt((this.state.wallet)-params.totalPrice,10)
            this.setState({wallet: change});
            localStorage.setItem('wallet', change);
            alert("Your purchase was successfully. The rest of your balance is IDR "+change.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        }
        else{
            alert("You're of out Balance")
            return
        }

    }
    
  render() {
    const {cartList} = this.props
    const {totalCart} = this.props
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
                    <Cart removeProduct={(e) => this.removeProduct(cartList)} cartList={cartList} checkout={(e) => this.checkout(totalCart)} totalCart={totalCart} wallet={parseInt(localStorage.getItem('wallet'),10)} display={this.state.openCart}></Cart>
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

