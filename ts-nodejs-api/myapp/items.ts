import express from 'express';
const itemsApp = express();
import DbOper from "./DbOper";

const data = [
  {
    id: 1,
    message: "Mocked Task 1",
    done: true,
  },
  {
    id: 2,
    name: "Mocked Task 2",
    done: false,
  },
];

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

itemsApp.get("/", (request, response, next) => async () => {
  // await main().catch(console.error);
  response.status(200).json(data);
});

itemsApp.get("/:id", (req, res, next) => {
  // get itemIds from data array
  const found = data.find(  (item) => {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(201).json(found);
  } else {
    res.sendStatus(404);
  }
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
itemsApp.put("/:id", async function (req, res, next) {
  // get itemIds from data array
  const itemIds = data.map((item) => item.id);
  //console.log(itemIds);
  //console.log(req.params.id);
  //console.log(itemIds.findIndex( item => item == parseInt(req.params.id)));

  if (itemIds.findIndex((item) => item == parseInt(req.params.id)) >= 0) {
    res.sendStatus(404);
  } else {
    // create new id (basically +1 of last item object)
    const newId = parseInt(req.params.id); //itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    // create an object of new Item
    const newItem = {
      id: newId, // generated in above step
      message: req.body.message, // value of `title` get from POST req
      done: req.body.done, // generated in above step
    };

    // push new item object to data array of items
    data.push(newItem);
    await DbOper.saveItem(newItem);
    // return with status 201
    // 201 means Created. The request has been fulfilled and
    // has resulted in one or more new resources being created.
    res.status(201).json(newItem);
  }
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
itemsApp.patch("/:id", (req, res, next) => {
  // get item object match by `id`
  const found = data.find( (item) => {
    return item.id === parseInt(req.params.id);
  });
  console.log(found);
  // check if item found
  if (found) {
    const updated = {
      id: found.id,
      message: req.body.message, // set value of `title` get from req
      done: req.body.done, // set value of `order` get from req
    };

    // find index of found object from array of data
    const targetIndex = data.indexOf(found);

    // replace object from data list with `updated` object
    data.splice(targetIndex, 1, updated);

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

itemsApp.delete("/:id", (req, res, next) => {
  const found = data.find((item) => {
    return item.id === parseInt(req.params.id);
  });
  // if object found return an object else return 404 not-found
  if (found) {
    // if item found then find index at which the item is
    // stored in the `data` array
    const targetIndex = data.indexOf(found);
    // splice means delete item from `data` array using index
    data.splice(targetIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(204);
  }
});

export default { itemsApp };
