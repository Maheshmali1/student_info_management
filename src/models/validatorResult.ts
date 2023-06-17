import { type ErrorObject } from 'ajv'

// Validator result type
export interface validatorResult {
  match: boolean
  errors: Array<ErrorObject<string, Record<string, any>, unknown>> | null | undefined
}
