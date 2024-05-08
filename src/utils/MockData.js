
 export const getProducts = () => {
  return new Promise((resolve, reject) => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`Error en la respuesta de la API: ${response.status}`));
        } else {
          return response.json();
        }
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        reject(error);
      });
  });
};

export const getProductsByCategory = (categoriaId) => {
  const categoryMap = {
    electronica: 'electronics',
    mens: "men's clothing",
    womens: "women's clothing",
    joyeria: 'jewelery',
  };

  const apiCategory = categoryMap[categoriaId] || categoriaId;

  return new Promise((resolve, reject) => {
    fetch(`https://fakestoreapi.com/products/category/${apiCategory}`)
      .then((response) => {
        if (!response.ok) {
          return reject(new Error(`Error en la API: ${response.statusText}`));
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        reject(error);
      });
  });
};
 

export const getProductById = (proId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://fakestoreapi.com/products/${proId.productoId}`)
      .then((response) => {
        if (!response.ok) {
          return reject(new Error(`Error en la API: ${response.statusText}`));
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        reject(error);
      });
  });
};