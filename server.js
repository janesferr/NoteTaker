// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const uuid = require('uuid');
app.use(express.static("public"));
// Star Wars Characters (DATA)

let notes = [
  {
    "title":"Call bank on Friday",
    "text":"Friday is our day off"
},
{
    "title":"Reschedule Delivery",
    "text":"Deliver Food"
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
app.post('/api/notes/', (req, res) => {
  res.send(req.body);
  const newNotes = {
      id: uuid.v4(),
      title:req.body.title,
      text:req.body.text,
      status: 'active'
  }
  if (!newNotes.title || !newNotes.text) {
      return res.status(400).json({ msg: 'Please include a title and text' });
  }
  //if you have a database you use
  //members.save(newMember)
  notes.push(newNotes);
  res.json(notes);

});

app.put('/api/notes/:id', (req, res) => {
  const found = notes.some(notes => notes.id === parseInt(req.params.id));
  if (found) {
      const updMember = req.body;
      notes.forEach(member => {
          if (notes.id === parseInt(req.params.id)) {
             notes.title = updMember.title ? updMember.title : notes.title;
             notes.text = updMember.text ? updMember.text : notes.text;

              res.json({ msg: 'Member updated', member })
          }
      });
  }
  else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});
app.delete('/api/notes/:id', (req, res) => {
  const found = notes.some(notes => notes.id === parseInt(req.params.id));
  if (found) {
      res.json({
          msg: 'notes deleted', 
          notes: notes.filter(notes => notes.id !== parseInt(req.params.id))
  });
}
  else {
      res.status(400).json({ msg: `No notes with the id of ${req.params.id}` });
  }
});
app.delete("/api/notes/:id", function(req, res) {
  notes.splice(req.params.id, 1);
  updateDb();
  console.log("Deleted note with id "+req.params.id);
});


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
