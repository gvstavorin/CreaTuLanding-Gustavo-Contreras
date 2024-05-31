export const getProductsByCategory = (categoriaId) => {
  const categoryMap = {
    electronica: 'electronics',
    mens: "men's clothing",
    womens: "women's clothing",
    joyeria: 'jewelery',
  };

  return categoryMap[categoriaId];
   
};
 




