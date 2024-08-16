import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODOS,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from "../graphql/queries";
import { ModalContainer } from "../styles/appStyles";
import Header from "./Header";
import ListItems from "./ListItems";
import InputModal from "./InputModal";

const Home = () => {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [editTodo] = useMutation(EDIT_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todoToBeEdited, setTodoToBeEdited] = useState(null);

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
    }
  }, [data]);

  const handleAddTodo = async (todo) => {
    await addTodo({
      variables: { title: todo.title, date: todo.date },
    });
    refetch();
    setModalVisible(false);
  };

  const handleEditTodo = async (editedTodo) => {
    await editTodo({
      variables: {
        id: editedTodo.id,
        title: editedTodo.title,
        date: editedTodo.date,
      },
    });
    refetch();
    setTodoToBeEdited(null);
    setModalVisible(false);
  };

  const handleDeleteTodo = async (id) => {
    console.log("Deleting todo with id:", id);
    try {
      await deleteTodo({
        variables: { id },
      });
      console.log("Todo deleted successfully");
      refetch();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleTriggerEdit = (item) => {
    // console.log("Editing todo:", item);
    setTodoToBeEdited(item);
    setModalVisible(true);
    setTodoInputValue(item.title);
  };

  const handleClearTodos = () => {
    todos.forEach((todo) => handleDeleteTodo(todo.id));
  };

  if (loading)
    return (
      <ModalContainer>
        <Text>Loading...</Text>
      </ModalContainer>
    );
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Header handleClearTodos={handleClearTodos} />
      <ListItems
        todos={todos}
        setTodos={setTodos}
        handleTriggerEdit={handleTriggerEdit}
        handleDeleteTodo={handleDeleteTodo}
      />
      <InputModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        todoInputValue={todoInputValue}
        setTodoInputValue={setTodoInputValue}
        handleAddTodo={handleAddTodo}
        todoToBeEdited={todoToBeEdited}
        setTodoToBeEdited={setTodoToBeEdited}
        handleEditTodo={handleEditTodo}
        todos={todos}
      />
    </>
  );
};

export default Home;
