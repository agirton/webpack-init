import {outputConfig} from '../src/handleAnswers.js';

describe('Correct answers', () => {
  it('should have correct ans', () => {
    let config;
    answerList.forEach((answer,index) => {
      config = outputConfig(answer);
      const key = Object.keys(expectedConfigList[index])[0];
      const val = expectedConfigList[index][key];
      expect(config[key]).toEqual(val);
    });
  })
})

const answerList = [
  {entry: './index.js'},
  {outputPath: './', outputFilename: 'bundle.js'}
]

const expectedConfigList = [
  {entry: './index.js'},
  {output: {path: './', filename: 'bundle.js'}}
]