import {exec} from '@actions/exec'
import {OutdatedLibrary} from './result/OutdatedLibrary'
import {join} from 'path'
import {ExecOptions} from '@actions/exec/lib/interfaces'
import {toOutdatedLibraries} from './report'

export async function executeDepdencyUpdates(): Promise<OutdatedLibrary[]> {
  const gradle = process.platform === 'win32' ? 'gradlew' : './gradlew'

  await exec(gradle, ['dependencyUpdates', '-DoutputFormatter=json'])

  const reportPath = join('build', 'dependencyUpdates', 'report.json')
  let dependencyUpdatesOutput = ''

  const execOptions: ExecOptions = {}
  execOptions.listeners = {
    stdout: (data: Buffer) => {
      dependencyUpdatesOutput += data.toString()
    }
  }
  await exec('cat', [reportPath], execOptions)
  return toOutdatedLibraries(dependencyUpdatesOutput)
}
