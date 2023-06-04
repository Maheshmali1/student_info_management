import { ErrorObject } from "ajv"

// Validator result type
export type validatorResult={
    match: boolean;
    errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
}
