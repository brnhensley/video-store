const express = require('express');
const router = express.Router();
const validateGenre = require('../modules/validate'); // uses Joi
let genres = require('../state/genres');

// routes
router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Id not found");
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body); // destructure result.error
    if (error) return res.status(400).send(error.details[0].message); //400 bad request error

    genres.push({
        id: genres[genres.length - 1].id + 1,
        name: req.body.name
    });
    res.send(genres);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Id not found");

    const { error } = validateGenre(req.body); // destructure result.error
    if (error) return res.status(400).send(error.details[0].message); //400 bad request error

    const index = genres.indexOf(genre);
    genres[index].name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Id not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

module.exports = router;