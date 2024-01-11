// middleware.js
module.exports = (req, res, next) => {
  // 检查是否是使用 POST 方法的删除请求
  if (req.method === 'POST' && req.url.startsWith('/employee/delete')) {
    // 提取要删除的评论的 ID，这里假设请求体中包含一个名为 'commentId' 的参数
    const employeeId = req.body.id
    // 执行删除操作，这里假设你的数据存储在 index.json 文件中
    const db = require('./index.json')
    db.employee = db.employee.filter(employee => employee.id !== employeeId)
    // 保存更新后的数据到 index.json 文件
    const fs = require('fs')
    fs.writeFileSync('./index.json', JSON.stringify(db, null, 2))
    // 返回成功的响应
    res.json({ message: 'Employee deleted successfully' })
  } else if (req.method === 'POST' && req.url.startsWith('/employee/update')) {
    // 提取要修改的数据类型和 ID，以及修改的内容，这里假设请求体中包含名为 'type'、'id' 和 'body' 的参数
    console.log(req.body.id)
    const employeeId = req.body.id
    console.log(req.body.id)
    // 执行修改操作，这里假设你的数据存储在 index.json 文件中
    const db = require('./index.json')
    // 寻找要修改的评论
    const employee = db.employee.find(employee => employee.id === employeeId)
    if (employee) {
    // 更新内容
      employee.name = req.body.name
      employee.sex = req.body.sex
      employee.age = req.body.age
      employee.phone = req.body.phone
      employee.e_mail = req.body.e_mail
      employee.address = req.body.address
      employee.entry_time = req.body.entry_time
      employee.leave_time = req.body.leave_time
      employee.is_regular = req.body.is_regular
      employee.salary_least = req.body.salary_least
      employee.username = req.body.username
      employee.password = req.body.password
    } else {
      res.status(404).json({ error: 'Comment not found' })
      return
    }
    // 保存更新后的数据到 index.json 文件
    const fs = require('fs')
    fs.writeFileSync('./index.json', JSON.stringify(db, null, 2))
    // 返回成功的响应
    res.json({ message: 'Data modified successfully' })
  } else if (req.method === 'POST' && req.url.startsWith('/client/delete')) {
    console.log(req.body.id)
    // 提取要删除的评论的 ID，这里假设请求体中包含一个名为 'commentId' 的参数
    const clientId = req.body.id
    // 执行删除操作，这里假设你的数据存储在 index.json 文件中
    const db = require('./index.json')
    db.client = db.client.filter(client => client.id !== clientId)
    // 保存更新后的数据到 index.json 文件
    const fs = require('fs')
    fs.writeFileSync('./index.json', JSON.stringify(db, null, 2))
    // 返回成功的响应
    res.json({ message: 'client deleted successfully' })
  } else if (req.method === 'POST' && req.url.startsWith('/client/update')) {
    // 提取要修改的数据类型和 ID，以及修改的内容，这里假设请求体中包含名为 'type'、'id' 和 'body' 的参数
    console.log(req.body.id)
    const clientId = req.body.id
    console.log(req.body.id)
    // 执行修改操作，这里假设你的数据存储在 index.json 文件中
    const db = require('./index.json')
    // 寻找要修改的评论
    const client = db.client.find(client => client.id === clientId)
    if (client) {
    // 更新内容
      client.name = req.body.name
      client.qq = req.body.qq
      client.phone = req.body.phone
      client.e_mail = req.body.e_mail
    } else {
      res.status(404).json({ error: 'client not found' })
      return
    }
    // 保存更新后的数据到 index.json 文件
    const fs = require('fs')
    fs.writeFileSync('./index.json', JSON.stringify(db, null, 2))
    // 返回成功的响应
    res.json({ message: 'Data modified successfully' })
  } else {
    // 继续到下一个中间件
    next()
  }
}
