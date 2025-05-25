export interface IDatabaseConfig {
  getDabaseHost(): string
  getDatabsePort(): number
  getDatabaseUserName(): string
  getDatabasePassword(): string
  getDatabaseName(): string
}
