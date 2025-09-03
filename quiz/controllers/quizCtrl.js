const quizModel = require('../models/quizModel')
const session = require('express-session')

module.exports.addQuiz = async(req,res) =>{
  try{
    return res.render('add')
  }catch(err){
    console.log(err);
    return res.redirect('/')
  }
}

module.exports.add = async(req,res) => {
  try{
    console.log(req.body);

    req.body.options = [req.body.option1 , req.body.option2 , req.body.option3 , req.body.option4 ]
    await quizModel.create(req.body)
    return res.redirect('/addQuiz')
    
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}

module.exports.startQuiz = async(req,res) =>{
  try{
    const questions = await quizModel.find()
    console.log(questions);
    
    let index = 0;

    let currentQuestion = questions[index]

    let total = questions.length;

    let count = 0;

    return res.render('startQuiz',{
      index,
      currentQuestion,
      total,
      count
    })
  
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}

module.exports.nextQuestion =  async(req,res) => {
  try{  
    const questions = await quizModel.find()

    const index = parseInt(req.params.index);

    let count = parseInt(req.params.count)

    let answer = req.body.answer
    let previousQuestion = questions[index-1]

    if(answer == previousQuestion.ans){
      count++;
    }

    const currentQuestion = questions[index]

    const total = questions.length

    if(index >= total){
      return res.render('score',{
        count,
        total
      })

    }

    return res.render('startQuiz',{
      index,
      currentQuestion,
      total,
      count
    })

  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}

module.exports.score = async(req,res)=>{
  try{
    return res.render('score')
  }catch(err){
    console.log(err);
    return res.render('/')
  }
}