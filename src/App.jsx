import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Footer } from "./components/Layout/Footer/Footer";
import NavBar from "./components/Layout/NavBar/navbar";
import { Error } from "./components/error/error";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";

const App = () => {
  return (
    <>
    <BrowserRouter>
        <NavBar/>
        
         <Routes>
         <Route path='/' element={<ItemListContainer/>}/>
         <Route path='/categoria/:categoriaId' element={<ItemListContainer/>}/>
         <Route path='*' element={<Error/>}/> 

        </Routes>
     <Footer/>
    </BrowserRouter>
    
    </>
  );
};

export default App;