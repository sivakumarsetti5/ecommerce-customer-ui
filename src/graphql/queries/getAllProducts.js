import { gql } from "@apollo/client"

export const GET_ALL_PRODUCTS = gql`
query GetProducts {
    getProducts {
      _id
      name
      cost
      category
      description
      filePath
    }
  }
`