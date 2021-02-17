import { Box, Button, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import styles from './TodoList.module.scss';
import { Add } from '@material-ui/icons';
import { RootState } from 'app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, NavLink as RouterLink, Prompt } from 'react-router-dom';
import { ReactRouter } from 'typings';
import { Todo } from '../typing';
import {
  addNewTodo
} from './todoListSlice';


function ListItemLink(props: Todo.ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink activeClassName="selected" to={to} ref={() => ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export function TodoList({ match }: ReactRouter.RouteComponentProps<string>) {

  const dispatch = useDispatch();

  let id = match.params;

  const todoList: Todo.TodoList | undefined = useSelector(
    (state: RootState) => state.todoListCollection.todoLists.find(todo => todo.id === id)
  );

  if (!todoList) {
    return (
      <section>
        <h2>The not found!</h2>
      </section>
    )
  }

  return (
    <div>
      <Typography variant="h2"><span className="todo-list-name">{todoList.name}</span></Typography>
      <Router>
        <Prompt when={true} message="Are you sure" />
        <List aria-label="main mailbox folders">
          {
            todoList.todos.map(todo =>
              <ListItemLink key={todo.id} primary={
                <span className="label">{todo.label}</span>
              } to={`./${todo.id}`} />
            )
          }
        </List>
      </Router>
      <Box>
        <Button onClick={() => dispatch(addNewTodo("New Todo"))}><Add>Add a new list</Add></Button>
      </Box>

    </div>
  );
}
