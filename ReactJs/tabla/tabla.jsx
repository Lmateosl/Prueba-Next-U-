import React from 'react';
import './tabla.css';
import { Container, Row, Col, Button } from 'reactstrap';
import * as request from 'superagent';

class Tabla extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            carrito: 1
        }
        request
        .get('https://prueba-next-u-react.firebaseio.com/frutas.json')
        .set('Content-Type','aplication/json') 
        .then((res => {
            this.setState({data: res.body});
          }));
    }

    render(){
        return(
            <div id="cuerposos">
                <div id="head">
                    <div id="head1">
                        <h4>Catálogo de Productos</h4>
                    </div>
                    <div id="relleno"></div>
                    <div id="head2">
                        <img src="https://res.cloudinary.com/indev/image/upload/v1569531228/Assets/search_yo5xfx.png" width="10%"/>
                        <input name="buscar" id="buscar" type="serch" placeholder="Buscar Producto" onKeyUpCapture={this.buscar.bind(this)}/>
                    </div>
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document" id="modalContorno">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                <div className="modal-body">
                                    <div id="modalInfo">
                                        <Row>
                                            <Col xs="6" id="imgModal">
                                            </Col>
                                            <Col xs="6" id="datosModal">
                                                <h1>Vales Vergaaaaaaaaa</h1>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container id="tableas">
                    <Row id="dibujar">
                       {this.state.data.map((fruta, key)=>
                                <Col xs="3" key={key} className="objeto">
                                    <div className="border">
                                        <img src={fruta.img} width="100%" className="frutaImg"/><br/>
                                        <p>{fruta.nombre.toUpperCase()}</p>
                                        <p>Precio: ${fruta.precio}</p>
                                        <p id={fruta.id} name={fruta.disponible}>Unidades Disponibles: {fruta.disponible}</p>
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" name={fruta.id} onClick={this.verMas.bind(this)}>
                                            Ver Más
                                        </button>
                                        <Button color="success" className="add" onClick={this.propsFa.bind(this)}>Añadir</Button>
                                        <input type="number" className="inputValor" name={fruta.id} onChange={this.inputValue.bind(this)}/>
                                    </div>
                                </Col>
                        )}
                    </Row>
                </Container>
            </div>
        );
    }

    propsFa(){
        if(window.sessionStorage.length>0){
            window.sessionStorage.setItem("value"+this.state.carrito ,this.state.value);
            window.sessionStorage.setItem("id"+this.state.carrito ,this.state.id);
            this.setState({carrito: this.state.carrito+1});
            var resta = parseInt(document.getElementById(this.state.id).getAttribute("name"))-this.state.value;
            document.getElementById(this.state.id).innerHTML="";
            var text = document.createTextNode("Unidades Disponibles: "+resta);
            document.getElementById(this.state.id).appendChild(text);
        }else{
            this.state.carrito=0;
            window.sessionStorage.setItem("value"+this.state.carrito ,this.state.value);
            window.sessionStorage.setItem("id"+this.state.carrito ,this.state.id);
            this.setState({carrito: this.state.carrito+1});
            var resta = parseInt(document.getElementById(this.state.id).getAttribute("name"))-this.state.value;
            document.getElementById(this.state.id).innerHTML="";
            var text = document.createTextNode("Unidades Disponibles: "+resta);
            document.getElementById(this.state.id).appendChild(text);
        }
    }

    buscar(event){
        var palabra = event.target.value;
        var tamano = this.state.data.length;
        var tabla = document.getElementById('dibujar');
        tabla.innerHTML="";
        var n = palabra.length-1;
        var z = palabra.length-2;
        var frutas = this.state.data;
        if(palabra.length>0){
            for(var i=0; i<tamano; i++){
                if(palabra.charAt(0)==frutas[i].nombre.charAt(0)){
                    if(palabra.charAt(n)==frutas[i].nombre.charAt(n)){
                        if(palabra.charAt(z)==frutas[i].nombre.charAt(z)){
                            var col= document.createElement('div');
                            col.className="objeto";
                            col.className="col-3";
                            var div = document.createElement('div');
                            div.className="border";
                            var img = document.createElement('img');
                            img.src=frutas[i].img;
                            img.style.width="100%";
                            img.className="frutaImg";
                            div.appendChild(img);
                            col.appendChild(div);
                            tabla.appendChild(col);
                        }
                    }
                }
            }
        }
        
    }

    verMas(event){
        var target = event.target.name;
        var imgModal = document.getElementById('imgModal');
        imgModal.innerHTML="";
        var datosModal = document.getElementById('datosModal');
        datosModal.innerHTML="";
        request
          .get('https://prueba-next-u-react.firebaseio.com/frutas/'+target+".json")
          .set('Content-Type','aplication/json') 
		  .then((res => {
              var fruto= res.body;
              document.getElementById("exampleModalCenterTitle").innerHTML=fruto.nombre.toUpperCase();
              var img = document.createElement('img');
              img.src=fruto.img;
              img.style.width="100%";
              imgModal.appendChild(img);
              var nombre= document.createElement('h4');
              nombre.innerHTML=fruto.nombre.toUpperCase();
              datosModal.appendChild(nombre);
              var precio= document.createElement('p');
              var textPrice = document.createTextNode('Precio: $'+fruto.precio);
              precio.appendChild(textPrice);
              datosModal.appendChild(precio);
              var disp= document.createElement('p');
              var textDisp = document.createTextNode('Unidades Disponibles: '+fruto.disponible);
              disp.appendChild(textDisp);
              datosModal.appendChild(disp);
            }));
    }

    inputValue(event){
        this.setState({value: null});
        this.setState({value: event.target.value});
        this.setState({id: null});
        this.setState({id: event.target.name});
    }

}
export default Tabla;