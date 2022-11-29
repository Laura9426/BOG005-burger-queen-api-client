import bugerQueenLogo from '../imagenes/burger-LogoBlanco.png'
import '../hojas-de-estilo/Opciones.css'
import { useNavigate } from "react-router";
import { adminProductos } from "../Rutas/rutas";

function OpcionesAdmin() {
  const navigate = useNavigate();

  return (
    <div className='ingresar-contenedor'>
      <div className='capa-negra'>
        <figure className='burger-queen-logo-contenedor'>
          <img
            src={bugerQueenLogo}
            className='burger-queen-logo'
            alt='Logo Burger Queen'
          />
        </figure>
        <div className='bloque-opciones-contenedor'>
          <section className='bloque-opciones' onClick={() => navigate(adminProductos)}>
            <h3>productos</h3>
          </section>
          <section className='bloque-opciones'>
            <h3>usuarios</h3>
          </section>
        </div>
      </div>
    </div>
  );
}

export default OpcionesAdmin;