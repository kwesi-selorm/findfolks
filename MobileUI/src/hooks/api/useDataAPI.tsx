import { useQuery } from '@tanstack/react-query'
import { getCities } from '../../api/data-api'
import { queryOptions } from './query-options'

const useDataAPI = () => {
  const { data, error, isLoading, isError } = useQuery(['cities'], getCities, {
    refetchOnWindowFocus: false,
    ...queryOptions
  })

  return { data, error, isLoading, isError }
}

export default useDataAPI
