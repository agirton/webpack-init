/*eslint no-console: off */

import { spawn } from 'child_process'
import { renameSync } from 'fs'
import { join } from 'path'
import pathExists from 'path-exists'

export default function installModules(configFileName) {
  return ({module}) => {
    const webpackConfigExists = pathExists.sync(join(configFileName))
    if (webpackConfigExists) {
      renameSync(join(configFileName), join(`old.${configFileName}`))
    }

    console.log(`Installing ${module.join(' ')} from npm...`)
    console.log()

    const args = ['install', '--save-dev', ...module].filter(e => e)
    const proc = spawn('npm', args, {stdio: 'inherit'})

    proc.on('exit', code => {
      if (code === 0) {
        console.error(`npm ${args.join(' ')} failed`)
        return;
      }

      console.log()
      console.log(`Success! Created ${configFileName}`)

      if (webpackConfigExists) {
        console.log()
        console.log(`You had an existing ${configFileName} file, we renamed it to old.${configFileName}`)
      }
    })
  }
}
