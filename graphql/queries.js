import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      date
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $date: date!) {
    insert_todos_one(object: { title: $title, date: $date }) {
      id
      title
      date
    }
  }
`;

export const EDIT_TODO = gql`
  mutation EditTodo($id: Int!, $title: String!, $date: date!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, date: $date }
    ) {
      id
      title
      date
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;
