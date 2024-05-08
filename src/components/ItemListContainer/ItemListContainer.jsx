/* eslint-disable react/prop-types */
import styles from "./ItemListContainer.module.css";
import { useState, useEffect } from "react";
import { getProducts, setProduct } from "../../utils/MockData";
import { ItemList } from "../ItemList/ItemList";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../spinner/Spinner";
import { useParams } from "react-router-dom";

export const ItemListContainer = ({ bgBlue, greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const {categoriaId}= useParams();
  console.log(categoriaId);




  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
        setLoading(false);
       
      })
      .catch((error) => {
        console.log(error);
      });

 
  }, []);

  const defaultTitle = "Default title";

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