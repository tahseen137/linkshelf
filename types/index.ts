export interface Link {
  id: string
  url: string
  title: string
  collectionId?: string
  createdAt: string
}

export interface Collection {
  id: string
  name: string
  isPublic: boolean
  createdAt: string
}
