import { App, Octokit, createNodeMiddleware } from "octokit";
import "dotenv/config";
import express from "express";
import { createTokenAuth } from "@octokit/auth-token";

const auth = createTokenAuth("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");

const ghApp = new App({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
  webhooks: {
    secret: process.env.WEBHOOK_SECRET,
  },
  oauth: { clientId: null, clientSecret: null },
});
const octokit = new Octokit({
  // auth: {
  //   appId: process.env.APP_ID,
  //   privateKey: process.env.PRIVATE_KEY,
  //   installationId: process.env.INSTALLATION_ID,
    
  // },
  auth: "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",
});


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/github/webhooks', (req, res) => {
  const eventType = req.headers['x-github-event'];
  const payload = req.body;

  // Loguea el tipo de evento
  console.log('GitHub Event Type:', eventType);
  
  // Dependiendo del tipo de evento, realiza la acción correspondiente
  switch (eventType) {
    case 'installation.created':
      // Manejar el evento de instalación creada
      console.log('Installation Created:', payload);
      break;
    case 'installation.deleted':
      // Manejar el evento de instalación eliminada
      console.log('Installation Deleted:', payload);
      break;
    case 'installation_repositories.added':
      // Manejar el evento de repositorios agregados a la instalación
      console.log('Installation Repositories Added:', payload);
      break;
    case 'installation_repositories.removed':
      // Manejar el evento de repositorios eliminados de la instalación
      console.log('Installation Repositories Removed:', payload);
      break;
    default:
      console.log('Unhandled GitHub Event Type:', eventType);
      break;
  }

  res.sendStatus(200);
});


app.post('/api/github/commit', async (req, res) => {
  const owner = "Bautistagl";
  const repo = "prueba-webhook";
  const path = "nuevoCommit/archivo.txt";
  const content = "Contenido del archivo en base64";
  const message = "Mensaje del commit";

  try {
    // Obtener detalles del archivo para obtener el SHA
    const fileInfo = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });
    
    const sha = fileInfo.data.sha;

    // Crear o actualizar el archivo con el SHA proporcionado
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha, // incluir el SHA obtenido en la solicitud
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating or updating file:', error);
    res.status(500).json({ error: 'Error creating or updating file' });
  }
});

app.use(createNodeMiddleware(ghApp));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});