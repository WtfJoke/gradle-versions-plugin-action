import {exec} from '@actions/exec'
import {OutdatedLibrary} from './result/OutdatedLibrary'
import {join, resolve} from 'path'
import {ExecOptions} from '@actions/exec/lib/interfaces'
import {toOutdatedLibraries} from './report'
import * as core from '@actions/core'

export async function executeDepdencyUpdates(
  directory: string
): Promise<OutdatedLibrary[]> {
  const cwd = directory ? resolve(directory) : undefined
  core.info(`Directory: ${cwd}`)
  const gradle = process.platform === 'win32' ? 'gradlew' : './gradlew'

  const gradleExecOptions: ExecOptions = {}
  gradleExecOptions.cwd = cwd

  await exec(
    gradle,
    ['dependencyUpdates', '-DoutputFormatter=json'],
    gradleExecOptions
  )

  const reportPath = join('build', 'dependencyUpdates', 'report.json')
  let dependencyUpdatesOutput = ''

  const execOptions: ExecOptions = {}
  execOptions.cwd = cwd
  execOptions.listeners = {
    stdout: (data: Buffer) => {
      dependencyUpdatesOutput += data.toString()
    }
  }
  await exec('cat', [reportPath], execOptions)
  return toOutdatedLibraries(dependencyUpdatesOutput)
}
