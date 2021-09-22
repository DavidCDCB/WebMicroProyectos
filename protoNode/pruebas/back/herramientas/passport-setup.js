const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('./../modelos/usuario.model')
const jwt = require('jsonwebtoken');
var generator = require('generate-password');
const nodemailer = require('nodemailer')

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Usuario.findById(id, function (err, usuario) {
        done(err, usuario);
    });
});

passport.use(new GoogleStrategy({
    clientID: '655690073603-g5uk8h8jglnsg0c7tmpqqfvfhj1kf7sf.apps.googleusercontent.com',
    clientSecret: 'gAwGgJYOTcPZihq6cNIDH2Bz',
    callbackURL: "http://localhost:3000/ApiDb/usuarios/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        const usuario = await Usuario.findOne({ email: profile._json.email })
        if (!usuario) {  //Si aun no existe en la DB
            return done(null, null);
        } else {
            if (usuario.isActive == false) //Si la cuenta existe pero aun no esta activada
            {
                return done(null, null);
            } else {
                const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
                    expiresIn: process.env.CADUCIDAD_TOKEN
                })
                return done(null, token);
            }
        }
    }
));

/*Si el usuario se loguea por primera vez y aun no existe en la DB se realiza un registro
        const password = generator.generate({ //La contraseña se crea aleatoriamente
            length: 15,
            numbers: true,
            symbols: true,
            uppercase: true
        });
        let usuario = new Usuario({
            nombre:profile._json.name,
            email:profile._json.email,
            password:password,
        });
        usuario.password = await usuario.encryptPassword(usuario.password)
        await usuario.save((err, usuarioDB) => {
            if (err) {
                return done(null, false, {
                    message: 'User cannot be saved'
                });
            }
            const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            })
            return done(null, token);
        })*/