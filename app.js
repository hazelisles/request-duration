const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
  const nDate = new Date()
  const year = nDate.getFullYear()
  const month = ("0" + (nDate.getMonth() + 1)).slice(-2)
  const date = ("0" + nDate.getDate()).slice(-2)
  const hour = ("0" + nDate.getHours()).slice(-2)
  const min = ("0" + nDate.getMinutes()).slice(-2)
  const sec = ("0" + nDate.getSeconds()).slice(-2)
  const meg = `${year}-${month}-${date} ${hour}:${min}:${sec} | ${req.method} from ${req.url}`
  console.log(meg)
  next()
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
 
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})