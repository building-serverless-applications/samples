import React from 'react';
import './App.css';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container maxWidth={false} component="main">
        <Dashboard url='/my/dashboard'></Dashboard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
