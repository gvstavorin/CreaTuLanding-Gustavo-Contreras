import { BsBasketFill } from "react-icons/bs";
import { userCartContext } from "../../context/CartContext";

export const CartWidget = () => {

  const {totalQt} = userCartContext();
    return (
      <div>
          <span> <BsBasketFill /> </span>
          <span> {totalQt} </span>
      </div>
    )
  }


