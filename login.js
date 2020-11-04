const express = require('express');
const login = express.Router();

var data = [{
    id: 1,
    usuario: "gleon",
    menuitems: [
        "Menu 1", "Menu 2", "Menu 3"
    ],
}];

login.get('/', (request, response, next) => {
    response.status(200).json(data);
});

login.get('/:id', function (req, res, next) {
    // get itemIds from data array
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    
    if (found) {
        res.status(201).json(found);
    } else {
        res.sendStatus(404);
        
    }
});

module.exports = login;