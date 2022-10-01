const colors = require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado_tareas = {};

  get listadoArray() {
    const listado = [];

    //Esta es una forma de hacerlo
    // Object.keys(this._listado_tareas).forEach(key => {
    //   const tarea = this._listado_tareas[key];
    //   console.log(tarea);
    // });

    //Esta es otra
    for(let tarea in this._listado_tareas){
      listado.push(this._listado_tareas[tarea]);
    }
    
    return listado;
  }

  constructor(){
    this._listado_tareas = {};
  }

  borrarTarea( id = ''){
    if( this._listado_tareas[id]){
      delete this._listado_tareas[id];
    }
  }

  cargarFromArray = ( tareas = []) => {
    tareas.forEach(tarea => {
      this._listado_tareas[tarea.id] = tarea;
    })
  }

  crearTarea( desc ){
    const tarea = new Tarea(desc);

    this._listado_tareas[tarea.id] = tarea;

  }

  listadoCompleto = (  ) => {
    console.log();
    for(let i = 0;i < this.listadoArray.length;i++){
      const indice = i + 1;
      const estado = this.listadoArray[i].completadoEn 
                            ? `${'Completado'.green}`
                            : `${'Pendiente'.red}`;
      
      console.log(`${(indice + '.').green} ${this.listadoArray[i].desc} :: ${estado}`);
    }
  }

  listarPendientesCompletadas = ( completadas = true ) => {

    let contador = 0;

    for(let i = 0;i < this.listadoArray.length;i++){
      const desc = this.listadoArray[i].desc;
      const completadoEn = this.listadoArray[i].completadoEn;


      if(completadas){
        if(completadoEn) {
          contador+=1;
          console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
        }
        
      }else {
        if(!completadoEn) {
          contador+=1;
          console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`);
        }
        
      }
      
     
    }
    
  }

  invertirCompletadas( ids = []){
    ids.forEach(id => {
      const tarea = this._listado_tareas[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArray.forEach( tarea => {
      if(!ids.includes(tarea.id)){
        this._listado_tareas[tarea.id].completadoEn = null;
      }
    })
  }

}



module.exports = Tareas;