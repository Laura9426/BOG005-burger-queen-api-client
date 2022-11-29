import axios from 'axios';
import { useEffect, useState } from 'react';
import '../hojas-de-estilo/PedidosEnCocina.css'

function PedidosEnCocina() {
  const urlOrdenes = 'http://localhost:8080/orders';

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


  return (
    <div className='pedidosEnCocina-contenedor'>
      <section className='tituloYlogo'>
        <img
          src={require('../imagenes/burger-LogoBlanco.png')}
          alt="Logo Burger Queen"
        />
        <h3>PEDIDOS PENDIENTES</h3>
      </section>
      <section className='pedidosPendientesCocina-contenedor'>

        {pedidos.map((pedido) => {
          return (

            <div key={pedido.id} className='pedidoPendienteCocina'>

              <><section><h3>PEDIDO #{pedido.id}</h3></section>
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
                </section><button
                  className="boton bg-naranja t-xs"
                >Pedido Completado
                </button></>

            </div>

          );
        })}
      </section>
    </div>
  );
}

export default PedidosEnCocina;