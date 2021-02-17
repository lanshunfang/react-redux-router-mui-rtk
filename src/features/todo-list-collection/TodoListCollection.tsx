import { Box, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import styles from './TodoListCollection.module.scss';
import { Add, Inbox } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, NavLink as RouterLink, Prompt } from 'react-router-dom';
import {
  addNewList, selectTodoLists
} from './todoListCollectionSlice';

function ListItemLink(props: ListItemLinkProps) {
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

export function TodoListCollection() {
  const todoLists = useSelector(selectTodoLists);
  const dispatch = useDispatch();

  return (
    <div>

      <Router>
        <Prompt when={true} message="Are you sure" />
        <List aria-label="main mailbox folders">
          {
            todoLists.todoLists.map(list =>
              <ListItemLink key={list.id} primary={
                <span className="label">{list.name}</span>
              } to={`/list/${list.id}`} icon={<Inbox />} />
            )
          }
        </List>
      </Router>
      <Box>
        <Button onClick={() => dispatch(addNewList("New list"))}><Add>Add a new list</Add></Button>
      </Box>

    </div>
  );
}
