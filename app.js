const express = require('express')
const app = express()
const port = 3000

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

app.use((req, res, next) => {
  const start = process.hrtime()
  const nDate = new Date()
  const year = nDate.getFullYear()
  const month = ("0" + (nDate.getMonth() + 1)).slice(-2)
  const date = ("0" + nDate.getDate()).slice(-2)
  const hour = ("0" + nDate.getHours()).slice(-2)
  const min = ("0" + nDate.getMinutes()).slice(-2)
  const sec = ("0" + nDate.getSeconds()).slice(-2)
  const meg1 = `${year}-${month}-${date} ${hour}:${min}:${sec} | ${req.method} from ${req.url}`
  console.log(meg1)

  res.on('finish', () => {
    const duration = getDurationInMilliseconds(start)
    const meg2 = `${year}-${month}-${date} ${hour}:${min}:${sec} | ${req.method} from ${req.url} | total time: ${duration}ms`
    console.log(meg2)
  })
  
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