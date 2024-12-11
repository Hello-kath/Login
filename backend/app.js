require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const app = express();
app.use(express.json());

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const nodemailer = require('nodemailer');
const PORT = process.env.PORT;

const users = []; // Simula una base de datos 

// Configurar CORS para permitir solicitudes solo de localhost:3000
app.use(cors()); // Permite solicitudes de todos los orígenes

/* -------------------- Sistema de Autenticación -------------------- */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3005/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = users.find(u => u.email === profile.emails[0].value || u.username === profile.displayName);

                if (!user) {
                    user = {
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: null,
                        googleId: profile.id,
                        isVerified: true,
                    };
                    users.push(user);
                }

                const token = jwt.sign({ id: user.googleId }, process.env.JWT_SECRET, { expiresIn: '1d' });

                done(null, { user, token });
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// Registro de Usuario
app.post('/registrar', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            isVerified: false,
        };
        users.push(user);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Confirma tu correo electrónico",
            html: `<a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verifica tu cuenta</a>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Usuario registrado. Verifica tu correo.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
    }
});

// Login de Usuario
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta x_X' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ error: 'Verifica tu correo antes de iniciar sesión' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            token,
            user: { id: user.id, email: user.email, username: user.username },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Verificar email
app.get('/verify-email/:token', async (req, res) => {
    const { token } = req.params;
    console.log(token)
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = users.find(user => user.id === decode.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.isVerified = true;
        console.log(users)
        res.status(200).json({ message: 'Correo verificado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Token inválido o expirado' });
    }
});

// Middleware para proteger rutas con JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso autorizado', user: req.user });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

