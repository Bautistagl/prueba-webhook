// import express from 'express'
// import { Octokit, App } from 'octokit'

// const app = express()

// app.get('/', (req,res)=>{
//     res.send('Hello World!')
// })

// app.get('/repositorios', (req,res) => {
//     res.send('ABOUT')
// })
// app.get('/api/repositorios', (req,res) => {
//     res.send('api webhook')
// })

// app.listen(3000, () => {
//     console.log('Server is listening on 3000')
// })
// import { App, createNodeMiddleware } from "octokit";
// import "dotenv/config";
// import express from "express";




// const ghApp = new App({
//   appId: process.env.APP_ID,
//   privateKey: process.env.PRIVATE_KEY,
//   webhooks: {
//     secret: process.env.WEBHOOK_SECRET,
//   },
//   oauth: { clientId: null, clientSecret: null },
// });
// const app = express();


// app.get('/', (req,res)=>{
//     res.send('Hello World!')
// })


// app.post('/api/github/webhooks', (req,res)=>{
//   res.send('INSTALACION')
//   console.log(res,'esto es res')
//   console.log(req,'esto es req')
// })
// app.get('/api/github/webhooks', (req,res)=>{
//   res.send('INSTALACION')
//   console.log(res,'esto es res')
//   console.log(req,'esto es req')
// })
// ghApp.webhooks.on('installation.created', async ({ octokit, payload }) => {
//   console.log(`Received a installation.created event for #${payload.installation.id}`)
// })




// app.use(createNodeMiddleware(ghApp));
// app.listen(3000, () => {
//     console.log('Server is listeningg on 3000')
// })

import {http} from 'http'

// Definir la función de manejo de solicitudes
const requestHandler = (request, response) => {
  // Establecer el encabezado de respuesta con el tipo de contenido
  response.setHeader('Content-Type', 'text/plain');
  // Escribir la respuesta
  response.end('¡Hola, mundo!\n');
};

// Crear un servidor HTTP y pasar la función de manejo de solicitudes
const server = http.createServer(requestHandler);

// Escuchar en el puerto 3000 y la dirección localhost
server.listen(3000, 'localhost', (err) => {
  // Manejar los errores si los hay
  if (err) {
    return console.error('Error al iniciar el servidor:', err);
  }
  // Indicar que el servidor está funcionando
  console.log('Servidor corriendo en http://localhost:3000/');
});