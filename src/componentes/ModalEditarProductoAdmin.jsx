import React, { useState } from "react";
import axios from "axios";
import { SlClose } from 'react-icons/sl'
import '../hojas-de-estilo/ModalEditarProductoAdmin.css'

const url = 'http://localhost:8080/products';

function ModalEditarProductoAdmin({ isOpen, closeModal, dataModal, setDataModal, actualizarLista, setActualizarLista }) {

  const [mensajeExitoso, setMensajeExitoso] = useState('');

  const detenerClick = (e) => {
    e.stopPropagation();
  };


  const editarProducto = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `${url}/${dataModal.id}`,
      data: dataModal,
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
      setActualizarLista(!actualizarLista);
    }).catch(error => {
      console.log(error);
    })
  };

  const manejoData = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    })
  };


  return (
    <div className={`modalProductosAdmin-contenedor ${isOpen && 'modal-open'}`} onClick={closeModal}>
      <div className='agregarProductos' onClick={detenerClick}>
        <div id="mensajeEditar-exitoso" className="mensajeEditar exitoso">{mensajeExitoso}</div>
        <SlClose className="iconoCerrar" onClick={closeModal} />
        <h3>EDITAR PRODUCTO</h3>
        <form onSubmit={editarProducto}>
          <input type="text" placeholder="NOMBRE" value={dataModal.name} name="name" onChange={manejoData} required />
          <input type="number" placeholder="PRECIO" value={dataModal.price} name="price" onChange={manejoData} required />

          <select name="type" onChange={manejoData} required>
            <option value={dataModal.type}>{dataModal.type}</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
          </select>

          <input type="datetime-local" placeholder="FECHA" value={dataModal.dateEntry} name="dateEntry" onChange={manejoData} required />

          <button className="boton bg-naranja t-xs">
            GUARDAR
          </button>
        </form>
      </div>

    </div>

  )
};

export default ModalEditarProductoAdmin;