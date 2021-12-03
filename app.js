const express = require('express')
const path = require('path')
const fs = require('fs')
const port = 80
const app = express()
const bodyParser = require('body-parser')
// Mongoose Specific stuff
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDatabase');

  // Creating Schema
  const contactSchema = new mongoose.Schema({
    name: String,
    age : String,
    gender : String,
    address : String,
    more : String
  });
  // Creating Model
  const contact = mongoose.model('contact', contactSchema);
  app.post('/contact', (req, res) => {
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.status(200).render('contact1.pug')
    }).catch(()=>{
        res.status(400).send("item was no sent")
    })
    
})

 
}

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//END POINT


app.get('/', (req, res) => {
    res.status(200).render('home.pug')
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
})


app.listen(port , () =>{
    console.log(`Website started at port ${port}`)
})