export interface OutdatedLibrary {
  readonly name: string
  readonly currentVersion: string
  readonly latestVersion: string
  readonly projectUrl: string | null
}
