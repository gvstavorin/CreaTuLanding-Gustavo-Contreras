import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import styles from "./ItemCount.module.css";
import { userCartContext } from "../../context/CartContext";

export const ItemCount = ({ product, initial, handleAddToCart }) => {
  const { cart } = userCartContext();
  const [totalstock, setTotalStock] = useState(0);

  const getTotalStock = () => {
    const productInCart = cart.find((item) => item.id === product.id);
    return product.stock - (productInCart ? productInCart.qt : 0);
  };

  const [cantItems, setCantItems] = useState(initial);
  const [showStockAlert, setShowStockAlert] = useState(false);

  const handleAdd = () => {
    if (cantItems < getTotalStock()) {
      setCantItems(cantItems + 1);
    }
  };

  const handleSubtract = () => {
    if (cantItems > 0) {
      setCantItems(cantItems - 1);
    }
  };

  const handleAddToCartClick = () => {
    if (cantItems <= getTotalStock() && cantItems > 0) {
      Swal.fire({
        title: "Confirmación",
        text: `¿Estás seguro de que quieres agregar ${cantItems} ${
          cantItems > 1 ? "productos" : "producto"
        } al carrito?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleAddToCart(cantItems);
          Swal.fire({
            title: "¡Agregado!",
            text: `Se han agregado ${cantItems} ${
              cantItems > 1 ? "productos" : "producto"
            } al carrito.`,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
    } else {
      setShowStockAlert(true);
      setTimeout(() => {
        setShowStockAlert(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Button
        variant="outline-dark"
        onClick={handleSubtract}
        disabled={cantItems <= 0}
      >
        -
      </Button>
      <span> {cantItems} </span>
      <Button
        variant="outline-dark"
        onClick={handleAdd}
        disabled={cantItems >= getTotalStock() || product.stock === 0}
      >
        +
      </Button>

      <br />

      <Button onClick={handleAddToCartClick} disabled={cantItems === 0}>
        Agregar al carrito
      </Button>

      {showStockAlert && (
        <div className={styles.alert}>No hay suficiente stock disponible.</div>
      )}
    </div>
  );
};
