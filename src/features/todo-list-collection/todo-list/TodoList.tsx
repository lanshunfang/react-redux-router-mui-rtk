import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink as RouterLink, Redirect } from 'react-router-dom';
import { ReactRouter } from 'typings';
import { Todo } from '../typing';
import { TodoListNewTodo } from './TodoListNewTodo';
import { selectTodo } from './todoListSlice';
export { todoListSliceReducer } from './todoListSlice';

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

export function TodoList({ match }: ReactRouter.RouteComponentProps<Todo.TodoListProps>) {

  // const dispatch = useDispatch();

  const todoList: Todo.TodoList | undefined = useSelector(
    selectTodo(
      () => match.params
    )
  );

  if (!todoList) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div>
      <Typography variant="h2"><span className="todo-list-name">{todoList.name}</span></Typography>
      <TodoListNewTodo />
      <List aria-label="main mailbox folders">
        {
          todoList.todos.map(todo =>
            <ListItemLink key={todo.id} primary={
              <span className="label">{todo.label}</span>
            } to={`./${todo.id}`} />
          )
        }
      </List>

    </div>
  );
}
