interface Todo {
  label: string;
  description?: string;
  id?: string;
  isDone: string;
  due: string;
  link: string;
}

interface TodoList {
  name: string;
  id?: string;
  todos: Todo[];
}

interface TodoListCollection {
  todoLists: TodoList[]
}


interface ListItemLinkProps {
  icon?: JSX.Element,
  primary?: JSX.Element,
  to: string
}