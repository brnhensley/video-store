// build services for managing genres
const express = require('express');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

// server
const port = process.env.PORT || 666;
app.listen(port, () => console.log(`listening on port ${port}`));