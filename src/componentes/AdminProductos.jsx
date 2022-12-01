import '../hojas-de-estilo/AdminProductos.css'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { opcionesAdmin } from '../Rutas/rutas';
import ModalNuevoProductoAdmin from './ModalNuevoProductoAdmin';
import useModal from '../hooks/useModal';
import ModalEditarProductoAdmin from './ModalEditarProductoAdmin';

function AdminProductos() {
  const url = 'http://localhost:8080/products';
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
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
      setProductos(respuesta.data)
    }).catch(error => {
      console.log(error);
    })
  }, [actualizarLista]);

  const closeModal = () => {
    closeModalEditar()
    setActualizarLista(!actualizarLista)
    setDataModal(null)
  };

  const productosAlmuerzo = () => {
    const menuAlmuerzo = productos.filter(producto => producto.type === 'Almuerzo')
    return menuAlmuerzo;
  };

  const productosDesayuno = () => {
    const menuDesayuno = productos.filter(producto => producto.type === 'Desayuno')
    return menuDesayuno;
  };

  const eliminarProducto = (id, name) => {

    const confirmar = window.confirm(`¿Estas seguro que desea eliminar el producto ${name}?`);
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

  const editarProducto = (productoActual) => {
    openModalEditar();
    setDataModal(productoActual)
  };

  return (
    <div className='adminProductos-contenedor'>

      <section>
        <ModalNuevoProductoAdmin
          isOpen={isOpenModalNuevo}
          closeModal={closeModalNuevo}
          setActualizarLista={setActualizarLista}
          actualizarLista={actualizarLista}
        />
      </section>
      <section>
        <ModalEditarProductoAdmin
          isOpen={isOpenModalEditar}
          closeModal={closeModal}
          dataModal={dataModal}
        />
      </section>

      <section className='titulo'>
        <img
          src={require('../imagenes/burger-LogoNegro.png')}
          alt="Logo Burger Queen"
        />
        <h3>PRODUCTOS</h3>
      </section>
      <section className='productosAdmin-contenedor'>
        <article className='productos-desayunoAlmuerzo'>
          <h3>DESAYUNO</h3>
          <ul className='lista-productos'>
            {productosDesayuno().map(producto => {
              return (
                <li key={producto.id} className='item-lista'>{producto.name}
                  <FaRegEdit className='editar-producto' onClick={() => editarProducto(producto)} />
                  <RiDeleteBin2Line className='eliminar-producto' onClick={() => eliminarProducto(producto.id, producto.name)} />
                </li>
              )
            })}
          </ul>
        </article>
        <article className='productos-desayunoAlmuerzo'>
          <h3>ALMUERZO - CENA</h3>
          <ul className='lista-productos'>
            {productosAlmuerzo().map(producto => {
              return (
                <li key={producto.id} className='item-lista'>{producto.name}
                  <FaRegEdit className='editar-producto' onClick={() => editarProducto(producto)} />
                  <RiDeleteBin2Line className='eliminar-producto' onClick={() => eliminarProducto(producto.id, producto.name)} />
                </li>
              )
            })}
          </ul>
        </article>
      </section>
      <section className='botones-admin'>
        <button className='boton bg-negro t-l' onClick={() => navigate(opcionesAdmin)}>Volver Al Menu</button>
        <button className='boton bg-negro t-l' onClick={openModalNuevo}>Agregar Producto</button>
      </section>

    </div>
  );
}

export default AdminProductos;
