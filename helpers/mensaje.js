const { stdin } = require('process');

require('colors');


const MostrarMenu = () => {

    return new Promise ( (resolve) => {
        console.clear();
        console.log('========================='.green);
        console.log('  Selecciona una opción  '.green);
        console.log('=========================\n'.green);
    
        console.log(`${'1.'.green}Crear tarea`);
        console.log(`${'2.'.green}Crear Listar tareas`);
        console.log(`${'3.'.green}Listar tareas completadas`);
        console.log(`${'4.'.green}Listar tareas pendientes`);
        console.log(`${'5.'.green}Completas tarea(s)`);
        console.log(`${'6.'.green}Borrar tarea`);
        console.log(`${'0.'.green}Salir \n`);
        
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readline.question('Seleccione una opción ',(opt)=> {
            readline.close();
            resolve(opt);
        })
    });
   
}

const pausa = () => {

    return new Promise( (resolve) => {
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`,(opt)=> {
            readline.close();
            resolve(opt);
        })
    })
   
}

module.exports = {
    MostrarMenu,
    pausa
}