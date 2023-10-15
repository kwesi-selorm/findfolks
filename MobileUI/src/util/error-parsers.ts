import { ZodError } from 'zod'

interface ErrorData {
  message: string
  status: number
}

export type ZodErrorData = {
  path: string | number
  pathMessage: string
}
export type ParsedZodError = {
  message: string
  data: Array<ZodErrorData>
}

function trimPeriod(str: string): string {
  return str.replace(/\.$/, '')
}

function parseAPIError(error: any): ErrorData {
  if (error == null) {
    return {
      message: 'Unknown error',
      status: 500
    }
  }

  if (error.name === 'AxiosError' && error.response) {
    if (error.response.data.detail) {
      const { detail, status, title } = error.response.data
      return {
        message: `${title}: ${detail} (${status})`,
        status
      }
    }

    if (error.response.data.errors) {
      const { errors, title, status } = error.response.data
      const errorMsgs = Object.values(errors)
        .flat()
        .map((msg) => trimPeriod(msg as string))
        .join(', ')
      return {
        message: `${trimPeriod(title as string)}: ${errorMsgs} (${status})`,
        status
      }
    }

    return {
      message: error.message,
      status: error.response.status
    }
  }

  if (error instanceof Error) {
    return { message: error.message, status: 500 }
  }

  return { message: JSON.stringify(error), status: 500 }
}

function parseZodError(error: ZodError): ParsedZodError {
  const { message, errors } = error
  const data = errors.map((e) => ({ path: e.path[0], pathMessage: e.message }))
  return { message, data }
}

export { parseAPIError, parseZodError }
