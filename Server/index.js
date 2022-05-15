const express = require('express')
// const cors = require('cors')
const app = express()

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin','http://localhost:3333'); // 当允许携带cookies此处的白名单不能写’*’
  res.header('Access-Control-Allow-Headers','Content-Type, AccessToken, X-CSRF-Token, Authorization, Token'); // 允许的请求头
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, UPDATE'); // 允许的请求方法
  res.header('Access-Control-Expose-Headers', 'Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type'); // 设置响应头
  res.header('Access-Control-Allow-Credentials', true);  // 允许携带cookies
  next();
});

// 中间件引用
// app.use(cors())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
