import '../hojas-de-estilo/PedidosAEntregar.css'
import { AiOutlineHome } from 'react-icons/ai'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { opcionesMenu } from '../Rutas/rutas';

function PedidosAEntregar() {

  const urlOrdenes = 'http://localhost:8080/orders';
  const navigate = useNavigate();
  
  const [pedidos, setPedidos] = useState([]);
  const [actualizarLista, setActualizarLista] = useState(false);

  useEffect(() => {
    axios.get(urlOrdenes, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(respuesta => {
      setPedidos(respuesta.data)
    }).catch(error => {
      console.log(error);
    })
  }, [actualizarLista]);

  const pedidosListos = () => {
    const pendientes = pedidos.filter(pedido => pedido.status === 'delivered')
    return pendientes;
  };

  const pedidoEntregado = (id) => {

    axios({
      method: 'PATCH',
      url: `${urlOrdenes}/${id}`,
      data: {
        status: "ok",
        dateProcessed: new Date()
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      setActualizarLista(!actualizarLista);
    }).catch(error => {
      console.log(error)
    })
  };


  return (
    <div className='pedidosEnCocina-contenedor'>
      <section className='tituloYlogo'>
        <img
          src={require('../imagenes/burger-LogoBlanco.png')}
          alt="Logo Burger Queen"
        />
        <h3>PEDIDOS A ENTREGAR</h3>
      </section>
      <section className='pedidosPendientesCocina-contenedor'>

        {pedidosListos().map(pedido => {
          return (
            <div key={pedido.id} className='pedidoPendienteCocina'>
              <section><h3>Pedido #{pedido.id}</h3></section>
              <section className='productosPendientes'>
                <table>
                  <tbody>

                    {pedido.products.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td><b>1</b></td>
                          <td>{item.product.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
              <button
                className="boton bg-naranja t-xs"
                onClick={() => pedidoEntregado(pedido.id)}
              >Pedido Completado
              </button>
            </div>
          );
        })}
      </section >
      <section className='boton-mesero'>
      <AiOutlineHome className='icono-volver' onClick={() => navigate(opcionesMenu)} />
        {/* <button
          className='volver'
          onClick={() => navigate(opcionesMenu)} >Volver al menu
        </button> */}
      </section>
    </div >
  )
}

export default PedidosAEntregar;