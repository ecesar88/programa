import { Spinner } from '@blueprintjs/core'

export const Loading = () => {
  return (
    <div className="flex justify-center items-center mx-auto my-auto h-full w-full">
      <Spinner size={100} intent="primary" className="left-[50%]" />
    </div>
  )
}
