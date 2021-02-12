// Dependencies

const express = require('express');
const path = require('path');
let notes = require("./db/db.json");
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// Star Wars Characters (DATA)

// let notes = [
//     {
//         "title":"Test Title",
//         "text":"Test text"
//     }
// ]
fs.writeFileSync(path.resolve(__dirname, './db/db.json'), JSON.stringify(notes));


// Routes
app.use("/public", express.static('./public/'));
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.post('/public', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index/js')));


// // Displays all characters
// app.get('/api/characters', (req, res) => res.json(characters));
app.get('/api/notes', (req, res) => res.json(notes));




app.get('/api/notes/:id', (req, res) => {
  const chosen = req.params.character;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
  // const found = notes.some(notes => notes.id === parseInt(req.params.id));
  // if(found){
  //   res.json(notes.filter(notes => notes.id ===parseInt(req.params.id)));

  // }else{
  //   res.status(400).json({msg: `No member with teh id of ${req.params.id}`});
  // }
});
// app.post('/api/notes/', (req, res) => res.json(notes));

app.post('/api/notes/:id', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let note = req.body;

  console.log(note);

  // We then add the json the user sent to the character array
  notes.push(note);

  // We then display the JSON to the users
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  //   let id = req.params.id;
  //   if(delete notes.id){
  //       res.json(notes.id);
  //   }
  //  console.log(notes);

    
    // res.json({ ok: true});
    // res.json(notes);
// for(let i = 0; i <notes.length; i++){
//     if(notes[i].id === key){
//         notes.splice(i,1);
//     }
// }
});


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
