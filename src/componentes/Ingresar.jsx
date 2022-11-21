import React, { Component, useState } from "react";
import '../hojas-de-estilo/Ingresar.css'
import bugerQueenLogo from '../imagenes/burger-LogoBlanco.png'
import axios from "axios";
import { useNavigate } from "react-router";
import { opciones } from "../Rutas/rutas";


const url = 'http://localhost:8080/login'

function Ingresar() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [token, setToken] = useState('')

  const manejoCorreo = e => {
    setEmail(e.target.value)
  }

  const manejoContraseña = e => {
    setPassword(e.target.value)
  }

  const iniciarSesion = async () => {
    await axios.post(url, {
      email: email,
      password: password,
      headers: {
        'content-type': 'application/json',
        "Access-Control-Request-Method": "POST",
        // authorization: 'Bearer' + this.state.
      }
    })
      .then(respuesta => {
        navigate(opciones)
        localStorage.setItem('token', respuesta.data.accessToken )
        localStorage.setItem('userId', respuesta.data.user.id )
        // setToken(respuesta.data.accessToken)
        console.log(respuesta.data)
      }).catch(error => {
        console.log(error);
      })
  };

  const manejadorSubmit = (e) => {
    e.preventDefault();
  }

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
          <form className='bloque-ingresar' onSubmit={manejadorSubmit}>
            <h3>INGRESAR</h3>
            <input
              id="correo"
              type="text"
              placeholder='Correo Electronico'
              onChange={manejoCorreo}
            />
            <input
              id="contraseña"
              type="password"
              placeholder='Contraseña'
              onChange={manejoContraseña}
            />
            <button className="boton bg-rojo t-s" onClick={() => iniciarSesion()}>ENTRAR</button>
          </form>
        </div>
      </div>
    </div>
  )
}


// class Ingresar extends Component {
//   state = {
//     form: {
//       email: '',
//       password: ''
//     }
//   }

//   handleChange = async e => {
//     await this.setState({
//       form: {
//         ...this.state.form,
//         [e.target.name]: e.target.value
//       }
//     })
//   }

//   iniciarSesion = async () => {
//     await axios.post(url, {
//       // params: {
//         email: this.state.form.email,
//         password: this.state.form.password,
//         headers: {
//           'content-type': 'application/json',
//           // "Access-Control-Request-Method": "POST",
//           // authorization: 'Bearer' + this.state.
//         }
//       // }
//     })
//       .then(respuesta => {
//         console.log(respuesta.data)
//       }).catch(error => {
//         console.log(error);
//       })
//   };

//   manejadorSubmit = (e) => {
//     e.preventDefault();
//   }

//   render() {
//     return (
//       <div className='ingresar-contenedor'>
//         <div className='capa-negra'>
//           <figure className='burger-queen-logo-contenedor'>
//             <img
//               src={bugerQueenLogo}
//               className='burger-queen-logo'
//               alt='Logo Burger Queen'
//             />
//           </figure>
//           <div className='bloque-ingresar-contenedor'>
//             <form className='bloque-ingresar' onSubmit={this.manejadorSubmit}>
//               <h3>INGRESAR</h3>
//               <input
//                 name='email'
//                 id="correo"
//                 type="text"
//                 placeholder='Correo Electronico'
//                 onChange={this.handleChange}
//               />
//               <input
//                 name='password'
//                 id="contraseña"
//                 type="password"
//                 placeholder='Contraseña'
//                 onChange={this.handleChange}
//               />
//               <button id='boton-ingresar' onClick={()=> this.iniciarSesion()}>ENTRAR</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }


export default Ingresar;