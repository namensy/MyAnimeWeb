import { Dispatch, SetStateAction } from 'react'

export interface SearchProps {
  searchTerm: string | string[]
  setSearchTerm: Dispatch<SetStateAction<string | string[]>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  addBookmark: (animeId: number, animeTitle: string, animeImage: string) => {}
  bookmarks: Bookmarks[]
}

export interface Bookmarks {
  firebaseId: string
  id: number
  title: string
  image: string
}

export interface Root {
  data: AnimeItems
}

export interface AnimeItems {
  mal_id: number
  url: string
  images: Images
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: Broadcast
  producers: Producer[]
  licensors: any[]
  studios: Studio[]
  genres: Genre[]
  explicit_genres: any[]
  themes: Theme[]
  demographics: any[]
}

export interface Images {
  jpg: Jpg
  webp: Webp
}

export interface Jpg {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Webp {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
  images: Images2
}

export interface Images2 {
  image_url: string
  small_image_url: string
  medium_image_url: string
  large_image_url: string
  maximum_image_url: string
}

export interface Title {
  type: string
  title: string
}

export interface Aired {
  from: string
  to: string
  prop: Prop
  string: string
}

export interface Prop {
  from: From
  to: To
}

export interface From {
  day: number
  month: number
  year: number
}

export interface To {
  day: number
  month: number
  year: number
}

export interface Broadcast {
  day: string
  time: string
  timezone: string
  string: string
}

export interface Producer {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Studio {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Theme {
  mal_id: number
  type: string
  name: string
  url: string
}

// Compare this snippet from src/types/relatedTypes.ts:

export interface Daum {
  relation: string
  entry: Entry[]
}

export interface Entry {
  mal_id: number
  type: string
  name: string
  url: string
}
