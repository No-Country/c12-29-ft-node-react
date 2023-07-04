import { useRouteError } from "react-router-dom"

const NotFound = () => {
    
    const error = useRouteError()

  return (
    <div>
        <p>{error.status}</p>
        <p>{error.statusText}</p>
    </div>
  )
}

export default NotFound