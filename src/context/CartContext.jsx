import {createContext, useContext, useState} from 'react'

const cartContext = createContext();

export const{Provider} = cartContext;

export const userCartContext = () =>{
    return useContext(cartContext);
};

const CartContextProvider =({children})=>{
    const [totalQt, setTotalQt] = useState(0);
    const [cart,setCart]=useState([]);
    const [totalPrice,setTotalPrice] = useState(0);



    const addToCart = (item, qt)=>{
        setTotalQt(totalQt + qt);
        setTotalPrice(totalPrice + item.price*qt)

        if(isInCart(item.id)){
             const newCart = cart.map((el)=>{
                if(el.id === item.id){
                    return {...el,qt:el.qt + qt};
                }else {
                    return el;
                }
             })
            setCart(newCart);
        }else {
            setCart([...cart,{...item,qt}]);
        }
        
      
    };
     const isInCart=(id)=>{
           return cart.find((el)=> el.id===id);
     };


     const removeItem=(id,price,qt)=>{
        
        setTotalPrice(totalPrice - price * qt);
        setTotalQt(totalQt - qt);
        const newCart = cart.filter((elem) => elem.id !== id);
        setCart(newCart);
    
     };
 
     const clearCart=()=>{
    
          setCart([]);
          setTotalQt(0);
          setTotalPrice(0);
         
     }
     const contextValue ={
        totalQt,
        totalPrice,
        cart,
        addToCart,
        removeItem,
        clearCart
     };
    
    return <Provider value={contextValue} >{children} </Provider>
};

export default CartContextProvider; 