const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// ✅ Add Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ✅ Initialize JWT-BABA
const initAuthSystem = require('jwt-baba');
initAuthSystem(app); // 🪄 Baba is activated!