const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURI = process.env.MONGODB_URI
const app = express();
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT 

// Create a schema and model for Todo items
const todoSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to get all todos
app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.render('index', { data: todos });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to add a new todo
app.post('/add-todo', async (req, res) => {
  const todoText = req.body.todoText;
  const newTodo = new Todo({
    text: todoText
  });

  try {
    const savedTodo = await newTodo.save();
    res.json({ success: true, todo: savedTodo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route to update a todo item
app.put('/update-todo/:id', async (req, res) => {
  const { id } = req.params;
  const updatedText = req.body.todoText;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { text: updatedText }, { new: true });
    res.json({ success: true, todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route to delete a todo item
app.delete('/delete-todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
