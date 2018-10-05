import * as React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MainMenu } from 'layout/menu/MainMenu'

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17355
export class AppLayout extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MainMenu />
        {this.props.children}
      </React.Fragment>
    )
  }
}
