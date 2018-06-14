import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../shared/axiosInstance";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";
import classes from "./Todo.css";

class Todo extends Component {
  state = {
    controls: {
      text: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter a todo"
        },
        value: "",
        validation: {
          required: true,
          minLength: 1
        },
        valid: false,
        touched: false
      },
      completed: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "incomplete", displayValue: "Incomplete" },
            { value: "completed", displayValue: "Completed" }
          ]
        },
        value: "incomplete",
        validation: {},
        valid: true
      }
    },
    todoCompleted: false
  };

  componentDidMount() {
    this.loadTodoToUpdate();
  }

  // componentWillUpdate() {
  //   this.loadTodoToUpdate();
  // }

  loadTodoToUpdate() {
    let value = "";
    if (this.props.match.params.id) {
      value = this.props.todos.filter(
        todo => todo._id === this.props.match.params.id
      )[0].text;
    }
    let updatedState = { ...this.state };
    updatedState.controls.text.value = value;
    this.setState({ updatedState });
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    let todo = {
      text: this.state.controls.text.value,
      completed: this.state.controls.text.completed
    };
    if (this.props.match.params.id) {
      todo._id = this.props.match.params.id;
      this.props.onUpdateTodo(todo);
    } else {
      this.props.onAddTodo(todo);
    }
    this.setState({
      todoCompleted: true
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let todoCompletedRedirect = null;
    if (this.state.todoCompleted) {
      todoCompletedRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Todo}>
        {todoCompletedRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.props.match.params.id ? "Update Todo" : "Add Todo"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    todos: state.todos.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: todo => dispatch(actions.addTodo(todo)),
    onUpdateTodo: todo => dispatch(actions.updateTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Todo, axios));
