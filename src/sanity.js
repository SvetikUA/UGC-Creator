import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: '59s6zizo',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
