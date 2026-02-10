const express = require('express');
const app = express();

app.use(express.json());

// endpoints genéricos pra enganar o plugin
app.post('/auth/login', (req, res) => {
  return res.json({ token: 'fake-token' });
});

app.post('/projects', (req, res) => {
  return res.json({ success: true });
});

app.post('/flows', (req, res) => {
  return res.json({ success: true });
});

app.post('/events', (req, res) => {
  return res.json({ success: true });
});

app.get('/health', (req, res) => {
  return res.json({ status: 'ok' });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`🟢 Fake Pactum Flow Server rodando em http://localhost:${PORT}`);
});
