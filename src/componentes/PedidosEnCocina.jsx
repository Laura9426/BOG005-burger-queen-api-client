import axios from 'axios';
import { useEffect, useState } from 'react';
import '../hojas-de-estilo/PedidosEnCocina.css'

function PedidosEnCocina() {
  const urlOrdenes = 'http://localhost:8080/orders';

  const [pedidos, setPedidos] = useState([]);
  // const [productos, setProductos] = useState([]);

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

  // const productosArray = () => {
  //   const produtosObjeto = pedidos.map(pedidos => pedidos.products);
  //   return produtosObjeto
  // }

  // console.log(productosArray)
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
        <div className='pedidoPendienteCocina'>
          <section><h3>PEDIDO #1</h3></section>
          <section className='productosPendientes'>
            <table>
              <tbody>
                  <tr>
                    <td><b>1</b></td>
                    <td>hamburguesa</td>
                  </tr>
              </tbody>
            </table>
          </section>
          <button
            className="boton bg-naranja t-xs"
          >Pedido Completado
          </button>

        </div>
      </section>
    </div>
  );
}

export default PedidosEnCocina;