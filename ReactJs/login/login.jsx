import React from 'react';
import './login.css';
import * as request from 'superagent';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <Form id="login">
              <div>
                <h2>Iniciar Sesion</h2>
              </div>
              <FormGroup>
                <Label for="exampleEmail" id="email">Email</Label>
                <Input type="email" name="email" id="exampleEmail" onChange={this.textEmail.bind(this)} placeholder="Ingresar usuario" />
                <small id="emailHelp" nameclass="form-text text-muted" hidden>Email incorrecto. El correo es: admin@admin.com</small>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword" id="key">Password</Label>
                <Input type="password" name="password" id="examplePassword" onChange={this.textKey.bind(this)} placeholder="Ingresar Contraseña" />
                <small id="pass" nameclass="form-text text-muted" hidden>Contraseña incorrecta. La constraseña es: admin</small>
              </FormGroup>
              <Button onClick={this.send.bind(this)} color="success" id="ingresar">Ingresar</Button>
            </Form>
        );
    }
    componentDidMount(){
      request
        .get('https://prueba-next-u-react.firebaseio.com/login/user1.json')
        .set('Content-Type','aplication/json')
		    .then((res => {
          console.log(res.body);
          window.localStorage.setItem('usuario', res.body.email);
          window.localStorage.setItem('key', res.body.contrasena);
          }))
    }
    textEmail(event){
      this.setState({user: event.target.value});
    }

    textKey(event){
      this.setState({key: event.target.value});
    }

    send(){
      if(this.state.user == window.localStorage.getItem('usuario')){
        document.getElementById("emailHelp").setAttribute('hidden', '');
        if(this.state.key == window.localStorage.getItem('key')){
          window.localStorage.setItem("token", "ok");
          document.getElementById("pass").setAttribute('hidden', '');
          window.location.reload();
        }else{
          document.getElementById("pass").removeAttribute('hidden');
        }
      }else{
        document.getElementById("emailHelp").removeAttribute('hidden');
      }
    }
}
export default Login;