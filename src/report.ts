import {OutdatedLibrary} from './result/OutdatedLibrary'
import {EOL} from 'os'

export function toOutdatedLibraries(value: string): OutdatedLibrary[] {
  if (!value) {
    return []
  }
  const outdatedLibaries: OutdatedLibrary[] = []
  const report = JSON.parse(value) as UpdateReport
  for (const dependency of report.outdated.dependencies) {
    const updateInfo = dependency.available
    const update =
      updateInfo.release || updateInfo.milestone || updateInfo.integration
    if (update == null) {
      continue
    }

    const outdatedLibrary = asOutdatedLibrary(dependency, update)

    outdatedLibaries.push(outdatedLibrary)
  }

  return outdatedLibaries
}

export function asUpdateText(outdatedLibaries: OutdatedLibrary[]): string {
  const outputText = outdatedLibaries
    .map(library => asUpdateTextFromLibrary(library))
    .join(EOL)
  return outputText
}

function asUpdateTextFromLibrary(library: OutdatedLibrary): string {
  return `${library.name}: new version ${library.latestVersion}`
}

function asOutdatedLibrary(
  dependency: OutdatedDependency,
  update: string
): OutdatedLibrary {
  const isPluginDependency = dependency.name.endsWith('.plugin')
  const outdatedLibraryName = isPluginDependency
    ? dependency.group
    : `${dependency.group}:${dependency.name}`

  return {
    name: outdatedLibraryName,
    currentVersion: dependency.version,
    latestVersion: update,
    projectUrl: dependency.projectUrl
  }
}
