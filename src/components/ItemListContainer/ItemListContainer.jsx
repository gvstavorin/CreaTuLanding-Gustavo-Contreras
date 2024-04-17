
import styles from '../ItemListContainer/ItemListContainer.module.css'

export const ItemListContainer = ( { bgBlue, greeting } ) => {
    
    // const { bgBlue, greeting } = props

    // const bgBlue = props.bgBlue
    // const greeting = props.greeting

    const defaultTitle = "Default title"

    return (
        <main>
            <h1> { greeting ? greeting : defaultTitle } </h1>
            <div className = { bgBlue ? styles.background : styles.backgroundGreen}>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, possimus similique nihil doloremque voluptatem provident? 
                    Praesentium debitis accusantium mollitia illum eum, similique dolorum ab temporibus ullam tenetur nulla quaerat quisquam. </p>
            </div>
        </main>
    )
}


export default ItemListContainer;