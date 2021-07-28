import React from "react";
import update from 'immutability-helper';
import io, {Socket} from "socket.io-client";

let  socket= io('http://localhost:3000');

class JugadorPista extends React.Component{

    constructor() {
        super();
        this.state={
            pregunta: '',
            chat:[],
            chatGeneral:[],
            tipoCatSec: '',
            UserName:'',
            imagen:[
                {"tipo": "cine","ruta": "cine/Bibi.jpeg"},
                {"tipo": "cine","ruta": "cine/Megan.png"},
                {"tipo": "cine","ruta": "cine/Space.jpg"},
                {"tipo": "cine","ruta": "cine/TimonyPumba.jpg"},
                {"tipo": "deportes","ruta": "deportes/Argentina.jpg"},
                {"tipo": "deportes","ruta": "deportes/Champions.jpg"},
                {"tipo": "deportes","ruta": "deportes/Chivas.jpg"},
                {"tipo": "deportes","ruta": "deportes/Taekwondo.jpg"},
                {"tipo": "historia","ruta": "historia/AdaLovelace.jpg"},
                {"tipo": "historia","ruta": "historia/Aristoteles.jpg"},
                {"tipo": "historia","ruta": "historia/Migel.png"},
                {"tipo": "historia","ruta": "historia/Steve.jpg"},
                {"tipo": "arte","ruta": "arte/Beethoven.jpg"},
                {"tipo": "arte","ruta": "arte/Gris.jpg"},
                {"tipo": "arte","ruta": "arte/RomeoandJuliet.jpg"},
                {"tipo": "arte","ruta": "arte/Solo.jpg"},
            ],
            numRandom:0,
            userNameVista:'',
        }

    }


    componentDidMount() {

        var data = this.props.location.state;
        var {user, tipoCatSec} = data;
        console.log(user);
        console.log(tipoCatSec + ': tipo');

        console.log(tipoCatSec + 'switch')
        //1:3-0, 2:7-4, 3:11-8, 4:15-12
        switch (tipoCatSec){
            case '1': this.numeroRam(3,0);
                break;
            case '2': this.numeroRam(7,4);
                break;
            case '3': this.numeroRam(11,8);
                break;
            case '4': this.numeroRam(15,12);
                break;
        }
        this.iniciarConexion()
    }

    iniciarConexion(){

        let namePista = window.localStorage.getItem('username')

        this.setState({
            userNameVista: namePista
        })

        socket.on('mensajeServer', (msjRecibido)=>{
            this.state.chat.push(msjRecibido);
            this.setState({
                chatGeneral:this.state.chat,
            })
        })

    }

    numeroRam(fin,inicio){
        console.log(Math.floor(Math.random() * (fin - inicio)) + inicio)
        this.setState({
            numRandom :  Math.floor(Math.random() * (fin - inicio)) + inicio,
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

        let pregunta = this.state.userNameVista + ': ' + this.state.pregunta;

        console.log(this.state.pregunta)
        console.log('emit: ' + this.state.userNameVista)
        socket.emit('mensaje', pregunta)

        this.setState({
            pregunta:''
        })

    }

    estatusJugador(mensaje){
        let mensajeJ
        let tipoMensaje
        if(mensaje === 1){
            mensajeJ = 'FELICIDADES, GANASTE EL JUEGO'
            tipoMensaje = 'Ganador'
        }else{
            mensajeJ = 'LO SIENTO, PERDISTE EL JUEGO'
            tipoMensaje = 'Perdedor'
        }

        let estatusJugador = {
            msj: mensajeJ,
            msT: tipoMensaje,
        }
        socket.emit('enviandoEstatus',estatusJugador);
    }

    render() {
        return(
            <div>
                <header className="textoNombreP">Nombre de jugador: {window.localStorage.getItem('username')}</header>
                <div className="cuerpo">
                    <div className="columna1">
                        <h1 className='imgA'>Imagen Aleatoria</h1>
                        <div className="imagen-concep">
                            <img src={"src/assets/imagenes/"+this.state.imagen[this.state.numRandom].ruta} width={270} alt=""/>
                        </div>
                    </div>
                    <div className="columna2">
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
                            <h2 className='respuestaA'>Escriba su respuesta</h2>
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
                        <br/>
                        <h3 className='finalResul'>Seleccione el resultado final</h3>
                        <button className='btnResul' onClick={()=>this.estatusJugador(1)}>Ganador</button>
                        <button className='btnResul' onClick={()=>this.estatusJugador(2)}>Perdedor</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default JugadorPista;