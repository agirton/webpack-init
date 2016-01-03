import { spawn } from 'child_process'

export default function installModules({ loaders: modules }) {
  spawn('npm', ['install', '--save-dev', ...modules])
}
