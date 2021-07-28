import React from "react";

class JugadorSeleccionado extends React.Component{

    constructor() {
        super();

    }

    seleccionJugador(){
        alert(this.props.username + this.props.tipoJugador);
        this.ruturnValor()
    }

    ruturnValor(){

        let tipoJugador = window.localStorage.setItem('tipoJugador', this.props.tipoJugador);
        let userName = window.localStorage.setItem('userName', this.props.username);

        if (this.props.tipoJugador === 1){
           this.props.onResponse(1)
        }else {
            this.props.onResponse(2)
        }
    }


    render() {
        return(
            <div>
                <div>
                    <li onClick={this.seleccionJugador.bind(this)}>
                        {
                            this.props.username
                        }
                    </li>
                </div>
            </div>
        )
    }

}

export default JugadorSeleccionado;