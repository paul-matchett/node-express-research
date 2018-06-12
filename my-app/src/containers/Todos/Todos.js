import React, { Component } from 'react'; 
import classes from './Todos.css';
import axios from '../../shared/axiosInstance';

class Todos extends Component {

  state = {
    todos: []
  };

  async componentDidMount() {

    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.get('/todos', userId);
      console.log('response :', response);
      this.setState({todos: response.data.todos});
    } catch (e) {
      console.log('err :', e);
    }
  }

  addMessage = async () => {

    const userId = localStorage.getItem('userId');
    let rn = Math.floor(Math.random() * 6000) + 1; 
    const todo = {   
      "text": `this is a second dummy message from react app. rn: ${rn}`,
      "_userId": userId
    }
    try {
      const response = await axios.post(`/todos/`, todo);
      console.log('response :', response);
      const todos = this.state.todos;
      todos.push(todo);
      this.setState({todos: todos});
    } catch (e) {
      console.log('err :', e);
    }
  }

  deleteMessage = async (id) => {
    const todo = this.state.todos.filter(todo => todo._id === id)[0];
    console.log('DELETE id :', id);
    try {
      const response = await axios.delete(`/todos/${id}`, todo);
      console.log('response :', response);
      this.setState({todos: [ response.data.todos ]});
    } catch (e) {
      console.log('err :', e);
    }
  }

  updateMessage = async (id) => {
    const todo = this.state.todos.filter(todo => todo._id === id)[0];
    todo.completed = !todo.completed;
    try {
      const response = await axios.patch(`/todos/${id}`, todo);
      this.setState({todos: [ response.data.todos ]});
    } catch (e) {
      console.log('err :', e);
    }
  }

  render() {

    let todos = this.state.todos.map((todo) => {
      return <li key={todo._id}>{todo._id + ' - ' + todo.text}
              <button onClick={() => { this.updateMessage(todo._id) }} >{ todo.completed ? 'Incomplete' : 'Complete' }</button>
              <button onClick={() => { this.updateMessage(todo._id) }} >Update</button>
              <button onClick={() => { this.deleteMessage(todo._id) }} >Delete</button>
            </li>
    });

    return (
      <div className={classes.Todos}>
        <h1>List of todos</h1>
        <ul>
          {
            todos
          }
        </ul>
        <button onClick={() => { this.addMessage() }} >Add Dummy Message</button>
      </div>
    );
  }
}

export default Todos;