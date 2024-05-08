import React from 'react';

const StarRating = ({ rating, maxRating = 5 }) => {
    // Calcula la cantidad de estrellas llenas y vacías basadas en la calificación
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5; // Si la calificación tiene un valor decimal de 0.5 o más, muestra media estrella
    const emptyStars = maxRating - filledStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {/* Renderiza las estrellas llenas */}
            {[...Array(filledStars)].map((_, index) => (
                <span key={index} className="star filled">★</span>
            ))}

            {/* Renderiza media estrella si es necesario */}
            {halfStar && <span className="star half">☆</span>}

            {/* Renderiza las estrellas vacías */}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={index} className="star empty">☆</span>
            ))}
        </div>
    );
};

export default StarRating;