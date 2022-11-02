import React from 'react'
import axios from 'axios'

const useFetch = () => {
  const [data, setData] = React.useState<object | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const request = React.useCallback( async (url: string) => {
    let json: null | object = null

    try {
      setError(null)
      setLoading(true)
      const response = await axios.get(url);
      json = response.data
    } catch(err) {
      json = null
       setError((err as DOMException).message) 
    } finally {
      setData(json)
      setLoading(false)
      return json
    }
  }, [])

  return {
    data,
    loading,
    error,
    request,
  }
}

export default useFetch