import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../shared/axiosInstance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Todos.css";

class Todos extends Component {
  componentDidMount() {
    this.props.onFetchTodos();
  }

  deleteMessage = id => {
    this.props.onDeleteTodo(id);
  };

  toggleTodoComplete = id => {
    const todo = this.props.todos.filter(todo => todo._id === id)[0];
    todo.completed = !todo.completed;
    this.props.onToggleTodo(todo);
  };

  updateMessage = async id => {
    this.props.history.push(`/update-todo/${id}`);
  };

  render() {
    let todos = <Spinner />;

    if (!this.props.loading) {
      todos = this.props.todos.map(todo => (
        <li key={todo._id}>
          {todo._id + " - " + todo.text}
          <button
            onClick={() => {
              this.toggleTodoComplete(todo._id);
            }}
          >
            {todo.completed ? "Incomplete" : "Complete"}
          </button>
          <button
            onClick={() => {
              this.updateMessage(todo._id);
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              this.deleteMessage(todo._id);
            }}
          >
            Delete
          </button>
        </li>
      ));
    }

    return (
      <div className={classes.Todos}>
        <h1>List of todos</h1>
        <ul>{todos}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    loading: state.todos.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodos: () => dispatch(actions.fetchTodos()),
    onDeleteTodo: _id => dispatch(actions.deleteTodo(_id)),
    onToggleTodo: todo => dispatch(actions.toggleTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Todos, axios));
