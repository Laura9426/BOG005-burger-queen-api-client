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
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExitoso, setMensajeExitoso] = useState('diana es una burja');

  useEffect(() => {
    axios.get(urlProductos, {
      name: 'name',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(respuesta => {
      setProductos(respuesta.data)
    }).catch(error => {
      console.log(error);
    })
  }, []);

  const productosAlmuerzo = () => {
    const menuAlmuerzo = productos.filter(producto => producto.type === 'Almuerzo')
    return menuAlmuerzo;
  };

  const guardarNombreCliente = (e) => {
    setNombreCliente(e.target.value);
  };

  const agregarPedido = (pid) => {
    const producto = productosAlmuerzo().filter(dato => dato.id === pid)
    setProductosAgregados([...producto, ...productosAgregados])
  };

  const eliminarProducto = (pid) => {
    const pedidoActualizado = productosAgregados.filter(dato => dato.id !== pid)
    setProductosAgregados(pedidoActualizado);
    // let eleminado = falso;
    // for (let i=0; i<productosAgregados.length; i++){
    //   if 
    //   const pedidoActualizado = 
    // }
  };

  const totalPedido = () => {
    let total = 0;
    const precios = productosAgregados.map(precio => precio.price)
    for (let i = 0; i < precios.length; i++) {
      total = total + precios[i];
    }
    return total;
  }

  const crearPedido = (e) => {
    const pedidoCrear = {
      userId: localStorage.getItem('userId'),
      client: nombreCliente,
      products:
        productosAgregados.map(producto => {
          return {
            qty: 1,
            product: {
              ...producto
            }
          }
        }),
      status: "pending",
      dateEntry: "2022-03-05 15:14:10"
    };

    if (nombreCliente.trim()) {
      if (productosAgregados.length !== 0) {
        axios({
          method: 'POST',
          url: urlOrdenes,
          data: pedidoCrear,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then((respuesta) => {
          setMensajeExitoso('Pedido exitoso')
          document.getElementById('mensaje-exitoso').style.display = "block";
          setTimeout(() => {
            document.getElementById('mensaje-exitoso').style.display = "none";
          }, 3000);
          setProductosAgregados([]);
          setNombreCliente('');
        }).catch(error => {
          console.log(error);
        })
      } else {
        setMensajeError('Seleccione un producto')
        document.getElementById('mensaje-error').style.display = "block";
        setTimeout(() => {
          document.getElementById('mensaje-error').style.display = "none";
        }, 3000);
      }
    } else {
      setMensajeError('Ingrese el nombre del cliente');
      document.getElementById('mensaje-error').style.display = "block";
      setTimeout(() => {
        document.getElementById('mensaje-error').style.display = "none";
      }, 3000);

    };
  };

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
          <input
            id="inputNombre"
            type="text"
            placeholder='Nombre Cliente'
            value={nombreCliente}
            onChange={guardarNombreCliente}
            autoComplete='off'
          />
        </section>
        <div id="mensaje-error" className="mensaje error">{mensajeError}</div>
        <div id="mensaje-exitoso" className="mensaje exitoso">{mensajeExitoso}</div>
        <section className='productos-escogidos-contenedor'>
          <table>
            <tbody>
              {productosAgregados.map(item => (
                <tr key={contador++}>
                  <td ><span>{item.name}</span></td>
                  <td className='precio-tabla'>{item.price}</td>
                  <td className='eliminarProducto-icono' onClick={() => eliminarProducto(item.id)}><AiFillCloseCircle /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className='total-pedido'>
          <p className='precio-total'><b>TOTAL:&nbsp;&nbsp; $ {totalPedido()}</b></p>
        </section>
        <button
          className="boton bg-naranja t-l"
          onClick={crearPedido}>Enviar a cocina
        </button>

      </div>
    </div >
  );
}

export default MenuAlmuerzo;