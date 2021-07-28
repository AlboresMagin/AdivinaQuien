import React from "react";
import JugadorSeleccionado from "../component/jugadorSeleccionado";

let  socket='';
class Principal extends React.Component{

    constructor() {

        super();
        this.state = {
            arregloUsuario: [],
            username: '',
            tipoJugador: 0,
        }

    }

    guardarUser(){
        let name = document.getElementById('username').value
        this.setState({
            username: name
        })
    }

    tipoJugadorUno(){
        this.setState({
            tipoJugador: 1,
        })
    }

    tipoJugadorDos(){
        this.setState({
            tipoJugador: 2,
        })
    }

    iniciar(){
        var path='';
        var data = {user: this.state.username}
        window.localStorage.setItem('username',this.state.username )
        if(this.state.tipoJugador === 1){
            path = {
                pathname:'/Categorias',
                state:data,
            }
            this.props.history.push(path)
        }
        else{
            path = {
                pathname:'/Adivina',
                state:data,
            }
            this.props.history.push(path)
        }
    }

    render() {
        return(
                <div className='divPrincipal'>
                    <div className='prueba'>
                        <h1 className='tituloPrin'>¿Adivina Quien?</h1>
                        <h2 className='titSub'>Ingrese su nombre</h2>
                        <input id='username' className='label' placeholder='Escribir..'/>
                        <button className='btnConf' onClick={this.guardarUser.bind(this)}>Guardar nombre</button>
                    </div>
                    <div className= 'divUsuarios'>
                        <h2 className='titSub'>Seleccione el roll que desea jugar</h2>
                        <button className='btnConf2' onClick={this.tipoJugadorUno.bind(this)}>Jugador 1</button>
                        <button className='btnConf2' onClick={this.tipoJugadorDos.bind(this)}>Jugador 2</button>
                        <ul>
                            {
                                this.state.arregloUsuario.map(item =>{
                                    return (
                                            <JugadorSeleccionado username={item.username} tipoJugador={this.state.tipoJugador} onResponse={this.valorRespuesta.bind(this)}></JugadorSeleccionado>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='btnIniciar'>
                        <h3 className='titFin'>¡Aca comienza la aventura!</h3>
                        <button className='btnConf' onClick={this.iniciar.bind(this)}>Iniciar Juego</button>
                    </div>
                </div>
        )
    }
}

export default Principal;