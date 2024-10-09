const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT; //|| 3000;

app.use(cors());
//app.use(express.urlencoded({extended: false}));
//app.use(express.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  console.log("Home Page");
  res.sendFile(process.cwd() + '/views/index.html');
});


// multer configuration before uploading the multipart/form-data file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadFiles/');
  },
  filename: (req, file, cb) => {
    //cb(null, file.fieldname + '-' + Date.now() + ".pdf");
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

//app.post('/api/fileanalyse/:name/:type/:size', (req, res) => {
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    const output = {name: req.file.originalname, type: req.file.mimetype, size: req.file.size};

    console.log(output);
    res.json(output);
})


app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
