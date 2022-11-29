import React, { useEffect, useState } from "react";
import '../hojas-de-estilo/MenuAlmuerzo.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from "axios";
import { menuDesayuno, opcionesMenu } from "../Rutas/rutas";
import { useNavigate } from "react-router";

const urlProductos = 'http://localhost:8080/products';
const urlOrdenes = 'http://localhost:8080/orders';

function MenuAlmuerzo() {
  
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExitoso, setMensajeExitoso] = useState('');

  useEffect(() => {
    axios.get(urlProductos, {
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

  const eliminarProducto = (index) => {
    const pedidoActualizado = [...productosAgregados.slice(0, index), ...productosAgregados.slice(index + 1)]
    setProductosAgregados(pedidoActualizado);
  };

  const totalPedido = () => {
    let total = 0;
    const precios = productosAgregados.map(precio => precio.price)
    for (let i = 0; i < precios.length; i++) {
      total = total + Number.parseInt(precios[i]);
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
        }).then(() => {
          setMensajeExitoso('Pedido exitoso')
          document.getElementById('mensaje-exitoso').style.display = "block";
          setTimeout(() => {
            document.getElementById('mensaje-exitoso').style.display = "none";
          }, 3000);
          limpiarPedido();
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

  const limpiarPedido = () => {
    setProductosAgregados([]);
    setNombreCliente('');
  };

  return (
    <div className='menuAlmuerzo-contenedor'>
      <div className='escogerPedido-contenedor'>
        <section className='barra-menu-opciones'>
          <h3 className='titulo-desayuno' onClick={() => navigate(menuDesayuno)}>DESAYUNO</h3>
          <h3 className='titulo-almuerzo'>ALMUERZO - CENA</h3>
        </section>
        <section className='productos-contenedor'>
          {productosAlmuerzo().map((producto, index) => (
            <div key={index} id={producto.id} className='producto'
              onClick={() => agregarPedido(producto.id)}
            ><p>{producto.name}</p></div>
          ))}
        </section>
        <section className='botones-productos'>
          <button
            className='boton bg-naranja t-l'
            onClick={() => navigate(opcionesMenu)} >Volver al menu
          </button>
          <button
            className='boton bg-naranja t-l'
            onClick={() => limpiarPedido()}>Limpiar Pedido</button>
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
              {productosAgregados.map((item, index) => (
                <tr key={index}>
                  <td ><span>{item.name}</span></td>
                  <td className='precio-tabla'>{item.price}</td>
                  <td className='eliminarProducto-icono' onClick={() => eliminarProducto(index)}><AiFillCloseCircle /></td>
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