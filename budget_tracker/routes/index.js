const express = require('express')

const routes = express.Router()

const budgetCtrl = require('../controller/budgetCtrl')

routes.get('/',budgetCtrl.budget)
routes.post('/addBudget',budgetCtrl.addBudget)
routes.post('/addExpense',budgetCtrl.addExpense)
routes.get('/delete/:id',budgetCtrl.delete)
routes.get('/allClear',budgetCtrl.allClear)

module.exports = routes 