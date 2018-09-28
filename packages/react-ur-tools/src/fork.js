import { fork } from 'child_process'

module.exports = (scriptPath) => {
  const child = fork(scriptPath, process.argv.slice(2))

  child.on('close', (code, signal) => {
    console.log(`[${scriptPath}] Process exited with code=${code}, signal=${signal}`)
  })

  return child
}