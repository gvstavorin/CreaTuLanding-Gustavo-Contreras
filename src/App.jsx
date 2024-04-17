
import { useState } from 'react'
import NavBar from '../src/components/NavBar/navbar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'

function App() {
  const ItemListPropos= {
    greeting: 'Hola Gustavo, Bienvenido a la tienda !',
    bgBlue: true
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
