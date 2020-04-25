import * as core from '@actions/core'
import {executeDepdencyUpdates} from './gradle'
import {asUpdateText} from './report'

async function run(): Promise<void> {
  try {
    core.info("Executing gradle task 'dependencyUpdates'")
    const directory: string =
      core.getInput('working_directory') || process.cwd()
    const updates = executeDepdencyUpdates(directory)
    const updateText = asUpdateText(await updates)
    const hasUpdates = updateText !== ''

    core.setOutput('has_updates', hasUpdates.toString())
    core.info(`has_updates=${hasUpdates}`)
    core.setOutput('update_text', updateText)
    core.setOutput('update_json', JSON.stringify(updateText))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
