/*Test ReactJS application*/
import React, {Component} from 'react';
import './ToDoListApp.css';
import './bootstrap-grid.css';

var taskArr = [
  {
    id: 1,
    text: 'task 1',
    done: false,
    removed: false
  },
  {
    id: 2,
    text: 'task 2',
    done: false,
    removed: false
  },
  {
    id: 3,
    text: 'task 3',
    done: true,
    removed: false
  }
];

/*  Главный класс, здесь сохраняется массив задач, хранится состояние массива. Массив передается как props
 *  в классы-наследники. Также здесь определены функции, изменяющие массив задач. Эти функции передаются
 *  через атрибуты (props), в результате, классы-наследники вызывают эти функции из главного класса, т.о.
 *  в главном классе фиксируется изменение состояния массива и происходит перерисовка элементов DOM
 */ 
class ToDoListApp extends Component {
  constructor(props) {
    super(props);
    this.changeTaskDone = this.changeTaskDone.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.delTask = this.delTask.bind(this);
    this.state = {tasks: taskArr};
  }
  render() {
    return (
      <div className="wrapper">
        <h2 className="title">To Do List</h2>
        <NewTask addNewTask={this.addNewTask}/>
        <TaskList tasks={this.state.tasks} changeTaskDone={this.changeTaskDone} delTask={this.delTask}/>
      </div>
    );
  }
  changeTaskDone(text) {
    let newArr = this.state.tasks.map(function(x) { if (x.text !== text) return x; x.done = !x.done; return x;});
    this.setState({tasks: newArr});
  }
  addNewTask(text) {
    let newArr = this.state.tasks;
    newArr.push({id: (new Date()), text: text, done: false, removed: false}); //Изменяет сам массив, не образует копии
    this.setState({tasks: newArr});
  }
  delTask(text) {
    let newArr = this.state.tasks;
    newArr.splice(newArr.findIndex(x => x.text === text), 1); //filter  фильтрует но не setState tasks не изменяет
    this.setState({tasks: newArr});
  }
}

//---------------------------------------AddNewTask--------------------------------------------

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.handleTyping = this.handleTyping.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.state = {typed: ''};
  }
  render() {
    var text = "What You need to do?";
    return (
      <div className="newTaskField">
        <input ref="field" onChange={this.handleTyping} type="text" className="newTaskInput" placeholder={text}/>
        <button onClick={this.addNewTask} className="newTaskButton">+Add</button>
      </div>
    );
  }
  handleTyping(event) {
    this.setState({typed: event.target.value});
  }
  addNewTask() {
    var text = this.state.typed;
    text = text.replace(/\s{2,}/g, ' ').replace(/^\s+|>|</g, '');
    if (text.length > 0) {
      this.props.addNewTask(text);
      this.refs.field.value = '';
      this.setState({typed: ''});
    }
  }
}

//---------------------------------------TaskList----------------------------------------------

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.delTask = this.delTask.bind(this);
  }
  render() {
    const tasks = this.props.tasks.map(x => 
      <div key={x.id} onClick={this.handleClick} className="row">
        <div className="col-xs-9 taskField"><Task text={x.text} done={x.done}/></div>
        <div className="col-xs-2 col-xs-offset-1">
          <button id={x.text} onClick={this.delTask} className="taskButton">X</button>
        </div>
      </div>);
    return (
      <div className="tasks"> {tasks} </div>
    );
  }
  handleClick(event) {
    if (event.target.childNodes[0].nodeValue != null) {
      let text = event.target.childNodes[0].nodeValue.toString();
      this.props.changeTaskDone(text);
    }
  }
  delTask(event) {
    this.props.delTask(event.target.id.toString());
  }
}

class Task extends Component {

  render() {
    return (
      <div className={this.props.done ? "done" : "notDone"}>{this.props.text}</div>
    );
  }
}

/*function checkChangeTaskArr() {
  taskArr.forEach(x => console.log(x.text + ' ' + x.done));
}*/

export default ToDoListApp;