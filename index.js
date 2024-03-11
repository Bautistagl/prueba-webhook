

import { App, createNodeMiddleware } from "octokit";
import "dotenv/config";
import express from "express";

const ghApp = new App({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
  webhooks: {
    secret: process.env.WEBHOOK_SECRET,
  },
  oauth: { clientId: null, clientSecret: null },
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/github/webhooks', (req, res) => {
  res.send('INSTALACION');
  console.log(req.body,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'); // Loguea el cuerpo de la solicitud
});


app.post('/api/github/commit', async (req, res) => {
  // const { owner, repo, path, content, message } = req.body;
  console.log(ghApp,'ESTO ES EL GHAPP');
  const owner = "Bautistagl";
  const repo = "prueba-webhook";
  const path = "nuevoCommit/archivo.txt";
  const content = "Contenido del archivo en base64";
  const message = "Mensaje del commit";

  try {
    const response = await ghApp.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
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