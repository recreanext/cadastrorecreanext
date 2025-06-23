const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const XLSX = require('xlsx');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const SECRET = 'secret-key'; // change in production

// Simple in-file storage utilities
const readData = (file) => {
  const filePath = path.join(__dirname, 'data', file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeData = (file, data) => {
  fs.writeFileSync(path.join(__dirname, 'data', file), JSON.stringify(data, null, 2));
};

// Authentication
const ADMIN_USER = { username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8) };

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER.username && bcrypt.compareSync(password, ADMIN_USER.passwordHash)) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '8h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Programs CRUD
app.get('/programs', authenticate, (req, res) => {
  res.json(readData('programs.json'));
});

app.post('/programs', authenticate, (req, res) => {
  const programs = readData('programs.json');
  programs.push({ id: Date.now(), ...req.body });
  writeData('programs.json', programs);
  res.json({ message: 'Program added' });
});

app.put('/programs/:id', authenticate, (req, res) => {
  const programs = readData('programs.json');
  const idx = programs.findIndex(p => p.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  programs[idx] = { ...programs[idx], ...req.body };
  writeData('programs.json', programs);
  res.json({ message: 'Program updated' });
});

app.delete('/programs/:id', authenticate, (req, res) => {
  const programs = readData('programs.json');
  const filtered = programs.filter(p => p.id != req.params.id);
  writeData('programs.json', filtered);
  res.json({ message: 'Program deleted' });
});

// Children registration endpoints
app.get('/children', authenticate, (req, res) => {
  res.json(readData('children.json'));
});

app.post('/children', (req, res) => {
  const children = readData('children.json');
  children.push({ id: Date.now(), ...req.body });
  writeData('children.json', children);
  res.json({ message: 'Child registered' });
});

// Export to Excel
app.get('/export', authenticate, (req, res) => {
  const children = readData('children.json');
  const worksheet = XLSX.utils.json_to_sheet(children);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Children');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename="children.xlsx"');
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buffer);
});

// Gallery
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post('/gallery', authenticate, upload.single('image'), (req, res) => {
  res.json({ path: `/uploads/${req.file.filename}` });
});

app.get('/gallery', authenticate, (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, 'uploads'));
  res.json(files.map(f => ({ filename: f, url: `/uploads/${f}` })));
});

app.delete('/gallery/:filename', authenticate, (req, res) => {
  fs.unlinkSync(path.join(__dirname, 'uploads', req.params.filename));
  res.json({ message: 'Deleted' });
});

// Chat with Socket.io
let messages = [];

io.on('connection', socket => {
  socket.emit('init', messages);
  socket.on('message', msg => {
    const fullMsg = { user: socket.id, text: msg, time: Date.now() };
    messages.push(fullMsg);
    io.emit('message', fullMsg);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
