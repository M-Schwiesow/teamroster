const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname + '/project/dist/project')));

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(PORT, function(){
  console.log(`Server ready to rock on port ${PORT}.`);
});