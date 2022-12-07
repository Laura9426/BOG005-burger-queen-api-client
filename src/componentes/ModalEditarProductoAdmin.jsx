import React, { useState } from "react";
import axios from "axios";
import { SlClose } from 'react-icons/sl'
import '../hojas-de-estilo/ModalEditarProductoAdmin.css'

const url = 'http://localhost:8080/products';

function ModalEditarProductoAdmin({ isOpen, closeModal, dataModal }) {

  const [mensajeExitoso, setMensajeExitoso] = useState('');
  const [productoEditar, setProductoEditar] = useState(dataModal);

  console.log('producto', productoEditar)
  console.log('modal', dataModal)
  
  const detenerClick = (e) => {
    e.stopPropagation();
  };

  const editarProducto = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `${url}/${productoEditar.id}`,
      data: productoEditar,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((respuesta) => {
      setMensajeExitoso(`Producto ${respuesta.data.name} fue editado exitosamente`)
      document.getElementById('mensajeEditar-exitoso').style.display = "block";
      setTimeout(() => {
        document.getElementById('mensajeEditar-exitoso').style.display = "none";
        closeModal();
      }, 3000);
    }).catch(error => {
      console.log(error);
    })
  };

  const manejoData = ({ target }) => {
    setProductoEditar({
      ...productoEditar,
      [target.name]: target.value
    })
  };


  return (
    <div className={`modalProductosAdmin-contenedor ${isOpen && 'modal-open'}`} onClick={closeModal}>
      <div className='agregarProductos' onClick={detenerClick}>
        <div id="mensajeEditar-exitoso" className="mensajeEditar exitoso">{mensajeExitoso}</div>
        <SlClose className="iconoCerrar" onClick={closeModal} />
        <h3>EDITAR PRODUCTO</h3>
        <form onSubmit={editarProducto}>
          <input type="text" placeholder="NOMBRE" value={productoEditar.name} name="name" onChange={manejoData} required />
          <input type="number" placeholder="PRECIO" value={productoEditar.price} name="price" onChange={manejoData} required />

          <select name="type" onChange={manejoData} required>
            <option value={productoEditar.type}>{productoEditar.type}</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
          </select>

          <input type="datetime-local" placeholder="FECHA" value={productoEditar.dateEntry} name="dateEntry" onChange={manejoData} required />

          <button className="boton bg-naranja t-xs">
            GUARDAR
          </button>
        </form>
      </div>

    </div>

  )
};

export default ModalEditarProductoAdmin;