import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import NavBar from './NavBar';
import { ColorMatcherContainer } from './ColorMatcher';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0a2832',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <ColorMatcherContainer />
    </ThemeProvider>
  );
}

export default App;
