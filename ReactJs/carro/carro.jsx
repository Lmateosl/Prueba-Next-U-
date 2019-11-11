import React from 'react';
import './carro.css';
import { Container, Row, Col, Button } from 'reactstrap';
import * as request from 'superagent';

class Carro extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div id="cuerpoCarri">
                <div id="headCarri">
                    <div id="head1Carri">
                        <h4>Carrito de compras</h4>
                    </div>
                    <div id="rellenoCarri"></div>
                    <div id="head2Carri"></div>
                </div>
                <Container id="tableasCarri">
                    <Row id="dibujarCarri">
                        <Col xs="6">
                            <table id="borderT">
                                <tbody id="item">
                                    
                                </tbody>
                            </table>
                        </Col>
                            <div id="pagarT">
                                <h3 id="totalf">Total: $</h3>
                                <Button color="secondary" id="espacio" onClick={this.cancelar.bind(this)}>Cancelar</Button>
                                <Button color="success" id="espacio" onClick={this.pagar.bind(this)}>Pagar</Button>
                            </div>
                        <Col xs="6" id="total">

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    pagar(){
        //Los for aveces no se ejecutan muy rapido y se mandan con diferente ID, el problema es que no se bases de datos y me toca usar firebase y hacer lo que pueda
        var length= window.sessionStorage.length/2;
        for(var i=0; i<length; i++){
            var value= window.sessionStorage.getItem("value"+i);
            var id= window.sessionStorage.getItem("id"+i);
            request
              .get('https://prueba-next-u-react.firebaseio.com/frutas/'+id+".json")
              .set('Content-Type','aplication/json') 
		      .then((res => {
                  var item = res.body;

                  var data = {
                      img: "",
                      nombre: "",
                      precio: 0,
                      disponible: 0,
                      id: ""
                  };
                  data.img = item.img;
                  data.nombre= item.nombre;
                  data.precio= item.precio;
                  data.disponible= (item.disponible - parseInt(value));
                  data.id= item.id;

                  console.log(data);

                  request
                    .put('https://prueba-next-u-react.firebaseio.com/frutas/'+id+'.json')
                    .send(data)
                    .then((res => console.log(data)))
              }))
              setTimeout(function(){
                alert("Pago Realizado");
                window.sessionStorage.clear();
                window.history.pushState(null, '', '/');
                window.location.reload();
                }, 1000);
        }
    }

    componentDidMount(){
        if(window.sessionStorage.length<1){
            alert("No ha agregado ningun item al carrito");
            window.history.pushState(null, '', '/');
            window.location.reload();
        }

        var length= window.sessionStorage.length/2;
        var tabla= document.getElementById('item');
        var suma = 0;
        for(var i=0; i<length; i++){
            var value= window.sessionStorage.getItem("value"+i);
            var id= window.sessionStorage.getItem("id"+i);
            request
              .get('https://prueba-next-u-react.firebaseio.com/frutas/'+id+".json")
              .set('Content-Type','aplication/json') 
		      .then((res => {
                  var item = res.body;
                  var tr = document.createElement('tr');
                  var td = document.createElement('td');
                  td.style.border="solid 1px gainsboro";
                  td.style.padding="10px";
                  var container = document.createElement('div');
                  container.className="container";
                  var row = document.createElement('div');
                  row.className="row";
                  var col = document.createElement('div');
                  col.className="col-6";
                  var col2 = document.createElement('div');
                  col2.className = "col-6";
                  row.appendChild(col);
                  row.appendChild(col2);
                  container.appendChild(row);
                  td.appendChild(container);
                  tr.appendChild(td);

                  var img = document.createElement('img');
                  img.src=item.img;
                  img.style.width="70%";
                  col.appendChild(img);

                  var nombre = document.createElement('h5');
                  nombre.style.marginTop="10px";
                  nombre.style.marginBottom="10px";
                  var textNombre = document.createTextNode(item.nombre.toUpperCase());
                  nombre.appendChild(textNombre);
                  col2.appendChild(nombre);

                  var precio = document.createElement('p');
                  var precioText = document.createTextNode('Precio: $'+item.precio);
                  precio.appendChild(precioText);
                  col2.appendChild(precio);

                  var disp = document.createElement('p');
                  var dispText =  document.createTextNode('Cantidad: '+value);
                  disp.appendChild(dispText);
                  col2.appendChild(disp);

                  suma = suma + (parseInt(value)*item.precio);
                  document.getElementById("totalf").innerHTML="Total: $"+suma.toFixed(2);

                  tabla.appendChild(tr);
              }));
        }
    }

    cancelar(){
        window.sessionStorage.clear();
        window.history.pushState(null, '', '/');
        window.location.reload();
    }
}

export default Carro;