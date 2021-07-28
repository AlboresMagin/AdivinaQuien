import React from 'react'
import JugadorAdivina from "./jugadorAdivina";
import JugadorPista from "./JugadorPista";
import Principal from "./principal";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Categorias from "./categorias";  //npm install --save react-router-dom

class App extends React.Component {
    render(){
        return(
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Principal}/>
                        <Route exact path='/Adivina' component={JugadorAdivina}/>
                        <Route exact path='/Pista' component={JugadorPista}/>
                        <Route exact path='/Categorias' component={Categorias}/>
                    </Switch>
                </BrowserRouter>
        )
    }
}

export default App;