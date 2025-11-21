const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const dispatch = require('../srcmodules/dispatch');
const driver = require('../srcmodules/driver');
const invoice = require('../srcmodules/invoice');
const ai = require('../srcmodules/ai');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
}

app.post('/api/login', (req, res) => {
  const { username, role } = req.body;
  const user = { name: username, role };
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.use('/api/dispatch', authenticateToken, dispatch);
app.use('/api/driver', authenticateToken, driver);
app.use('/api/invoice', authenticateToken, invoice);
app.use('/api/ai', authenticateToken, ai);

io.on('connection', (socket) => {
  console.log('A dispatcher connected');
  socket.on('update-board', (data) => {
    io.emit('board-updated', data);
  });
  socket.on('disconnect', () => {
    console.log('Dispatcher disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
