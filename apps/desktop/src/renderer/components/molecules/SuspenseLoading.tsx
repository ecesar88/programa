import { useEffect, useState } from 'react'
import { Loading } from './Loading'

export const SuspenseLoading = (props: { isLoading: boolean }) => {
  const [show, setShow] = useState(false)

  // useEffect(() => {
  //   console.log('props.isLoading >>', props.isLoading)
  //   if (!props.isLoading) {
  //     setTimeout(() => {
  //       setShow(false)
  //     }, 2000)
  //   }
  // }, [props.isLoading])

  return props.isLoading ? (
    <div className="bg-light-gray5 bg-opacity-80 absolute z-50 inset-0 rounded-md">
      <Loading />
    </div>
  ) : null
}
