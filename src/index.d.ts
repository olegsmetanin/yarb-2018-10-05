declare var process: {
  env: {
    NODE_ENV: string
  }
}

declare module '*.png' {
  const value: any
  export = value
}

declare module '*.css'
