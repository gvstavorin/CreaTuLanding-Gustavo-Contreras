import { Card } from "react-bootstrap";
import styles from "./itemdetails.module.css";
import StarRating from "../RatingStars/RatingStars";
import { ItemCount } from "../ItemCount/ItemCount";
export const ItemDetails = ({product})=>{


    return (
    
        <Card className={styles.item}>
          <Card.Img  src={product.image} />
          <Card.Body className={styles.body}>
            <Card.Title className={styles.title}>{product.title}</Card.Title>
            <Card.Text className={styles.text}> {product.description}</Card.Text>
            <Card.Text className={styles.precio}> $ {product.price}</Card.Text>
            <Card.Text>  <ItemCount Stock={product.rating.count} initial={1}></ItemCount> </Card.Text>
          
            
          </Card.Body>
          <Card.Footer className="text-muted">Valoracion: <StarRating rating={product.rating.rate} /></Card.Footer>
            
        </Card>
      );

}