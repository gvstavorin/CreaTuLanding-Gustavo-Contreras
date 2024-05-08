
  export const getProducts = () => {
    return fetch("https://fakestoreapi.com/products").then((res) => res.json());

  };

  export const getProductsByCategory = (categoriaId) => {
    return fetch("https://fakestoreapi.com/products").then((res) => res.json());

  };
  
  export const setProduct = () => {
    return fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    }).then((res) => res.json());
  

  };