/* eslint-disable react/prop-types */
import { Footer } from "./Footer/Footer";
import  NavBar from './NavBar/navbar'
export const Layout = ({ children }) => {
  return (
    <div>
      <NavBar/>
      <div>{children}</div>
    </div>
        
    



  );
};