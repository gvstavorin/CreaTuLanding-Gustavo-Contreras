import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import styles from "./itemdetails.module.css";
import StarRating from "../RatingStars/RatingStars";
import { ItemCount } from "../ItemCount/ItemCount";
import { userCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";


export const ItemDetails = ({ product }) => {
  const navigate = useNavigate();

  const { addToCart } = userCartContext(); 
  const [showAlert, setShowAlert] = useState(false);
  const [showItemCount, setShowItemCount] = useState(true);

  const handleTerminarCompra = () => {
    navigate("/carrito");
  };

  const handleAddToCart = (cantItems) => {
    addToCart(product, cantItems);
    setShowAlert(true);
    setShowItemCount(false);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000); 
  };

  return (
    <Card className={styles.item}>
      <Card.Img src={product.image} />
      <Card.Body className={styles.body}>
        <Card.Title className={styles.title}>{product.title}</Card.Title>
        <Card.Text className={styles.text}>{product.description}</Card.Text>
        <Card.Text className={styles.precio}>${product.price}</Card.Text>
        {product.stock > 0 ? (
          <Card.Text className={styles.countItem}>
            {showItemCount && (
              <ItemCount
                product={product}
                initial={0}
                handleAddToCart={handleAddToCart}
              />
            )}
          </Card.Text>
        ) : (
          <Card.Text className={styles.noStock}>Sin stock</Card.Text>
        )}

   
  
         
{showItemCount ? (
    <div></div>
      ) : (
        <div>
          <Button variant="primary" onClick={handleTerminarCompra}>
            Ir al carrito
          </Button>
        </div>
      )}




      </Card.Body>
      <Card.Text className={styles.precio}>STOCK: {product.stock}</Card.Text>
      <Card.Footer className="text-muted">
        Valoración: <StarRating rating={product.rating.rate} /> Vendidos: {product.rating.count}
      </Card.Footer>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Producto agregado al carrito con éxito!
        </Alert>
      )}
    </Card>
  );
};
