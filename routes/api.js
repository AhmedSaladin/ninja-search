const express = require('express');
const router = express.Router();
const ninja = require('../modules/ninja')

//get list of ninjas from db
router.get('/ninjas', (req, res, next) => {

    ninja.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: 'dis'
    }).then(ninjas => res.send(ninjas));
});

//add new ninja to db
router.post('/ninjas', function (req, res, next) {
    ninja.create(req.body).then(function (ninja) {
        res.send(ninja)
    }).catch(next);
});

//update a ninja in the db
router.put('/ninjas/:id', function (req, res, next) {
    ninja.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        ninja.findOne({ _id: req.params.id }).then(function (ninja) {
            res.send(ninja);
            console.log("updated");
        })
    });
});


//delete a ninja from the db
router.delete('/ninjas/:id', function (req, res, next) {
    ninja.findOneAndDelete({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
    });
});

module.exports = router;