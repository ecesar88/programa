import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  errorInfo?: {
    error?: Error
    info?: ErrorInfo
  }
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo: {
      error: undefined,
      info: undefined
    }
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState((prev) => ({ ...prev, errorInfo: { error, info: errorInfo } }))

    console.error('Uncaught error:', error, errorInfo)

    // Log errors on a text file?
    // logErrorToMyService(error, info.componentStack)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h1>
          Sorry.. there was an error: <br />
          {JSON.stringify(this.state.errorInfo)}
        </h1>
      )
    }

    return this.props.children
  }
}
