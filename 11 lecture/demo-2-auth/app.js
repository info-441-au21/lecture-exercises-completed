import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import MsIdExpress from 'microsoft-identity-express'

const appSettings = {
    appCredentials: {
        clientId: "CLIENT_ID", // Application (client) ID on Azure AD
        tenantId: "TENANT_ID", // alt. "common" "organizations" "consumers"
        clientSecret: "CLIENT_SECRET" // alt. client certificate or key vault credential
    },
    authRoutes: {
        redirect: "/redirect",
        error: "/error", // the wrapper will redirect to this route in case of any error.
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt.
    }
};

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))
// instantiate the MS auth wrapper
const msid = new MsIdExpress.WebAppAuthClientBuilder(appSettings).build();
// initialize the MS auth wrapper
app.use(msid.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// authentication routes
app.get('/signin', 
    msid.signIn({
        postLoginRedirect: '/'
    }
));

app.get('/signout', 
    msid.signOut({
        postLogoutRedirect: '/'
    }
));

// unauthorized
app.get('/error', (req, res) => res.status(500).send('server error'));

// error
app.get('/unauthorized', (req, res) => res.status(401).send('Permission denied'));




export default app;
