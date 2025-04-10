import { Dispatch, SetStateAction } from 'react';

export interface SearchProps {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string | string[]>>;
}