import React from 'react';
import './App.css';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container maxWidth={false}>
        <Grid container justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={6}><Card>
            <CardActionArea>
            <CardMedia component='img' alt='Knative logo' image='https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png'></CardMedia>
            <CardContent><h2>First item</h2>
            
            Some info
            </CardContent>
            </CardActionArea>
            <CardActions><Button size='small'>Get Info</Button></CardActions>
            </Card></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
