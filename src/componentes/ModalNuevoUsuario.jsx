import React, { useState } from "react";
import { SlClose } from 'react-icons/sl'
import axios from "axios";

const url = 'http://localhost:8080/users';

function ModalNuevoUsuario({ isOpen, closeModal, setActualizarLista, actualizarLista }) {

  const [mensajeExitoso, setMensajeExitoso] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState(
    {
      email: "",
      password: "",
      role: ""
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
      data: nuevoUsuario,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((respuesta) => {
      setMensajeExitoso(`Usuario ${respuesta.data.user.email} fue guardado exitosamente`)
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
    setNuevoUsuario({
      ...nuevoUsuario,
      [target.name]: target.value,
    })
  };

  const limpiarInput = () => {
    setNuevoUsuario({
      email: "",
      password: "",
      role: ""
    })
  };

  return (
    <div className={`modalProductosAdmin-contenedor ${isOpen && 'modal-open'}`} onClick={closeModal}>
      <div className='agregarProductos' onClick={detenerClick}>
        <SlClose className="iconoCerrar" onClick={closeModal} />
        <h3>NUEVO PRODUCTO</h3>
        <div id="mensaje-exitoso" className="mensaje exitoso">{mensajeExitoso}</div>
        <form onSubmit={manejadorSubmit}>
          <input type="text" placeholder="CORREO" value={nuevoUsuario.email} name="email" onChange={manejoData} required />
          <input type="text" placeholder="CONTRASEÑA" value={nuevoUsuario.password} name="password" onChange={manejoData} required />
          <select name="role" onChange={manejoData} required>
            <option value="">Seleccione una opción</option>
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

export default ModalNuevoUsuario;