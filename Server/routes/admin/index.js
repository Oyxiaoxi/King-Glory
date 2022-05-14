module.exports = app => {
  const express = require('express')
  const router = express.Router() // 创建子路由实例
  const Category = require('../../models/Category')

  router.post('/categorise', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.put('/categorise/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.get('/categorise', async (req, res) => {
    const iterms = await Category.find().limit(10)
    res.send(iterms)
  })
  router.get('/categorise/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api', router)
}
