// Flux Standard Action
export interface FSA<P, M> {
  type: string
  payload?: P
  error?: boolean
  meta: M
}

export interface IProcessState {
  isLoading?: boolean

  isSaving?: boolean

  isDeleting?: boolean
  error?: string
}
