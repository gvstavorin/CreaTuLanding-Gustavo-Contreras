import { Link } from "react-router-dom";
import { BsBasketFill } from "react-icons/bs";
import { userCartContext } from "../../context/CartContext";

export const CartWidget = () => {
  const { totalQt } = userCartContext();

  return (
    <div>
      {/* Utiliza un Link con el icono del carrito */}
      <Link to="/carrito" title={`Hay ${totalQt} productos en el carrito`}>
        <BsBasketFill />
      </Link>
      <span> {totalQt} </span>
    </div>
  );
};
