
import { useState } from 'react'
import NavBar from '../src/components/NavBar/navbar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'

function App() {
  const ItemListPropos= {

    grettings: 'Hola Gustavo, Bienvenido a la tienda !'
  }

  return (
    <>
       <NavBar/>
       <ItemListContainer
       
       {...ItemListPropos}
       />

    </>
  )
}

export default App
