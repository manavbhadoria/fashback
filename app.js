const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();


app.use(express.json());

const dbURI = 'mongodb+srv://manav:messi12345@cluster0.af58h7n.mongodb.net/fb?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000) 
        console.log("Connection Successful")
    })
    .catch((err) => console.log(err));

app.use(authRoutes);
app.use(productRoutes);
app.use(userRoutes);

