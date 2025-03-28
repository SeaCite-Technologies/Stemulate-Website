import React from "react"
import { useLocation } from "react-router-dom"

export const useQueryParams = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export const useReturnToParam = () => {
  const queryParams = useQueryParams()
  const returnTo = queryParams.get("returnTo")

  return returnTo
}
