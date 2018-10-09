const persistentCart = () => {
    const key = 'cartProducts';
    
    return {
      persist: (data) => localStorage.setItem('tokoflix'+key, data),
      get: () => localStorage.getItem('tokoflix'+key),
    }
  
  }
  
  export default persistentCart;
  