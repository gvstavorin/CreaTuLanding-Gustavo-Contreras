/* eslint-disable react/prop-types */
import styles from "./ItemListContainer.module.css";
import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../spinner/Spinner";
import { useParams } from "react-router-dom";
import {db} from '../../firebase/firebase';
import { collection, getDocs, query, where} from "firebase/firestore";
import { getProductsByCategory } from "../../utils/utilytifb";

export const ItemListContainer = ({ bgBlue, greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const { categoriaId } = useParams();

  const categoria = getProductsByCategory(categoriaId);



  useEffect(() => {
    setLoading(true);

     const productsCollection = collection(db,'productos');
     if(categoriaId){
          const consulta =  query(productsCollection, where("category","array-contains", categoria) );

          getDocs(consulta)
          .then(({docs})=>{
            const prodFromDocs = docs.map((doc)=>({
              id:doc.id
              ,...doc.data()}))
    
            setProducts(prodFromDocs);
            setLoading(false);
          })
          .catch((err=>{
            console.log(err);
            setLoading(false);
          }))

          //  getProductsByCategory(categoriaId).then((res)=>{
          //   setProducts(res);
          //   setLoading(false)
          //    })

    }
    else{

      getDocs(productsCollection)
      .then(({docs})=>{
        const prodFromDocs = docs.map((doc)=>({
          id:doc.id
          ,...doc.data()}))

        setProducts(prodFromDocs);
        setLoading(false);
      })
      .catch((err=>{
        console.log(err);
        setLoading(false);
      }))


      // getProducts()
      // .then((res) => {
      //   setProducts(res);
      //   setLoading(false);    
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

    }

  

 

 
  }, [categoriaId]);

  return (
    <main>

    {loading === true ? (
      <Spinner />
    ) : (
      <div>
        <ItemList productsList={products} />
       
      </div>
    )}
  </main>
  );
};