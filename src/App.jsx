import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Footer } from "./components/Layout/Footer/Footer";
import NavBar from "./components/Layout/NavBar/navbar";
import { Error } from "./components/error/error";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import { ItemDetails } from "./components/ItemDetails/ItemDetails";
import { ItemDetailsContainer } from "./components/ItemDetailsContainer/ItemDetailsContainer";
import CartContextProvider from "./context/CartContext";
import { Cart } from "./components/Cart/Cart";
import { TrackOrder } from "./components/TrackOrder/TrackOder";


const App = () => {
  return (
    <CartContextProvider> 
    <>
    <BrowserRouter>
        <NavBar/>
        
         <Routes>
         <Route path='/' element={<ItemListContainer/>}/>
         <Route path='/categoria/:categoriaId' element={<ItemListContainer/>}/>
         <Route path='/producto/:productoId' element={<ItemDetailsContainer/>}/>
         <Route path="/seguimiento" element={<TrackOrder/>}/>
         <Route path='/carrito' element={<Cart/>}/> 
         <Route path='*' element={<Error/>}/> 

        </Routes>
        <Footer/>
    </BrowserRouter>
    
    </>
    </CartContextProvider>
  );
};

export default App;