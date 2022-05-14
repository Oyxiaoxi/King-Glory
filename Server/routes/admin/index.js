module.exports = app => {
  const express = require('express')
  const router = express.Router() // 创建子路由实例
  const Category = require('../../models/Category')

  router.post('/categorise', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.get('/categorise', async (req, res) => {
    const iterms = await Category.find().limit(10)
    res.send(iterms)
  })

  app.use('/admin/api', router)
}
