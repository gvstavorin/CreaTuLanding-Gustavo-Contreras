import { Button, Card } from "react-bootstrap";
import { userCartContext } from "../../context/CartContext";
import styles from "./Cart.module.css";
import Table from "react-bootstrap/Table";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdDone } from "react-icons/md";



export const Cart = () => {
      const  {cart,totalPrice,removeItem,clearCart} = userCartContext();
     
      const handleRemoveItem=(id,price,qt)=>{
       removeItem(id,price,qt);
      };
      const handleCleanCart=()=>{
  
        clearCart();
      }

      return (
        
     <main className={styles.main}>

        <Card className={styles.card}> 
            <Card.Body>
            <Card.Title>ITEMS EN CARRITO DE COMPRA</Card.Title>
            <Card.Text>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio </th>
              <th>Cantidad</th>
              <th>  -  </th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item,index)=>{
                return (

                    <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.qt}</td>
                    <td> <Button  onClick={()=>handleRemoveItem(item.id,item.price,item.qt)} variant="danger"> <RiDeleteBin2Fill /></Button> </td>
                    <td> </td>
                </tr> 
                )
            })}

            <tr>
                <td colSpan={4}> Precio total : </td>
                <td>$ {totalPrice}</td>
            </tr>
                 
          </tbody>
          
          </Table>
          <Button  onClick={handleCleanCart} variant="danger">  Limpiar Carrito <RiDeleteBin2Fill /></Button> 
          <Button  onClick={handleCleanCart} variant="success">  Finzalizar Compra <MdDone /></Button> 
          </Card.Text>
          </Card.Body>
   



        </Card>
   
    </main>
      );
  
};
