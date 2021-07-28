import React from "react";
import update from 'immutability-helper';
import io from "socket.io-client";

let  socket= io('http://localhost:3000');
class JugadorAdivina extends React.Component{

    constructor() {
        super();
        this.state={
            jugador: '',
            pregunta: '',
            chat:[],
            chatGeneral:[],
            imgGanador:'src/assets/imagenes/boxy-kitten-confetti.gif',
            imgPerdedor:'src/assets/imagenes/tenor-unscreen.gif',
            imgMostrar:'',
            txt: '',
            userName:'',
        }
    }

    componentDidMount() {
        let username = window.localStorage.getItem('username')

        this.setState({
            userName: username,
        })

        socket.on('mensajeServer', (msjRecibido)=>{
            this.state.chat.push(msjRecibido);
            this.setState({
                chatGeneral:this.state.chat,
            })
        })

        socket.on('recibiendoEstatus', (estatus)=>{

            if(estatus.msT === 'Ganador'){
                this.setState({
                    imgMostrar: this.state.imgGanador,
                    txt: estatus.msj,
                })
            }else{
                this.setState({
                    imgMostrar: this.state.imgPerdedor,
                    txt: estatus.msj,
                })
            }

            let estatusJ = document.getElementsByClassName('estatusJugador');
            estatusJ[0].style.display = 'flex'
        })

    }

    changeField(e){
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
    }

    enviarMensaje(){

        let pregunta = this.state.userName + ': ' + this.state.pregunta;

        console.log('emit: ' + this.state.pregunta)
        socket.emit('mensaje', pregunta)

        this.setState({
            pregunta:''
        })
    }

    cerrarEstatusjug() {
        let estatusJ = document.getElementsByClassName('estatusJugador');
        estatusJ[0].style.display = 'none'
    }

    render() {
        return(
                    <div>
                        <header className="header">¿Adivina Quien?</header>
                        <div className='estatusJugador' onClick={this.cerrarEstatusjug.bind(this)}>
                            <div className='estatus'>
                                <img src={this.state.imgMostrar} width='200px' height='200px' alt='imagen'/>
                                <p>{this.state.txt}</p>
                            </div>
                        </div>
                        <div className="cuerpo">
                            <div className="columna1">
                                <h3 className="textoNombre">Nombre de jugador: {
                                    window.localStorage.getItem('username')
                                }</h3>
                                <div className="imagen-concep">
                                    <img src="src/assets/imagenes/pregunta.jpg" width={390} alt=""/>
                                </div>
                            </div>

                            <div className="columna2">
                                <br/>
                                <section>
                                    <section className="respueta-j2">
                                        <For each="item" index="idx" of={ this.state.chatGeneral}>
                                            { item }
                                            <br/>
                                        </For>
                                    </section>
                                </section>
                                <div>
                                    <br/>
                                    <h2 className='respuestaA'>Escriba su pregunta</h2>
                                    <input
                                           className='barrTex'
                                           type="text"
                                           id="text"
                                           name="pregunta"
                                           value={this.state.pregunta}
                                           onChange={this.changeField.bind(this)}
                                           placeholder="Escribir..."
                                    />
                                    <button className='btnEnP' onClick={this.enviarMensaje.bind(this)}>Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default JugadorAdivina;