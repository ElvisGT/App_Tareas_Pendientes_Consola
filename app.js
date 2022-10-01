const colors = require("colors");
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        listadoCompletar
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const {guardarInfo} = require("./helpers/guardarInfo");
const {leerInfo} = require("./helpers/leerInfo");


const main = async() => {
  let opt = '';
  const tareas = new Tareas();
  
  //Esto es para traer de la base de datos (GET)
  const tareasDB = leerInfo();
  if(tareasDB){
    tareas.cargarFromArray(tareasDB);
  }

  do {
    //Funcion para imprimir menu
    opt = await inquirerMenu();

    switch(opt){
      case '1':
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea( desc );
      break;
        
      case '2':
        tareas.listadoCompleto();
      break;

      case '3':
        tareas.listarPendientesCompletadas(true);
      break;
      
      case '4':
        tareas.listarPendientesCompletadas(false);
      break;
      
      case '5':
        const idsCompletar = await listadoCompletar( tareas.listadoArray );
        tareas.invertirCompletadas( idsCompletar );
      break;

      case '6':
        const id = await listadoTareasBorrar( tareas.listadoArray );
        if( id !== '0'){
          const ok = await confirmar('Esta seguro?');
          if( ok ){
            tareas.borrarTarea( id );
            console.log("Tarea Borrada".green);
          }
        }
       
      break;
    }

   
    //Esto es para guardar en la base de datos (POST)
    guardarInfo(tareas.listadoArray);
    
    //Esto es para pausar la consola
    console.log('\n');
    await pausa();

  }while(opt !== '0');
};



//Por aqui empieza la ejecucion del programa
main();