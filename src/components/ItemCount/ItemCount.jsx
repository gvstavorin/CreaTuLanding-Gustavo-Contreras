import styles from "./ItemCount.module.css";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ItemCount = ({ stock, initial, handlleAddToCart }) => {
  const navigate = useNavigate();
  const [cantItems, setCantItems] = useState(0);
  const [pordAgregado, setProdAgregado] = useState(false);

  const handlleAdd = () => {
    setCantItems(cantItems + 1);
  };
  const handlleSubs = () => {
    if (cantItems > 0) {
      setCantItems(cantItems - 1);
    }
    // if (cantItems > 0) setCantItems(cantItems - 1)
    // cantItems > 0 ? setCantItems(cantItems - 1) : alert('No se puede restar')
    // cantItems > 0 && setCantItems(cantItems - 1)
  };

  const handleTerminarCompra = () => {
    setProdAgregado(false);
    navigate("/carrito");
  };

  const handleAgregarAlCarrito = () => {
    setProdAgregado(true);
    handlleAddToCart(cantItems);
  };

  return (
    <>
      <div>
    
      <Button variant="outline-dark"  onClick={handlleSubs}> - </Button>
        <span> {cantItems} </span>
        <Button variant="outline-dark" onClick={handlleAdd}> + </Button>
      
      </div>
      <br />

      {pordAgregado ? (
        <button onClick={handleTerminarCompra}> Terminar Compra </button>
      ) : (
        <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
      )}
    </>
  );
};
