import { outputConfig } from '../src/handleAnswers.js';

describe('Correct answers', () => {
  it('should output proper format based on answer', () => {
    answerList.forEach((answer,index) => {
      const config = outputConfig(answer);
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
