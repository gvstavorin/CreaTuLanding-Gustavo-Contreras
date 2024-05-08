import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../utils/MockData";
import { ItemDetails } from "../ItemDetails/ItemDetails";
import {Spinner} from '../spinner/Spinner'

export const ItemDetailsContainer = () =>{

    const proId = useParams();
    const [product, setProduct] = useState([]);
    const[ loading, setLoading] = useState(true);

    useEffect(()=>{
     setLoading(true);
     getProductById(proId).then((res)=>{
         setProduct(res);
         setLoading(false);


     }).catch((error) => {
        setLoading(false);
        console.log(error)
     })
    
    },[proId]);


    return (
        <main>
    
        {loading === true ? (
          <Spinner />
        ) : (
          <div>
            <ItemDetails product={product} />
           
          </div>
        )}
      </main>
      );
}
