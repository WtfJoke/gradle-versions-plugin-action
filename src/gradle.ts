import {exec} from '@actions/exec'
import {OutdatedLibrary} from './result/OutdatedLibrary'
import {join} from 'path'
import {ExecOptions} from '@actions/exec/lib/interfaces'
import {toOutdatedLibraries} from './report'

export async function executeDepdencyUpdates(
  directory: string
): Promise<OutdatedLibrary[]> {
  const gradle = process.platform === 'win32' ? 'gradlew' : './gradlew'

  const gradleExecOptions: ExecOptions = {}
  gradleExecOptions.cwd = directory

  await exec(
    gradle,
    ['dependencyUpdates', '-DoutputFormatter=json'],
    gradleExecOptions
  )

  const reportPath = join('build', 'dependencyUpdates', 'report.json')
  let dependencyUpdatesOutput = ''

  const execOptions: ExecOptions = {}
  execOptions.cwd = directory
  execOptions.listeners = {
    stdout: (data: Buffer) => {
      dependencyUpdatesOutput += data.toString()
    }
  }
  await exec('cat', [reportPath], execOptions)
  return toOutdatedLibraries(dependencyUpdatesOutput)
}
