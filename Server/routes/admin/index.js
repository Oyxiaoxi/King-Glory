module.exports = app => {
  const express = require('express')
  const router = express.Router() // 创建子路由实例
  const Category = require('../../models/Category')

  // Create a new category
  router.post('/categorise', async (req, res) => {
    console.log(req.body)
    const model = await Category.create(req.body)
    res.send(model)
  })
  // update category
  router.put('/categorise/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // delete category
  router.delete('/categorise/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })
  // get all categories
  router.get('/categorise', async (req, res) => {
    const iterms = await Category.find().limit(10)
    res.send(iterms)
  })
  // get category by id
  router.get('/categorise/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api', router)
}
