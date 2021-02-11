// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// Star Wars Characters (DATA)

let notes = [
    {
        "title":"Test Title",
        "text":"Test text"
    }
]

// Routes
app.use("/public", express.static('./public/'));
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.post('/public', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index/js')));


// // Displays all characters
// app.get('/api/characters', (req, res) => res.json(characters));
app.get('/api/notes', (req, res) => res.json(notes));



// // Displays a single character, or returns false
// app.get('/api/characters/:character', (req, res) => {
//   const chosen = req.params.character;

//   console.log(chosen);

//   /* Check each character routeName and see if the same as "chosen"
//    If the statement is true, send the character back as JSON,
//    otherwise tell the user no character was found */

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });
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
});

// // Create New Characters - takes in JSON input
// app.post('/api/characters', (req, res) => {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   const newCharacter = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
//   console.log(newCharacter);

//   characters.push(newCharacter);
//   res.json(newCharacter);
// });
// app.post('/api/notes', (req, res) => res.json(notes));
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let note = req.body;

  console.log(note);

  // We then add the json the user sent to the character array
  notes.push(note);

  // We then display the JSON to the users
  res.json(note);
});

app.post('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    delete note[id];
   console.log(notes);

    
    res.json({ ok: true});
 });


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
