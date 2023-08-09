const express = require('express');
const multer = require('multer');
const path = require('path');


// Storage configuration for multer
const storage = multer.diskStorage({
    destination: './uploads', // Set the folder where the images will be stored
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  // Initialize multer
const Upload = multer({ storage: storage });


module.exports = {Upload}