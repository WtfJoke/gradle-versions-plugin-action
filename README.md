![build-test](https://github.com/WtfJoke/gradle-versions-plugin-action/workflows/build-test/badge.svg)

# Gradle Versions Plugin Github Action
An Action for using [Gradle Versions Plugin](https://github.com/ben-manes/gradle-versions-plugin) results in other github actions.


## Usage
```yaml
- uses: WtfJoke/gradle-versions-plugin-action@v1
  id: versionsaction # any name for referencing in steps.<anyname>.outputs
- name: Echo Action output
      run: |
        echo has_update: "${{ steps.versionsaction.outputs.has_updates }}"
        echo update_text: "${{ steps.versionsaction.outputs.update_text }}"
```

### Note
This action must be executed after [setup-java](https://github.com/actions/setup-java) action. 
The [Gradle Versions Plugin](https://github.com/ben-manes/gradle-versions-plugin) needs to be added as dependency in the project (if not already done).

### Example with Slack

```yaml
name: Check for Dependency Updates
on: 
  schedule:
    - cron: '0 8 * * 3' # every wednesday 08:00
  checkUpdates: 
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up JDK 11
      uses: actions/setup-java@v1
      with:
        java-version: 11
    - uses: WtfJoke/gradle-versions-plugin-action@v1
      id: versionsaction
    - name: Post to Slack
      uses: 8398a7/action-slack@v3
      if: steps.versionsaction.outputs.has_updates == 'true'
      with:
        status: ${{ job.status }}
        text: ${{ steps.versionsaction.outputs.update_text }}
        author_name: GitHub Action Update Checker
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

</br>
## Contributing / Author Notes
### How to distribute this action
#### Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run pack
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

#### Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
