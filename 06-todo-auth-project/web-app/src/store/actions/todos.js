import * as actionTypes from "./actionTypes";
import axios from "../../shared/axiosInstance";

export const fetchTodosStart = () => {
  return {
    type: actionTypes.FETCH_TODOS_START
  };
};

export const fetchTodosFail = error => {
  return {
    type: actionTypes.FETCH_TODOS_FAIL,
    error: error
  };
};

export const fetchTodosSuccess = todos => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};

export const fetchTodos = () => {
  return async dispatch => {
    dispatch(fetchTodosStart());

    try {
      const response = await axios.get("/todos");
      let todos = response.data.todos;
      if (!todos) {
        throw new Error("No todos returned");
      }
      dispatch(fetchTodosSuccess(todos));
    } catch (e) {
      dispatch(fetchTodosFail(e));
    }
  };
};

export const deleteTodoStart = () => {
  return {
    type: actionTypes.DELETE_TODO_START
  };
};

export const deleteTodoFail = error => {
  return {
    type: actionTypes.DELETE_TODO_FAIL,
    error: error
  };
};

export const deleteTodoSuccess = id => {
  return {
    type: actionTypes.DELETE_TODO_SUCCESS,
    id: id
  };
};

export const deleteTodo = id => {
  return async dispatch => {
    dispatch(deleteTodoStart());
    try {
      const response = await axios.delete(`/todos/${id}`);
      if (!response.data.todo) {
        throw new Error("No data returned");
      }
      dispatch(deleteTodoSuccess(id));
    } catch (e) {
      dispatch(deleteTodoFail(e));
    }
  };
};

export const toggleTodoStart = () => {
  return {
    type: actionTypes.TOGGLE_TODO_START
  };
};

export const toggleTodoFail = error => {
  return {
    type: actionTypes.TOGGLE_TODO_FAIL,
    error: error
  };
};

export const toggleTodoSuccess = id => {
  return {
    type: actionTypes.TOGGLE_TODO_SUCCESS,
    id: id
  };
};

export const toggleTodo = todo => {
  return async dispatch => {
    dispatch(toggleTodoStart());
    try {
      const response = await axios.patch(`/todos/${todo._id}`, todo);
      if (!response.data.todo) {
        throw new Error("No data returned");
      }
      dispatch(toggleTodoSuccess(todo));
    } catch (e) {
      dispatch(toggleTodoFail(e));
    }
  };
};

export const addTodoStart = () => {
  return {
    type: actionTypes.ADD_TODO_START
  };
};

export const addTodoFail = error => {
  return {
    type: actionTypes.ADD_TODO_FAIL,
    error: error
  };
};

export const addTodoSuccess = id => {
  return {
    type: actionTypes.ADD_TODO_SUCCESS,
    id: id
  };
};

export const addTodo = todo => {
  return async dispatch => {
    dispatch(addTodoStart());
    try {
      const response = await axios.post(`/todos/`, todo);
      if (!response.data.todo) {
        throw new Error("No data returned");
      }
      dispatch(addTodoSuccess(todo));
    } catch (e) {
      dispatch(addTodoFail(e));
    }
  };
};

export const updateTodoStart = () => {
  return {
    type: actionTypes.UPDATE_TODO_START
  };
};

export const updateTodoFail = error => {
  return {
    type: actionTypes.UPDATE_TODO_FAIL,
    error: error
  };
};

export const updateTodoSuccess = id => {
  return {
    type: actionTypes.UPDATE_TODO_SUCCESS,
    id: id
  };
};

export const updateTodo = todo => {
  return async dispatch => {
    dispatch(updateTodoStart());
    try {
      const response = await axios.patch(`/todos/${todo._id}`, todo);
      if (!response.data.todo) {
        throw new Error("No data returned");
      }
      dispatch(updateTodoSuccess(todo));
    } catch (e) {
      dispatch(updateTodoFail(e));
    }
  };
};
