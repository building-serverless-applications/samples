import React from 'react';
import './App.css';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider theme={createTheme({})}>
      <CssBaseline enableColorScheme />
      <Container maxWidth={false}>
        <Dashboard url='/my/dashboard'></Dashboard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
