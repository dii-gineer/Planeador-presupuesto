import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import  ControlPresupuesto from './ControlPresupuesto'
import {validarPresupuesto} from '../helper';

class App extends Component {
  
  state = {
    presupuesto: '',
    restante:'',
    gastos:{}
  }

  componentDidMount(){
   this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () =>{
    let presupuesto = prompt("Para iniciar escribe tu presupesto ");
    let resultado = validarPresupuesto(presupuesto);
    if (resultado){
      this.setState({
        presupuesto: presupuesto,
        restante: presupuesto
      })
    }else{
        this.obtenerPresupuesto();
      }
    }

  //Agregar gasto al objeto del state
  agregarGasto = gasto =>{
    const gastos = {...this.state.gastos};

    gastos[`gasto${Date.now()}`]=gasto;

    this.restarPresupuesto(gasto.cantidadGasto);

    this.setState({
      gastos
    })

  }

  //restar del presupuesto 

  restarPresupuesto = cantidad=>{
    let restar = Number(cantidad);
    let restante = this.state.restante;
    restante -= restar;
    restante = String(restante);
    
    this.setState({
      restante
    })
  }



  render() {
    return (
      <div className="App container">
        <Header
          titulo ='Gasto Semanal'/>
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
                <Formulario
                    agregarGasto= {this.agregarGasto}
                />
            </div>
            <div className="one-half column">
              <Listado
                  gastos = {this.state.gastos}
              />

              <ControlPresupuesto
                presupuesto = {this.state.presupuesto}
                restante = {this.state.restante}
              />

            </div>
                        

          </div>

        </div>
       
      </div>
    );
  }
}

export default App;
