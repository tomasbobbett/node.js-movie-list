const express = require('express');
const movies = require('./movies.json'); // Importing movies data from JSON file
const crypto = require('node:crypto'); 
const validateMovie = require('./schemes/movies.js').validateMovie; // Importing the validation function from the schema file
const validatePartialMovie = require('./schemes/movies.js').validatePartialMovie; // Importing the partial validation function
// For generating unique IDs
const PORT =process.env.PORT ?? 1234;
const app = express();
app.disable('x-powered-by'); // Disable 'X-Powered-By' header for security
app.use(express.json()); // Middleware to parse JSON request bodies

const ACCEPTED_ORIGINS = [
  'http://localhost:5500',
  'https://mytrusteddomain.com',
  'http://127.0.0.1:5500'
]
//--------------------------------CORS ENDPOINT--------------------------------
app.get("/movies", (req, res) => {
  const origin = req.header("origin")
  if (ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header("Access-Control-Allow-Origin", origin)
  }
  const {genre}= req.query
  if (genre){
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())// PARA NO SE CASE SENSITIVE
    );  
    return res.json(filteredMovies)
  }
  res.json(movies)
})
//--------------------------------READ PARTICULAR ENDPOINT--------------------------------
app.get("/movies/:id", (req, res) => {
  const {id }= req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie)

  res.status(404).json({error: "Movie not found"})
})
//--------------------------------CREATE ENDPOINT--------------------------------
app.post("/movies", (req,res)=>{
  const result = validateMovie(req.body); // Validate the request body against the movie schema
  if (result.error){
    return res.status(400).json({error: JSON.parse(result.error.message)}); // If validation fails, respond with a 400 status code and error message
  }
  const newMovie = {
    id: crypto.randomUUID(), // Generate a unique ID for the new movie
    ...result.data
  };
  movies.push(newMovie)
  res.status(201).json(newMovie); // Respond with the newly created movie and a 201 status code
})
//--------------------------------UPDATE ENDPOINT--------------------------------
app.patch("/movies/:id", (req,res) => {

  const result = validatePartialMovie(req.body)
  if (!result.success){
    return res.status(400).json({error: JSON.parse(result.error.message)}); // If validation fails, respond with a 400 status code and error message
  }
  
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);
  
  if( movieIndex  < 0){
    return res.status(404).json({error: "Movie not found 404"});
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie; // Update the movie in the array 
  return res.json(updatedMovie); // Respond with the updated movie  
})
//--------------------------------DELETE ENDPOINT--------------------------------
app.delete("/movies/:id", (req,res) => {
  const origin = req.header("origin")
  if (ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header("Access-Control-Allow-Origin", origin)
  }
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);
  
  if( movieIndex  < 0){
    return res.status(404).json({error: "Movie not found 404"});
  }

  movies.splice(movieIndex, 1); // Remove the movie from the array
  return res.status(204).send(); // Respond with a 204 No Content status code
})
app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin")
  if (ACCEPTED_ORIGINS.includes(origin) || !origin){
    res.header("Access-Control-Allow-Origin", origin)
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  }

  res.sendStatus(200); // No Content
})

app.listen(PORT, ()=>{
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
})