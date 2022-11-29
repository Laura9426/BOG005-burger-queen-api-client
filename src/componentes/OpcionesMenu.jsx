import bugerQueenLogo from '../imagenes/burger-LogoBlanco.png'
import '../hojas-de-estilo/Opciones.css'
import { useNavigate } from "react-router";
import { menuAlmuerzo } from "../Rutas/rutas";

function Opciones() {
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
          <section className='bloque-opciones' onClick={() => navigate(menuAlmuerzo)}>
            <h3>nuevo <br/>pedido</h3>
          </section>
          <section className='bloque-opciones'>
            <h3>Pedidos en proceso</h3>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Opciones;