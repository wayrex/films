export interface Actor {
  "@type": string
  name: string
  sameAs: string
  image: string
}

export interface AggregateRating {
  "@type": string
  bestRating: string
  description: string
  name: string
  ratingCount: number
  ratingValue: string
  reviewCount: number
  worstRating: string
}

export interface Author {
  "@type": string
  name: string
  sameAs: string
  image: string
}

export interface Director {
  "@type": string
  name: string
  sameAs: string
  image: string
}

export interface RottenTomatoesMetadataInterface {
  "@context": string
  "@type": string
  actors: Actor[]
  aggregateRating: AggregateRating
  author: Author[]
  character: string[]
  contentRating: string
  dateCreated: string
  dateModified: string
  datePublished: any
  director: Director[]
  genre: string[]
  image: string
  name: string
  url: string
}