import { Dispatch, SetStateAction } from 'react';

export interface SearchProps {
  searchTerm: string | string[]
  setSearchTerm: Dispatch<SetStateAction<string | string[]>>;
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface AnimeItems {
  mal_id: boolean
  images: {
    jpg: {
      image_url: string
    }
  }
  title: string
}