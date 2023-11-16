/* Esercizio

-Impariamo ad utilizzare i middleware e quindi gestiamo gli errori e le pagine 404.
-Questi middleware dovranno rispondere con un json contente il codice ed il messaggio dell’errore.

Creiamo le seguenti rotte:
home
posts / (index)
posts / (store)
posts /: slug(show)

Tramite JTW creiamo una rotta per autenticare un utente ed ottenere il Token JWT e tramite un middleware limitiamo l’accesso alla rota store dei post ai soli utenti loggati.
Svolgiamo tutto l’esercizio tramite relativi controller e router.
 */


const express = require("express");
const dotenv = require("dotenv");
const homeController = require("./controllers/home");
const postsRouter = require("./routers/posts");
const adminRouter = require("./routers/admin");
const authRouter = require("./routers/auth");


const errorsMiddleware = require("./middlewares/errors");
const errorsRouteMiddleware = require("./middlewares/errorsRoute");

dotenv.config();

// istanza di express
const app = express();

// registro il body-parser per "application/json"
app.use(express.json());

// registro il body-parser per "application/x- www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));

// configuro i file statici
app.use(express.static("public"));

// Definiamo le rotte
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/contatti", homeController.contacts);

app.use("/posts", postsRouter)

app.use("/admin", adminRouter)

app.use("/", authRouter)


// Gestiamo gli errori
app.use(errorsRouteMiddleware);
app.use(errorsMiddleware);


// Avviamo il server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
