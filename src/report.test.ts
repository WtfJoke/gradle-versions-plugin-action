import {toOutdatedLibraries} from './report'

test('with valid json expect outdated library can be parsed', async () => {
  const outdatedLibraries = toOutdatedLibraries(dependencyUpdatesJson)

  expect(outdatedLibraries.length).toBe(2)

  const anOutdatedLibrary = outdatedLibraries[1]
  expect(anOutdatedLibrary.name).toBe('de.codecentric:chaos-monkey-spring-boot')
  expect(anOutdatedLibrary.currentVersion).toBe('2.1.1')
  expect(anOutdatedLibrary.latestVersion).toBe('2.2.0')
  expect(anOutdatedLibrary.projectUrl).toBe(
    'https://github.com/codecentric/chaos-monkey-spring-boot/chaos-monkey-dependencies/chaos-monkey-spring-boot'
  )
})

test('with valid json expect outdated plugin can be parsed', async () => {
  const outdatedLibraries = toOutdatedLibraries(dependencyUpdatesJson)

  expect(outdatedLibraries.length).toBe(2)
  const anOutdatedPlugin = outdatedLibraries[0]
  expect(anOutdatedPlugin.name).toBe('com.github.ben-manes.versions')
  expect(anOutdatedPlugin.currentVersion).toBe('0.27.0')
  expect(anOutdatedPlugin.latestVersion).toBe('0.28.0')
  expect(anOutdatedPlugin.projectUrl).toBeNull()
})

const dependencyUpdatesJson = `{
  "current": {
      "dependencies": [{
          "group": "com.nhaarman.mockitokotlin2",
          "version": "2.2.0",
          "projectUrl": "https://github.com/nhaarman/mockito-kotlin",
          "name": "mockito-kotlin"
      }],
      "count": 1
  },
  "gradle": {
      "current": {
          "version": "6.3",
          "reason": "",
          "isUpdateAvailable": true,
          "isFailure": false
      },
      "nightly": {
          "version": "",
          "reason": "update check disabled",
          "isUpdateAvailable": false,
          "isFailure": false
      },
      "enabled": true,
      "releaseCandidate": {
          "version": "",
          "reason": "update check succeeded: no release available",
          "isUpdateAvailable": false,
          "isFailure": false
      },
      "running": {
          "version": "6.0.1",
          "reason": "",
          "isUpdateAvailable": false,
          "isFailure": false
      }
  },
  "exceeded": {
      "dependencies": [

      ],
      "count": 0
  },
  "outdated": {
      "dependencies": [{
              "group": "com.github.ben-manes.versions",
              "available": {
                  "release": null,
                  "milestone": "0.28.0",
                  "integration": null
              },
              "version": "0.27.0",
              "projectUrl": null,
              "name": "com.github.ben-manes.versions.gradle.plugin"
          },
          {
              "group": "de.codecentric",
              "available": {
                  "release": null,
                  "milestone": "2.2.0",
                  "integration": null
              },
              "version": "2.1.1",
              "projectUrl": "https://github.com/codecentric/chaos-monkey-spring-boot/chaos-monkey-dependencies/chaos-monkey-spring-boot",
              "name": "chaos-monkey-spring-boot"
          }
      ],
      "count": 2
  },
  "unresolved": {
      "dependencies": [

      ],
      "count": 0
  },
  "count": 3
}`
