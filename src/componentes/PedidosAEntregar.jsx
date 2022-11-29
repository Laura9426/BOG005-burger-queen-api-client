import '../hojas-de-estilo/PedidosAEntregar.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { opcionesMenu } from '../Rutas/rutas';

function PedidosAEntregar() {

  const urlOrdenes = 'http://localhost:8080/orders';
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get(urlOrdenes, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(respuesta => {
      console.log(respuesta.data)
      setPedidos(respuesta.data)
    }).catch(error => {
      console.log(error);
    })
  }, []);

  const pedidosListos = () => {
    const pendientes = pedidos.filter(pedido => pedido.status === 'delivered')
    return pendientes;
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
              <section><h3>Pedido {pedido.id} de {pedido.client}</h3></section>
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
            </div>
          );
        })}
      </section>
      <section className='boton-mesero'>
      <button
        className='boton bg-naranja t-l'
        onClick={() => navigate(opcionesMenu)} >Volver al menu
      </button>
      </section>
    </div>
  )
}

export default PedidosAEntregar;