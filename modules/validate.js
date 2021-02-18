const Joi = require('joi');

const validate = (genre) => {
    const genreSchema = { name: Joi.string().min(5).required() };
    return Joi.validate(genre, genreSchema);
};

module.exports = validate;

//other way to write

// module.exports = (genre) => {
//     const genreSchema = { name: Joi.string().min(5).required() };
//     return Joi.validate(genre, genreSchema);
// };