export interface Root {
  data: CharacterItems[]
}

export interface CharacterItems {
  character: Daum
  role: string
  voice_actors: VoiceActor[]
}

export interface Daum {
  mal_id: number
  url: string
  images: Images
  name: string
}

export interface Images {
  jpg: Jpg
  webp: Webp
}

export interface Jpg {
  image_url: string
  small_image_url: string
}

export interface Webp {
  image_url: string
  small_image_url: string
}

export interface VoiceActor {
  person: Person
  language: string
}

export interface Person {
  mal_id: number
  url: string
  images: Images2
  name: string
}

export interface Images2 {
  jpg: Jpg2
}

export interface Jpg2 {
  image_url: string
}
