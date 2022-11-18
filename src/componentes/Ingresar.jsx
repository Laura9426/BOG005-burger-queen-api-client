import React, { Component } from "react";
import '../hojas-de-estilo/Ingresar.css'
import bugerQueenLogo from '../imagenes/burger-LogoBlanco.png'
import axios from "axios";

const url = 'http://localhost:8080/users'

class Ingresar extends Component {
  state = {
    form: {
      email: '',
      password: ''
    }
  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    // console.log(this.state.form)
  }

  iniciarSesion = async () => {
    console.log('hola')
    await axios.get(url, {
      params: {
        email: this.state.form.email,
        password: this.state.form.password,
        headers: {
          'content-type': 'application/json',
          // authorization: 'Bearer' + this.state.
        }
      }
    })
      .then(respuesta => {
        console.log(respuesta.data)
      }).catch(error => {
        console.log(error);
      })
  };

  manejadorSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className='ingresar-contenedor'>
        <div className='capa-negra'>
          <figure className='burger-queen-logo-contenedor'>
            <img
              src={bugerQueenLogo}
              className='burger-queen-logo'
              alt='Logo Burger Queen'
            />
          </figure>
          <div className='bloque-ingresar-contenedor'>
            <form className='bloque-ingresar' onSubmit={this.manejadorSubmit}>
              <h3>INGRESAR</h3>
              <input
                name='email'
                id="correo"
                type="text"
                placeholder='Correo Electronico'
                onChange={this.handleChange}
              />
              <input
                name='password'
                id="contraseña"
                type="password"
                placeholder='Contraseña'
                onChange={this.handleChange}
              />
              <button id='boton-ingresar' onClick={()=> this.iniciarSesion().then((data)=>{console.log(data)}).catch((error)=>{console.log(error.message)})}>ENTRAR</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default Ingresar;