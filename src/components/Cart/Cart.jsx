import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { userCartContext } from "../../context/CartContext";
import styles from "./Cart.module.css";
import Table from "react-bootstrap/Table";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export const Cart = () => {
  const [esVisible, setEsVisible] = useState(false);
  const { cart, totalPrice, removeItem, clearCart } = userCartContext();
  const [formData,setFormData]= useState({name:'',email:'',tel:'',address:''});

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

   
  const handleOnChange = (e)=>{
    
       setFormData({...formData, [e.target.name]: e.target.value})
    };
    
  const handleSaveCart=()=>{

    const ordersCollection = collection (db, "orders")

    const newOrder = {
      buyer: formData,
      items : cart,
      date : new Date(),
      total: totalPrice
    }

    addDoc(ordersCollection, newOrder).then((res)=>{
      alert("Compra realizada con exito, su numero de orden es : "+ res.id   );
      clearCart(); 
      setEsVisible(false);
      setFormData({name:'',email:'',tel:'',address:''});
    })


  }

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
                          onClick={() => handleRemoveItem(item.id, item.price, item.qt)}
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
                  <Form.Control name="email" onChange={(e)=> handleOnChange(e) } type="email" placeholder="Ingrese su correo" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control name="name" onChange={(e)=> handleOnChange(e) }  type="text" placeholder="Nombre y apellido" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control name="address" onChange={(e)=> handleOnChange(e) }  placeholder="Santiago, Chile 123" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control name="tel" onChange={(e)=> handleOnChange(e) }  placeholder="Contacto teléfono / celular" />
                </Form.Group>
              </Row>
              <Button onClick={handleSaveCart} variant="success" >
                Comprar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </main>
  );
};