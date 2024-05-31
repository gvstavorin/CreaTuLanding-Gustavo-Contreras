import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import styles from "./itemdetails.module.css";
import StarRating from "../RatingStars/RatingStars";
import { ItemCount } from "../ItemCount/ItemCount";
import { userCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";


export const ItemDetails = ({ product }) => {

  const { addToCart } = userCartContext(); 
  const [showAlert, setShowAlert] = useState(false);
  const [showItemCount, setShowItemCount] = useState(true);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [totalItem, setTotalItem] = useState(0);




  const handleAddToCart = (cantItems) => {
    if (cantItems <= product.stock) {
      addToCart(product, cantItems);
      setShowItemCount(false);
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      setShowStockAlert(true); 
    }
  };

  const handleSetShowStockAlert = (value) => {
    setShowStockAlert(value); 
  };

  return (
    <div>
      <Card className={styles.item}>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Producto agregado al carrito con exito!
          </Alert>
        )}
        {showStockAlert && (
          <Alert variant="danger" onClose={() => setShowStockAlert(false)} dismissible>
            No hay suficiente stock disponible para agregar tantos productos.
          </Alert>
        )}
        <Card.Img src={product.image} />
        <Card.Body className={styles.body}>
          <Card.Title className={styles.title}>{product.title}</Card.Title>
          <Card.Text className={styles.text}>{product.description}</Card.Text>
          <Card.Text className={styles.precio}>${product.price}</Card.Text>
          {product.stock > 0  && totalItem <= product.stock ? (
            <Card.Text className={styles.countItem}>
              {showItemCount && (
                <ItemCount
                  product={product}
                  initial={0}
                  handleAddToCart={handleAddToCart}
                  setShowStockAlert={handleSetShowStockAlert}
                  totalItem = {totalItem}
                />
              )}
            </Card.Text>
          ) : (
            <Card.Text className={styles.noStock}>Sin stock </Card.Text>
          )}

          {!showItemCount && (
            <div>
              <Button variant="primary" onClick={() => setShowItemCount(true)}>
                Volver a agregar
              </Button>
            </div>
          )}
        </Card.Body>
        <Card.Text className={styles.precio}>STOCK: {product.stock}</Card.Text>
        <Card.Footer className="text-muted">
          Valoración: <StarRating rating={product.rating.rate} /> Vendidos: {product.rating.count}
        </Card.Footer>
      </Card>
    </div>
  );
};
