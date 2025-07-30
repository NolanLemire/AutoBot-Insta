const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'mon_token_secret';

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook vérifié avec succès');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', (req, res) => {
  console.log('Reçu un événement:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Serveur à l'écoute sur le port ${PORT}`);
});
