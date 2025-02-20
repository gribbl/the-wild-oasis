export interface DtoPaginator<Dto> {
  data: Dto[]
  pagination: {
    total: number
    perPage: number
    currentPage: number
    firstPage: number
    lastPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
  }
}
