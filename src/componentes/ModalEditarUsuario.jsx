import React, { useState } from "react";
import axios from "axios";
import { SlClose } from 'react-icons/sl'
import '../hojas-de-estilo/ModalEditarProductoAdmin.css'


function ModalEditarUsuario({ isOpen, closeModal, dataModal, setDataModal, actualizarLista, setActualizarLista }) {

  const url = 'http://localhost:8080/users'
  const [mensajeExitoso, setMensajeExitoso] = useState('');

  const detenerClick = (e) => {
    e.stopPropagation();
  };


  const editarUsuario = (e) => {
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
      setMensajeExitoso(`Usuario ${respuesta.data.email} fue editado exitosamente`)
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
      [target.name]: target.value
    })
  };


  return (
    <div className={`modalProductosAdmin-contenedor ${isOpen && 'modal-open'}`} onClick={closeModal}>
      <div className='agregarProductos' onClick={detenerClick}>
        <div id="mensajeEditar-exitoso" className="mensajeEditar exitoso">{mensajeExitoso}</div>
        <SlClose className="iconoCerrar" onClick={closeModal} />
        <h3>EDITAR USUARIO</h3>
        <form onSubmit={editarUsuario}>
          <input type="text" placeholder="CORREO" value={dataModal.email} name="email" onChange={manejoData} required />
          <input type="number" placeholder="CONTRASEÑA" value={dataModal.password} name="password" onChange={manejoData} required />

          <select name="role" onChange={manejoData} required>
            <option value={dataModal.role}>{dataModal.role}</option>
            <option value="admin">admin</option>
            <option value="mesero">mesero</option>
            <option value="cocinero">cocinero</option>
          </select>

          <button className="boton bg-naranja t-xs">
            GUARDAR
          </button>
        </form>
      </div>

    </div>

  )
};

export default ModalEditarUsuario;