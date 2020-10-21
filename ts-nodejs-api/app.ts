import express from 'express';
import items from './myapp/items';
import itemsapp from './myapp/items';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
const newRoutes = itemsapp.itemsApp.routes;
app.use('/api/items', itemsapp.itemsApp);
app.listen(port, () => {
//   if (err) {
//     return console.error(err);
//   }
  return console.log(`server is listening on ${port}`);
});