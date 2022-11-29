import '../hojas-de-estilo/AdminUsuarios.css'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { useEffect, useState } from 'react';
import axios from 'axios';
import useModal from '../hooks/useModal';
import ModalNuevoUsuario from './ModalNuevoUsuario';
import ModalEditarUsuario from './ModalEditarUsuario';
import { useNavigate } from 'react-router';
import { opcionesAdmin } from '../Rutas/rutas';


function AdminUsuarios() {

  const url = 'http://localhost:8080/users';
  const navigate = useNavigate();


  const [usuarios, setUsuarios] = useState([]);
  const [isOpenModalNuevo, openModalNuevo, closeModalNuevo] = useModal();
  const [isOpenModalEditar, openModalEditar, closeModalEditar] = useModal();
  const [dataModal, setDataModal] = useState({});
  const [actualizarLista, setActualizarLista] = useState(false);



  useEffect(() => {
    axios.get(url, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(respuesta => {
      setUsuarios(respuesta.data)
    }).catch(error => {
      console.log(error);
    })
  }, [actualizarLista]);

  const eliminarUsuario = (id, email) => {

    const confirmar = window.confirm(`¿Estas seguro que desea eliminar el usuario ${email}?`);
    if (confirmar) {
      axios.delete(`${url}/${id}`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        setActualizarLista(!actualizarLista);
      }).catch(error => {
        console.log(error);
      })
    };
  };

  const editarUsuario = (usuarioActual) => {
    openModalEditar();
    setDataModal(usuarioActual)
  };


  return (
    <div className='adminUsuarios-contenedor'>
      <section>
        <ModalNuevoUsuario
          isOpen={isOpenModalNuevo}
          closeModal={closeModalNuevo}
          setActualizarLista={setActualizarLista}
          actualizarLista={actualizarLista}
        />
      </section>

      <section>
        <ModalEditarUsuario
          isOpen={isOpenModalEditar}
          closeModal={closeModalEditar}
          dataModal={dataModal}
          setDataModal={setDataModal}
          setActualizarLista={setActualizarLista}
          actualizarLista={actualizarLista}

        />
      </section>

      <section className='titulo usuarios'>
        <img
          src={require('../imagenes/burger-LogoBlanco.png')}
          alt="Logo Burger Queen"
        />
        <h3>USUARIOS</h3>
      </section>

      <section className='usuariosAdmin-contenedor'>
        <ul className='lista-usuarios'>
          {usuarios.map(usuario => {
            return (
              <li key={usuario.id} className='item-lista-usuarios'>{usuario.email}
                <FaRegEdit className='editar-producto' onClick={() => editarUsuario(usuario)} />
                <RiDeleteBin2Line className='eliminar-producto' onClick={() => eliminarUsuario(usuario.id, usuario.email)} />
              </li>
            )
          })}
        </ul>
      </section>
      <section className='botones-admin'>
        <button className='boton bg-naranja t-l' onClick={() => navigate(opcionesAdmin)}>Volver Al Menu</button>
        <button className='boton bg-naranja t-l' onClick={openModalNuevo}>Agregar Usuario</button>
      </section>


    </div>
  );
}

export default AdminUsuarios;
