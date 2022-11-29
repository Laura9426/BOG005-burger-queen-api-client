import React, { useState } from "react";
import '../hojas-de-estilo/ModalNuevoProductoAdmin.css'
import { SlClose } from 'react-icons/sl'
import axios from "axios";

const url = 'http://localhost:8080/products';

function ModalNuevoProductoAdmin({ isOpen, closeModal, setActualizarLista, actualizarLista }) {

  const [mensajeExitoso, setMensajeExitoso] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState(
    {
      name: "",
      price: "",
      image: "",
      type: "",
      dateEntry: ""
    }
  );

  const detenerClick = (e) => {
    e.stopPropagation();
  };


  const manejadorSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: url,
      data: nuevoProducto,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((respuesta) => {
      setMensajeExitoso(`Producto ${respuesta.data.name} fue guardado exitosamente`)
      document.getElementById('mensaje-exitoso').style.display = "block";
      setTimeout(() => {
        document.getElementById('mensaje-exitoso').style.display = "none";
        closeModal();
      }, 3000);
      limpiarInput();
      setActualizarLista(!actualizarLista);
    }).catch(error => {
      console.log(error);
    })
  };

  const manejoData = ({ target }) => {
    setNuevoProducto({
      ...nuevoProducto,
      [target.name]: target.value,
    })
  };

  const limpiarInput = () => {
    setNuevoProducto({
      id: "",
      name: "",
      price: "",
      image: "",
      type: "",
      dateEntry: ""
    })
  };

  return (
    <div className={`modalProductosAdmin-contenedor ${isOpen && 'modal-open'}`} onClick={closeModal}>
      <div className='agregarProductos' onClick={detenerClick}>
        <SlClose className="iconoCerrar" onClick={closeModal} />
        <h3>NUEVO PRODUCTO</h3>
        <div id="mensaje-exitoso" className="mensaje exitoso">{mensajeExitoso}</div>
        <form onSubmit={manejadorSubmit}>
          <input type="text" placeholder="NOMBRE" value={nuevoProducto.name} name="name" onChange={manejoData} required />
          <input type="number" placeholder="PRECIO" value={ nuevoProducto.price} name="price" onChange={manejoData} required />
          <select name="type" onChange={manejoData} required>
            <option value="">Seleccione una opción</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
          </select>
          <input type="datetime-local" placeholder="FECHA" value={nuevoProducto.dateEntry} name="dateEntry" onChange={manejoData} required />

          <button className="boton bg-naranja t-xs">
            GUARDAR
          </button>
        </form>
      </div>

    </div>
  )
};

export default ModalNuevoProductoAdmin;