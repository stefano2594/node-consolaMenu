require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
//const {MostrarMenu,pausa} = require('./helpers/mensaje');
const { inquirerMenu,
   pausa,
   leerInput,listadoTareasBorrar,
   confirmar,
   mostrarListadoChecklist} = require('./helpers/inquirer');
   
const Tareas = require('./models/tareas');


console.clear();


const main = async () =>{
     //console.log (' Hola mundo');

     let opt='';
     const tareas= new Tareas();

     const tareasDB = leerDB();

     if( tareasDB){
          // Establecer las tareas
          // TODO : cargarTareas
          tareas.cargarTareasFromArray(tareasDB);
     }


     do{
    //   opt = await  MostrarMenu();
    opt = await inquirerMenu();
     switch(opt) {
        case '1' : 
        //crear opcion
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;

        case '2': 
             tareas.listadoTareas();
             
        break;

        case '3':
             tareas.listadoTareasCompletasPendientes(true);
        break;
        case '4':
             tareas.listadoTareasCompletasPendientes(false);
        break;

        case '5': // completado | pendiente
             const ids = await mostrarListadoChecklist(tareas.listadoArr);
             tareas.toggleCompletadas(ids);
        break;

        case '6':
          const id =await listadoTareasBorrar(tareas.listadoArr);
          if(id !=='0' ){
               const ok = await confirmar('¿Estas seguro de querer borrar la tarea?');
               if( ok ){
                    tareas.borrarTarea(id);
                    console.log('Tarea Borrada');
               } 
          }
        break;
     }
   // si quiero juntar las tareas con tarea
       //console.log({opt});
    //   if(opt !=='0') await pausa();
      guardarDB(tareas.listadoArr);

      await pausa();
     }while( opt !== '0');
     
}

main();