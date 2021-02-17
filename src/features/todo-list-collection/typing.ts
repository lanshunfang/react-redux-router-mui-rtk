export namespace Todo {

  export interface Todo {
    label: string;
    description?: string;
    id?: string;
    isDone?: string;
    due?: string;
    link?: string;
  }
  
  export interface TodoList {
    name: string;
    id?: string;
    todos: Todo[];
  }
  
  export interface TodoListCollection {
    todoLists: TodoList[]
  }
  
  
  export interface ListItemLinkProps {
    icon?: JSX.Element,
    primary?: JSX.Element,
    to: string
  }
  
  export interface TodoListProps {
    id: string
  }
}
