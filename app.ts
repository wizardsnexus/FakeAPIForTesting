import express, { NextFunction, Response, Request } from "express";
import * as path from 'path';
import cookieParser from 'cookie-parser';
import { default as allRoutes } from './src/routes/Main';
import helmet from "helmet";
import session from 'express-session';
import connectMongoDBSession from "connect-mongodb-session";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// Use a bunch of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(helmet());
app.disable("x-powered-by");

/**
 * Setup Session Store
 */
const MongoDBStore = connectMongoDBSession(session);
const mongoStore = new MongoDBStore({
    uri: 'mongodb://mongo-session-store:27017/', // This name comes from the docker-compose file.
    databaseName: 'webapp-sessions', // Arbitrary DB name
    collection: 'sessions', // Arbitrary, but logical, collection (table) name
    connectionOptions: {
        auth: {
            username: 'username', // See the docker-compose.yml file in regards to mongoDB username/password
            password: 'password'
        },
        authSource: 'admin',
        readPreference: 'primary',
        ssl: false,
        directConnection: true
    },
},
    err => {
        console.log(`ERROR: ${err}`)
    }
)

mongoStore.on('error', err => {
    console.log("Failed to connect to MongoDBStore");
    console.log(err)
})

/**
 * Custom Session Options
 */
declare module 'express-session' {
    interface SessionData {
        [key: string]: any;
    }
}

const sessionOptions = {
    secret: 'RandomString', // An encryption seed
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        originalMaxAge: Date.now() + (60 * 60 * 1000)
    }
}

app.use(session(sessionOptions))


/**
 * Routing
 */
allRoutes.forEach(route => {
    app.use(route.route)
})

/**
 * Error Handling
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err.message)

    // render the error page
    res.status(err.status || 500);
    res.render('400/404');
});

export { app };
