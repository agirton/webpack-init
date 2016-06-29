import { spawn } from 'child_process'

export default function installModules({ module }) {
  spawn('npm', ['install', '--save-dev', ...module])
}
