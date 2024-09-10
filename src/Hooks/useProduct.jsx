import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useProduct() {
    const res = useQuery({
        queryKey: ["products"],
        queryFn: () =>  axios('https://ecommerce.routemisr.com/api/v1/products'),
        select:(data) => data.data.data,
      })
  return (
    res
  )
}
