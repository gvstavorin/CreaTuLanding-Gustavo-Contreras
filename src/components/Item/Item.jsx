/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from  "./item.module.css";


const MAX_TEXT_LENGTH = 150;

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
      // Recorta el texto y agrega una elipsis
      return text.slice(0, maxLength) + '...';
  }
  return text;
};

export const Item = ({ id, description, price, image,title,rating}) => {
  

  const Datos= {id, description, price, image,title,rating}
  

  
  const handleonClick = () => {
    console.log(Datos);
  };

  return (
    
    <Card className={styles.item}>
      <Card.Img  src={image} />
      <Card.Body className={styles.body}>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>
         
          {truncateText( description, MAX_TEXT_LENGTH)}

          </Card.Text>


        <Button className={styles.button} variant="primary" onClick={handleonClick}>
         Ver Detalles
        </Button>

        
      </Card.Body>

      <Card.Text className={styles.precio}>
         $ {price}
        </Card.Text>
    </Card>
  );
};