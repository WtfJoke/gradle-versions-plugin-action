import {OutdatedLibrary} from './result/OutdatedLibrary'

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

    const outdatedLibrary: OutdatedLibrary = asOutdatedLibrary(
      dependency,
      update
    )

    outdatedLibaries.push(outdatedLibrary)
  }

  return outdatedLibaries
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
