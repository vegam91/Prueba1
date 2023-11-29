const mongoose = require('mongoose');
require('dotenv').config(); 

module.exports = function() {
    const uri = process.env.MONGO_URI;

    mongoose
        .connect(uri)
        .then(() => console.log('MongoDB on...'))
        .catch((error) => {
            console.error('Error de conexión a MongoDB:', error.message);
            process.exit(1); 
        });
};