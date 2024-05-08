import { Link } from 'react-router-dom'
import style from './error.module.css'

export const Error = () =>{


return(

<div className={style.section}>
  <h1 className="error">404</h1>
  <div className="page">Ups ! Error al encontrar la pagina solicitada.</div>
  <Link to='/'>
   Volver a Home
   </Link>
</div>
)

}