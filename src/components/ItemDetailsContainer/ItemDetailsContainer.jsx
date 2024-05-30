import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetails } from "../ItemDetails/ItemDetails";
import {Spinner} from '../spinner/Spinner'
import { collection,getDoc,doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
export const ItemDetailsContainer = () =>{

    const {productoId} = useParams();
    const [product, setProduct] = useState([]);
    const[ loading, setLoading] = useState(true);

    useEffect(()=>{
     setLoading(true);  
     const productsCollection = collection(db,"productos");
     const refDoc = doc(productsCollection,productoId);

     
      getDoc(refDoc).then((res)=>{
        
        setProduct({id:res.id,...res.data()});
        setLoading(false);

      }).catch((err)=>{

        console.log(err);
        setLoading(false)
      })
    
    },[productoId]);


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
