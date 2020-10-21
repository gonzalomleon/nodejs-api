import express from 'express';
import * as cors from 'cors';
import bodyParser = require('body-parser');
import itemsapp from './myapp/items';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors.default());

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.use('/api/items', itemsapp.itemsApp);
app.listen(port, () => {
//   if (err) {
//     return console.error(err);
//   }
  return console.log(`server is listening on ${port}`);
});