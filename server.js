// Henter først express libary og initializer det til app. Derfor sætter jeg en fast port, som serveren skal lytte efter til 3000. 
const express = require('express');
const app = express();
const port = 3000;
const server = express();


const userControl = require('./Controller/userControl');


server.get('/', userControl)



// Endpoint med login

// Serveren lytter til port.
server.listen(port, () => {
    console.log(`Serveren lytter på port ${port}`)
  })

