const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

app.use((req, res, next) => {
  console.log(req.method)
  console.log(req.url)
  console.count("Request: ")
  next()
})

function verifyId (req, res, next){
  const { id } = req.params
  if(!req.params.id || !projects.find(projects => projects.id == id)){
    return res.status(400).json({ error: "Usuário não existe"})
  }
  return next()
}

app.post('/projects', (req, res) => {
  const { id, title, tasks} = req.body;
  projects.push({id: id, title: title, tasks: tasks});
  return res.send();
})


app.post('/projects/:id/tasks',verifyId, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;
  const addTasks = projects.find(projects => projects.id == id)
  addTasks.tasks.push(tasks)
  return res.json(addTasks)

})


app.get('/projects', (req, res) => {
  return res.json(projects)
})


app.put('/projects/:id', verifyId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const updateTitle = projects.find(projects => projects.id == id)
  updateTitle.title = title;
  return res.json(updateTitle)
})


app.delete('/projects/:id', verifyId, (req, res) => {
  const { id } = req.params
  projects.splice(
    projects.findIndex(
      projects => projects.id == id
    ), 
    1
  )
  return res.send();
})



app.listen(3000)