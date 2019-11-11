import React from 'react';
import Login from './login/login.jsx';
import './main.css';
import { Button } from 'reactstrap';
import Barra from './barra/barra.jsx';
import Tabla from './tabla/tabla.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Carro from './carro/carro.jsx';


class App extends React.Component{
    constructor(){
      super()
      this.state= {
        carrito: "",
        aux: 0
      }
    }

    render(){
      return(
        <Router>
          <div id="opac">
            <div id="barras" hidden>
              <Barra numero={this.state.carrito} />
            </div>
            <div id="espacio"></div>
            <Login id="login"/>
            <div id="cuerpo" onClick={this.upadate.bind(this)} hidden>
            <Switch>
                <Route exact path="/" component={Tabla}/>
                <Route path="/carrito" component={Carro}/>
            </Switch>
            </div>
            <div id="bottom"></div>
          </div>
        </Router>
      );
    }

  upadate(){
    var tx=document.createTextNode("");
    if(window.sessionStorage.length>0){
      var n = window.sessionStorage.length/2;
      if(n > this.state.aux){
        this.state.aux= n;
        for(var i=0; i<n; i++){
        var x = i+1;
        }
        document.getElementById('carrito').innerHTML="";
        var img = document.createElement('img');
        img.src="https://res.cloudinary.com/indev/image/upload/v1571765643/frutas/shopping-cart_p0urdo.png";
        img.style.width="45%";
        tx.nodeValue=x.toString();
        document.getElementById('carrito').appendChild(img);
        document.getElementById('carrito').appendChild(tx);
        x = 0;
      }
    }else {
      this.state.aux = 0;
    }
  } 

    componentDidMount(){
      if(window.localStorage.getItem('token')){
        document.getElementById('opac').style.background="url(https://res.cloudinary.com/indev/image/upload/v1571705668/frutas/main-fondo_bngg2n.jpg)";
        document.getElementById('login').setAttribute('hidden', '');
        document.getElementById('barras').removeAttribute("hidden");
        document.getElementById('cuerpo').removeAttribute("hidden");
      }
    }
}

export default App;
