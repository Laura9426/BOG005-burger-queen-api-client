import React, { useEffect, useState } from "react";
import '../hojas-de-estilo/MenuAlmuerzo.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from "axios";

const urlProductos = 'http://localhost:8080/products';
const urlOrdenes = 'http://localhost:8080/orders';

function MenuAlmuerzo() {
  let contador = 0;
  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState('');

  const productosAlmuerzo = () => {
    const menuAlmuerzo = productos.filter(producto => producto.type === 'Almuerzo')
    return menuAlmuerzo;
  };

  useEffect(() => {
    axios.get(urlProductos, {
      name: 'name',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(respuesta => {
      setProductos(respuesta.data)
      // console.log(respuesta.data[0].name)
    }).catch(error => {
      console.log(error);
    })
  }, []);

  const agregarPedido = (pid) => {
    const producto = productosAlmuerzo().filter(dato => dato.id === pid)
    setProductosAgregados([...producto, ...productosAgregados])
  };

  const crearPedido =  async () => {
    const pedidoCrear = {
      "userId": localStorage.getItem('userId'),
      "client": nombreCliente,
      "products": 
      productosAgregados.map(producto => {
        return {
          'qty': 1,
          'product': {
            ...producto
          }
        }
      }),
      "status": "pending",
      "dateEntry": "2022-03-05 15:14:10"
    }
    
    await axios.post(urlOrdenes, {
      pedidoCrear,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(respuesta => {
      console.log(respuesta);
    }).catch(error => {
      console.log(error);
    })
    console.log(`Bearer ${localStorage.getItem('token')}`)
    // console.log(pedidoCrear);
    // axion.post(pedidoCreado)
  }

  const guardarNombreCliente = (e) => {
    setNombreCliente(e.target.value);
  }

  return (
    <div className='menuAlmuerzo-contenedor'>
      <div className='escogerPedido-contenedor'>
        <section className='barra-menu-opciones'>
          <h3 className='titulo-desayuno'>DESAYUNO</h3>
          <h3 className='titulo-almuerzo'>ALMUERZO - CENA</h3>
        </section>
        <section className='productos-contenedor'>
          {productosAlmuerzo().map(producto => (
            <div key={producto.id} id={producto.id} className='producto'
              onClick={() => agregarPedido(producto.id)}
            ><p>{producto.name}</p></div>
          ))}

          {/* <div className='producto' onClick={() => obtenerProductos()}><p>Hamburguesas</p></div> */}

        </section>
        <section className='botones-productos'>
          <button className='boton bg-naranja t-l'>Volver al menu</button>
          <button className='boton bg-naranja t-l'>Limpiar Pedido</button>
        </section>
      </div>


      <div className='pedidoEscogido-contenedor'>
        <section className='imagenLogo-contenedor'>
          <img
            src={require('../imagenes/burger-LogoNegro.png')}
            alt="Logo Burger Queen"
          />
        </section>
        <section className='titulo-pedido-contenedor'>
          <h3 className='titulo-pedido'>PEDIDO</h3>
        </section>
        <section className='input-nombreCliente'>
          <input type="text" placeholder='Nombre Cliente' onChange={guardarNombreCliente} />
        </section>
        <section className='productos-escogidos-contenedor'>
          <table>
            <tbody>
              {productosAgregados.map(item => (
                <tr key={contador++}>
                  <td ><span>{item.name}</span></td>
                  <td className='precio-tabla'>{item.price}</td>
                  <td className='eliminarProducto-icono'><AiFillCloseCircle /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className='total-pedido'>
          <table>
            <tbody>
              <tr>
                <td><b>TOTAL</b></td>
                <td className='precioTotal-tabla'><b>$22.00</b></td>
              </tr>
            </tbody>
          </table>
        </section>
        <br /><br />
        <button className="boton bg-naranja t-l"
          onClick={crearPedido}>Enviar a cocina</button>
      </div>
    </div >
  );
}

export default MenuAlmuerzo;