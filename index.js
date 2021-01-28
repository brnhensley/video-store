// build services for managing genres
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

let genres = [
    { id: 1, name: "horror" },
    { id: 2, name: "sci-fi" },
    { id: 3, name: "drama" }
];

// routes
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Id not found");
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body); // destructure result.error
    if (error) return res.status(400).send(error.details[0].message); //400 bad request error

    genres.push({ id: genres.length + 1, name: req.body.name });
    res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Id not found");

    const { error } = validateGenre(req.body); // destructure result.error
    if (error) return res.status(400).send(error.details[0].message); //400 bad request error

    const index = genres.indexOf(genre);
    genres[index].name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Id not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

//
const validateGenre = (genre) => {
    console.log(genre);
    const genreSchema = { name: Joi.string().min(5).required() };
    return Joi.validate(genre, genreSchema);
};

const port = process.env.PORT || 666;


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});