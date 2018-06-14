import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  todos: [
    {
      _id: 1,
      text: "this is from the reducer"
    }
  ],
  loading: false
};

const fetchTodosStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTodosSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    todos: action.todos
  });
};

const fetchTodosFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const deleteTodoStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteTodoSuccess = (state, action) => {
  const updatedTodos = state.todos.filter(todo => todo._id !== action.id);
  return updateObject(state, {
    loading: false,
    todos: updatedTodos
  });
};

const deleteTodoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const toggleTodoStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const toggleTodoSuccess = (state, action) => {
  let updatedTodos = state.todos.slice();
  let updatedTodoIndex = state.findIndex(todo => todo._id === action.user._id);
  updatedTodos[updatedTodoIndex] = action.user;
  return updateObject(state, {
    loading: false,
    todos: updatedTodos
  });
};

const toggleTodoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODOS_START:
      return fetchTodosStart(state, action);
    case actionTypes.FETCH_TODOS_SUCCESS:
      return fetchTodosSuccess(state, action);
    case actionTypes.FETCH_TODOS_FAIL:
      return fetchTodosFail(state, action);
    case actionTypes.DELETE_TODO_START:
      return deleteTodoStart(state, action);
    case actionTypes.DELETE_TODO_SUCCESS:
      return deleteTodoSuccess(state, action);
    case actionTypes.DELETE_TODO_FAIL:
      return deleteTodoFail(state, action);
    case actionTypes.TOGGLE_TODO_START:
      return toggleTodoStart(state, action);
    case actionTypes.TOGGLE_TODO_SUCCESS:
      return toggleTodoSuccess(state, action);
    case actionTypes.TOGGLE_TODO_FAIL:
      return toggleTodoFail(state, action);
    default:
      return state;
  }
};

export default reducer;
