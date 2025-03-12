const express = require('express')
const path=require('path')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {pdfMerger} = require('./merger.js')
app.use("/static",express.static('public'))
var uniqid = require('uniqid'); 
let id



const port = 3000

app.get('/', (req, res) => {
  //res.send('Hello World! Nikhil')
  res.sendFile(path.join(__dirname,'./index.html'))
})

app.post('/merge', upload.array('pdfs', 2),async function (req, res, next, id= uniqid()) {
    // console.log(req.files)
    // res.send(req.files)
   await pdfMerger(req.files[0].path,req.files[1].path, id)
    res.redirect(`http://localhost:3000/static/${id}_merged.pdf`)
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
