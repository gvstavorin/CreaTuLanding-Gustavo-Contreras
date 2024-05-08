import { Item } from "../Item/Item"
import { useState } from 'react';


function ItemDetails() {
    const [itemDetails, setItemDetails] = useState(null);

    // Función para manejar los datos recibidos
    const handleReceiveItemData = (itemData) => {
        setItemDetails(itemData);
    };

    return (
        <div>
            <h2>Item Details</h2>
            {itemDetails ? (
                <div>
                    <p>Título: {itemDetails.title}</p>
                    <p>Descripción: {itemDetails.description}</p>
                </div>
            ) : (
                <p>No hay datos recibidos</p>
            )}
            {/* Pasamos la función handleReceiveItemData a Item como prop */}
            <Item enviarDatos={handleReceiveItemData} itemData={{ title: 'Item Title', description: 'Item Description' }} />
        </div>
    );
}

export default ItemDetails;