import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { userCartContext } from "../../context/CartContext";
import styles from "./Cart.module.css";
import Table from "react-bootstrap/Table";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const Cart = () => {
  const [esVisible, setEsVisible] = useState(false);
  const { cart, totalPrice, removeItem, clearCart } = userCartContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleRemoveItem = (id, price, qt) => {
    setEsVisible(false);
    removeItem(id, price, qt);
  };

  const handleCleanCart = () => {
    setEsVisible(false);
    clearCart();
  };

  const seguirCompra = () => {
    setEsVisible(!esVisible);
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = "El nombre es obligatorio";
    if (!formData.email) formErrors.email = "El correo es obligatorio";
    if (!formData.tel) formErrors.tel = "El teléfono es obligatorio";
    if (!formData.address) formErrors.address = "La dirección es obligatoria";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const showSuccessAlert = (orderId, cart, totalPrice) => {
    let orderDetails = cart
      .map((item) => `<li>${item.title} - ${item.qt} x $${item.price}</li>`)
      .join("");

    Swal.fire({
      title: "Compra realizada con éxito",
      html: `
        <p>Su numero de orden es: ${orderId}</p>
        <p><strong>Detalles de la compra:</strong></p>
        <ul>${orderDetails}</ul>
        <p><strong>Total gastado: </strong> $${totalPrice}</p>
      `,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const confirmPurchase = async () => {
    const result = await Swal.fire({
      title: "Confirmar compra",
      text: "¿Está seguro de que desea finalizar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    return result.isConfirmed;
  };

  const handleSaveCart = async () => {
    if (!validateForm()) {
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos obligatorios",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const isConfirmed = await confirmPurchase();

    if (!isConfirmed) {
      return;
    }

    const ordersCollection = collection(db, "orders");

    const newOrder = {
      buyer: formData,
      items: cart,
      date: new Date(),
      total: totalPrice,
    };

    try {
      const res = await addDoc(ordersCollection, newOrder);

      // Mostrar alerta de éxito con detalles de la compra
      showSuccessAlert(res.id, cart, totalPrice);

      // Actualizar el stock de los productos
      const updateStockPromises = cart.map(async (item) => {
        const productRef = doc(db, "productos", item.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          await updateDoc(productRef, {
            stock: productData.stock - item.qt,
          });
        } else {
          console.error("No se encontró el producto.");
        }
      });

      await Promise.all(updateStockPromises);

      clearCart();
      setEsVisible(false);
      setFormData({ name: "", email: "", tel: "", address: "" });
    } catch (error) {
      console.error("Error al crear orden o actualizar stock: ", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar su orden. Por favor, inténtelo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <main className={styles.main}>
      {cart.length === 0 ? (
        <h1>NO HAY PRODUCTOS EN EL CARRITO</h1>
      ) : (
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title>ITEMS EN CARRITO DE COMPRA</Card.Title>
            <Card.Text>
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.qt}</td>
                      <td>
                        <Button
                          onClick={() =>
                            handleRemoveItem(item.id, item.price, item.qt)
                          }
                          variant="danger"
                        >
                          <RiDeleteBin2Fill />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}>Precio total:</td>
                    <td>$ {totalPrice}</td>
                  </tr>
                </tbody>
              </Table>
              <Button onClick={handleCleanCart} variant="danger">
                Limpiar Carrito <RiDeleteBin2Fill />
              </Button>
              <Button onClick={seguirCompra} variant="primary">
                Continuar <MdDone />
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {esVisible && (
        <Card>
          <Card.Title>Ingresa tus datos para finalizar tu compra</Card.Title>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={(e) => handleOnChange(e)}
                    type="email"
                    placeholder="Ingrese su correo"
                    required
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    name="name"
                    onChange={(e) => handleOnChange(e)}
                    type="text"
                    placeholder="Nombre y apellido"
                    required
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    name="address"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Santiago, Chile 123"
                    required
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    name="tel"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Contacto teléfono / celular"
                    required
                    isInvalid={!!errors.tel}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.tel}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button onClick={handleSaveCart} variant="success">
                Comprar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </main>
  );
};
