import * as React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

export const Loader = props => {
  const { className, style } = props
  const baseStyle = {
    width: '100%',
    display: 'flex'
  }

  return (
    <div style={{ ...baseStyle, ...style }} className={className}>
      <div style={{ margin: 'auto' }}>
        <CircularProgress />
      </div>
    </div>
  )
}
