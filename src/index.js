const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const { auth } = require('./middlewares/authMiddleware');
const {errorHandler} = require('./middlewares/errorHandlerMiddleware')
const routes = require('./routes')


const app = express();
// DB connect

// TODO: change DB name
mongoose.connect(`mongodb://127.0.0.1:27017/pets`)
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB Error, ', err.message))


// Config expres with handlebars 
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
// only with src-fplder
app.set('views', 'src/views');



app.use(express.static(path.resolve(__dirname, 'public')));
// parse body of forms and query strings
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// after cookieParser because auth will use cookies
app.use(auth);



app.use(routes)
app.use(errorHandler)
app.listen('5000', () => console.log('Server is listening on port 5000...'))