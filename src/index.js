import { prompt } from 'inquirer'
import { base } from './promptInputs'
import handleAnswers from './handleAnswers'

prompt(base, handleAnswers)
