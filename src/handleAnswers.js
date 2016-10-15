import { compose, either, flatten, identity, map, pick } from 'ramda'
import { writeFileSync } from 'fs'
import stringify from 'stringify-object'
import loaderConfig from './loaderConfig'
import installModules from './installModules'

RegExp.prototype.toJSON = RegExp.prototype.toString

// makeEntry :: Object -> Object
// extend answers object with entry
const makeEntry = (x) => ({
  ...x,
  initialEntry: x.entry, // Using this for loaderConfig
  entry: x.entry
})

// createInitialOutputObj :: Object -> Object
// extend answers object with output object
const createInitialOutputObj = (x) => ({
  ...x,
  output: {
    path: x.outputPath,
    filename: x.outputFilename
  }
})

// createPublicProp :: Object -> Boolean | Object
// if publicPathRequired output object with publicPath prop
const createPublicProp = (x) => (x.publicPathRequired && {
  ...x,
  output: {
    ...x.output,
    publicPath: x.outputPublicPath
  }
})

// loadersMap :: Object -> String -> Object
const loadersMap = (config) => (x) => (config[x.trim()])

// createLoadersConfig :: Object -> Object
// extend answers object with mapped loader configs
const createLoadersConfig = (x) => ({
  ...x,
  module: {
    loaders: map(loadersMap(loaderConfig(x.initialEntry)), x.loaders)
  }
})

// grab only these properties out of our answers object
const finalProps = pick(['entry', 'output', 'module'])

// outputConfig :: Answers -> Object
export const outputConfig = compose(
  finalProps,
  createLoadersConfig,
  either(createPublicProp, identity),
  createInitialOutputObj,
  makeEntry
)

// writeFinalAnswersAndTxtFile :: Object -> Object
// return final object so we can compose if needed
const writeFinalAnswersAndTxtFile = (answers) => (final) => {
  writeFileSync(answers.configFileName, final)
  return final
}

// fileTemplate :: String -> String
const fileTemplate = (code) => (
`module.exports = ${code}`
)

// mapLoaders :: Object -> [String]
const mapLoaders = (xs) => (
  map(({modules}) => modules, xs.loaders)
)

// removeModulesFromLoaders :: Object -> Object
// remove modules prop so we don't include in final output
const removeModulesFromLoaders = (x) => ({
  ...x,
  module: {
    loaders: map(pick(['test', 'loaders', 'include', 'query']), x.module.loaders)
  }
})

export default (answers) => {
  const final = outputConfig(answers)

  // install modules
  compose(
    installModules(answers.configFileName),
    map(flatten),
    map(mapLoaders),
    pick(['module'])
  )(final)

  const output = fileTemplate(stringify(removeModulesFromLoaders(final), {
    indent: '  '
  }))
  writeFinalAnswersAndTxtFile(answers)(output)
}
