test('parse valid json', async () => {
  expect(dependencyUpdatesJson).not.toEqual('')
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
