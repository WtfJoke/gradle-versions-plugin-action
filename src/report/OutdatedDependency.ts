interface OutdatedDependency {
  readonly group: string
  readonly available: AvailableDependency
  readonly version: string
  readonly projectUrl: string | null
  readonly name: string
}
