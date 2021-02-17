// import 'fontsource-roboto';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { TodoList, TodoListCollection } from 'features/todo-list-collection';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AppTopBar from './AppTopBar';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <AppTopBar />

        <Grid container spacing={3}>

          <Grid item sm={12} lg={3}>
            <Paper><TodoListCollection /></Paper>
          </Grid>

          <Grid item sm={12} lg={9}>
            <Router>
              <Switch>
                <Route path="/list/:id" component={TodoList}></Route>
              </Switch>

            </Router>
          </Grid>

        </Grid>


      </Container>
    </React.Fragment>
  );
}

export default App;
