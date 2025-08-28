const budgetModel = require('../model/budgetModel')
const expenseModel = require('../model/expenseModel')
const { all } = require('../routes')

module.exports.budget = async (req, res) => {
  try {
    const allExpense = await expenseModel.find()
    const budget = await budgetModel.find()
    console.log(budget);
    
    const totalBudget = budget.length ? budget.map((b)=>b.budget) : 0;
    console.log(totalBudget);

    const sum = allExpense.reduce((acc, curr) => acc + Number(curr.expense), 0);
    console.log(sum);

    
    const leftBudget = totalBudget - sum;



    return res.render('budget', {
      totalBudget,
      allExpense,
      sum,
      leftBudget
    })
  } catch (err) {
    console.log(err);
    return res.redirect('/')

  }
}

module.exports.addBudget = async (req, res) => {
  try {

    await budgetModel.deleteMany({})
    await budgetModel.create(req.body)
    console.log(req.body);
    return res.redirect('/')
  } catch (err) {
    console.log(err);
    return res.redirect('/')

  }

}

module.exports.addExpense = async (req, res) => {
  try {
    await expenseModel.create(req.body)
    console.log(req.body);

    return res.redirect('/')
  }
  catch (err) {
    console.log(err);
    return res.redirect('/')

  }
}

module.exports.delete = async (req, res) => {
  try {
    await expenseModel.findByIdAndDelete(req.params.id)
    console.log(req.params.id);

    return res.redirect('/')
  } catch (err) {
    console.log(err);
    return res.redirect('/')

  }
}

module.exports.allClear = async (req,res) => {
  try{
    await expenseModel.deleteMany({})
  await budgetModel.deleteMany({})
  return res.redirect('/')
  }
  catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}