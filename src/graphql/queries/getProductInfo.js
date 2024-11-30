import { gql } from "@apollo/client";

export const GET_PRODUCT_INFO = gql`
query GetProductInfo($productId: String) {
  getProductInfo(productId: $productId) {
    _id
    name
    cost
    category
    description
    filePath
  }
}
`