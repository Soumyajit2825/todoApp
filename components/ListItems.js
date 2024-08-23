import React, { useState } from "react";
import { Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Entypo } from "@expo/vector-icons";
import {
  ListView,
  TodoText,
  TodoDate,
  colors,
  ListViewHidden,
  HiddenButton,
  SwipedTodoText,
  Container
} from "../styles/appStyles";

const ListItems = ({ todos, setTodos, handleTriggerEdit,handleDeleteTodo }) => {
  const [swipedRow, setSwipedRow] = useState(null);

  return (
      <Container>
      {!todos || todos.length === 0 && <TodoText>No Todos</TodoText>}
      {todos && todos.length != 0 && (
        <SwipeListView
          data={todos}
          renderItem={(data) => {
            const RowText =
              data.item.key === swipedRow ? SwipedTodoText : TodoText;
            return (
              <ListView
                underlayColor={colors.primary}
                activeOpacity={0.6}
                onPress={() => {
                  handleTriggerEdit(data.item);
                }}
              >
                <>
                  <TodoText>{data.item.title}</TodoText>
                  <TodoDate>{data.item.date}</TodoDate>
                </>
              </ListView>
            );
          }}
          renderHiddenItem={(data, rowMap) => (
            <ListViewHidden>
              <HiddenButton
                onPress={() => handleDeleteTodo(data.item.id)}
              >
                <Entypo name="trash" size={25} color={colors.secondary} />
              </HiddenButton>
            </ListViewHidden>
          )}
          leftOpenValue={75}
          previewRowKey={"1"}
          previewOpenValue={75}
          previewOpenDelay={3000}
          disableLeftSwipe={true}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingBottom: 30,
            marginBottom: 30,
          }}
          onRowOpen={(rowKey) => {
            setSwipedRow(rowKey);
          }}
          onRowClose={() => {
            setSwipedRow(null);
          }}
        />
      )}
    </Container>
  );
};

export default ListItems;
