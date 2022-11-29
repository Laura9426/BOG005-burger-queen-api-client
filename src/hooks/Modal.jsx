import { SlClose } from 'react-icons/sl'

function Modal(props) {


  return (
    <div className={`modalProductosAdmin-contenedor ${props.isOpen && 'modal-open'}`} onClick={props.closeModal}>
      <div className='agregarProductos' onClick={props.detenerClick}>
        <SlClose className="iconoCerrar" onClick={props.closeModal} />
        <h3>{props.titulo}</h3>
        <div id="mensaje-exitoso" className="mensaje exitoso">{props.mensajeExitoso}</div>
        <form onSubmit={props.nuevaData}>
          <input type="text" placeholder="NOMBRE" value={props.productoName} name="name" onChange={props.manejoData} required />
          <input type="number" placeholder="PRECIO" value={props.productoPrice} name="price" onChange={props.manejoData} required />
          <select name="type" onChange={props.manejoData} required>
            <option value="">Seleccione una opción</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
          </select>
          <input type="datetime-local" placeholder="FECHA" value={props.productoDateEntry} name="dateEntry" onChange={props.manejoData} required />

          <button className="boton bg-naranja t-xs">
            GUARDAR
          </button>
        </form>
      </div>

    </div>
  )
}

export default Modal;