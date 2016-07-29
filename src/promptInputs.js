export const base = [
  {
    type: 'input',
    name: 'configFileName',
    message: 'Enter the file name for your webpack config',
    default: () => 'webpack.config.js'
  },
  {
    type: 'input',
    name: 'entry',
    message: 'Enter the filename for your entry',
    default: () => './index.js'
  },
  {
    type: 'input',
    name: 'outputPath',
    message: 'Enter the output path, this is where your images and js will be output at',
    default: () => './'
  },
  {
    type: 'input',
    name: 'outputFilename',
    message: 'Enter the output filename',
    default: () => 'bundle.js'
  },
  {
    type: 'confirm',
    name: 'publicPathRequired',
    message: 'Is your output in a different directory?'
  },
  {
    type: 'input',
    name: 'outputPublicPath',
    message: 'Enter the path to where you will point to in your index.html e.g. /static/',
    when: ({ publicPathRequired }) => publicPathRequired
  },
  {
    type: 'checkbox',
    name: 'loaders',
    message: `What loaders would you like to include?
              Note some loaders may require extra configuration. See
              https://webpack.github.io/docs/list-of-loaders.html`,
    choices: [' babel', ' postcss', ' sass', ' less', ' url']
  }
]
