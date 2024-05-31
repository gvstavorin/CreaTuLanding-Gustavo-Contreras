import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./ItemCount.module.css";

export const ItemCount = ({ product, initial, handleAddToCart }) => {
  const [cantItems, setCantItems] = useState(initial);
  const [showModal, setShowModal] = useState(false);

  if (!product || typeof product.stock === 'undefined') {
    return <div>Error: Producto no encontrado o sin stock definido.</div>;
  }

  const handlleAdd = () => {
    if (cantItems < product.stock) {
      setCantItems(cantItems + 1);
    }
  };

  const handlleSubs = () => {
    if (cantItems > 0) {
      setCantItems(cantItems - 1);
    }
  };

  const handleAgregarAlCarrito = () => {
    setShowModal(true);
  };

  const handleConfirmarAgregar = () => {
    if (cantItems <= product.stock) {
      handleAddToCart(cantItems);
      setShowModal(false);
    } else {
      alert('No hay suficiente stock disponible');
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button 
        variant="outline-dark" 
        onClick={handlleSubs} 
        disabled={cantItems <= 0}
      > 
        - 
      </Button>
      <span> {cantItems} </span>
      <Button 
        variant="outline-dark" 
        onClick={handlleAdd} 
        disabled={cantItems >= product.stock}
      > 
        + 
      </Button>

      <br />

      <Button 
        onClick={handleAgregarAlCarrito} 
        disabled={cantItems === 0}
      >
        Agregar al carrito
      </Button>

      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres agregar {cantItems} {cantItems > 1 ? 'productos' : 'producto'} al carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmarAgregar}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
