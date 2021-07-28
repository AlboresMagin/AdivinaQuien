import React from "react";
import update from "immutability-helper";

var path='';
var data='';

class Categorias extends React.Component{

    constructor() {
        super();
        this.state={
            UserName: '',
            idSock: '',
        }
    }
    componentDidMount() {
        var data = this.props.location.state;
        var {user} = data;
        console.log(user);
        this.setState({
            UserName: user
        })

    }

    changeField(e){
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
    }

    catSelUno(){
        data = {user: this.state.username, tipoCatSec: '1'}
        path = {
            pathname:'/Pista',
            state:data,
        }
        this.props.history.push(path)
    }

    catSelDos(){
        data = {user: this.state.username, tipoCatSec: '2'}
        path = {
            pathname:'/Pista',
            state:data,
        }
        this.props.history.push(path)
    }

    catSelTres(){
        data = {user: this.state.username, tipoCatSec: '3'}
        path = {
            pathname:'/Pista',
            state:data,
        }
        this.props.history.push(path)
    }

    catSelCuatro(){
        data = {user: this.state.username, tipoCatSec: '4'}
        path = {
            pathname:'/Pista',
            state:data,
        }
        this.props.history.push(path)
    }

    render() {

        return(
            <div>
                <h1 className="textoNombre">Nombre de jugador: {this.state.UserName}</h1>
                <div>
                    <h2 className="textoSelectCate">Selecciona una categoria</h2>
                </div>
                <br/>
                <div className="cuerpo">
                    <div className="columna1Cat">
                        <div className="imagen-concep">
                            <img src="src/assets/imagenes/3.png" width={240 } alt=""/>
                        </div>
                        <h3 className='catName'>Cine</h3>
                        <button className='btnConfCat' onClick={this.catSelUno.bind(this)}>Comenzar</button>
                    </div>
                    <div className="columna2Cat">
                        <div className="imagen-concep">
                            <img src="src/assets/imagenes/8.png" width={240 } alt=""/>
                        </div>
                        <br/>
                        <h3 className='catName'>Deportes</h3>
                        <button className='btnConfCat' onClick={this.catSelDos.bind(this)}>Comenzar</button>
                    </div>
                    <div className="columna3Cat">
                        <div className="imagen-concep">
                            <img src="src/assets/imagenes/19.png" width={240 } alt=""/>
                        </div>
                        <h3 className='catName'>Historia</h3>
                        <button className='btnConfCat' onClick={this.catSelTres.bind(this)}>Comenzar</button>
                    </div>
                    <div className="columna4Cat">
                        <div className="imagen-concep">
                            <img src="src/assets/imagenes/9.png" width={240 } alt=""/>
                        </div>
                        <h3 className='catName'>Arte</h3>
                        <button className='btnConfCat' onClick={this.catSelCuatro.bind(this)}>Comenzar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categorias;