import { AxiosError } from 'axios'

interface ErrorData {
  message: string
  status: number
}
type Errors = {
  [key: string]: string[]
}

class APIError {
  errors: Errors = {}
  status: number = 500
  title: string = ''
  traceId: string = ''
  type: string = ''
}

function trimPeriod(str: string): string {
  return str.replace(/\.$/, '')
}

function parseError(error: unknown): ErrorData {
  if (error instanceof AxiosError && error.response) {
    if (!error.response.data) {
      return {
        message: error.message,
        status: error.response.status
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
    } else {
      const { detail, status, title } = error.response.data
      return {
        message: `${title}: ${detail} (${status})`,
        status
      }
    }
  }

  if (error instanceof Error) {
    return { message: error.message, status: 500 }
  }
  return { message: JSON.stringify(error), status: 500 }
}

export { parseError }
