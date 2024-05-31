import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { db } from "../../firebase/firebase"; // Asegúrate de ajustar la ruta según tu estructura
import { getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import styles from "./TrackOder.module.css"; // Crea y ajusta los estilos según tu necesidad

export const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    if (!trackingId) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingrese un número de seguimiento",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoading(true);
    setOrderStatus(null);

    try {
      const orderRef = doc(db, "orders", trackingId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        setOrderStatus(orderSnap.data());
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró ninguna orden con ese número de seguimiento",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al obtener la información del seguimiento. Por favor, inténtelo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>Seguimiento de Pedido</Card.Title>
          <Form onSubmit={handleTrackOrder}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTrackingId">
                <Form.Label>Número de Seguimiento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su número de seguimiento"
                  value={trackingId}
                  onChange={handleOnChange}
                  required
                />
              </Form.Group>
            </Row>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Buscando..." : "Rastrear Pedido"}
            </Button>
          </Form>
          {orderStatus && (
            <div className={styles.orderStatus}>
              <h3>Detalles del Pedido</h3>
              <p><strong>Nombre:</strong> {orderStatus.buyer.name}</p>
              <p><strong>Correo:</strong> {orderStatus.buyer.email}</p>
              <p><strong>Teléfono:</strong> {orderStatus.buyer.tel}</p>
              <p><strong>Dirección:</strong> {orderStatus.buyer.address}</p>
              <h4>Items Comprados</h4>
              <ul>
                {orderStatus.items.map((item, index) => (
                  <li key={index}>{item.title} - {item.qt} x ${item.price}</li>
                ))}
              </ul>
              <p><strong>Total:</strong> ${orderStatus.total}</p>
              <p><strong>Fecha de Compra:</strong> {new Date(orderStatus.date.seconds * 1000).toLocaleString()}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </main>
  );
};
