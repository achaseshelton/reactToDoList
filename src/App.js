import React, { Component } from 'react';
import './App.css';
import ToDoItem from './ToDoItem';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemArr: [],
            filterBy: "all",
            currentToDo: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.createItem = this.createItem.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.complete = this.complete.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        // fetch the local storage files if they exsist and parse the files into the itemArr?
        let newArr = JSON.parse(localStorage.getItem("itemarr"))
        if (newArr.length > 0) {
            this.setState({ itemArr: newArr })
        }
    }

    componentDidUpdate() {
        // set the local storage item to be the itemArr stringified?
        localStorage.setItem("itemarr", JSON.stringify(this.state.itemArr));
    }

    createItem() {
        if (this.state.currentToDo !== "") {
            this.setState(previousState => {
                let oldItems = previousState.itemArr
                let newToDo = { id: Date.now(), textValue: this.state.currentToDo, completed: false, deleted: false }
                let newState = {
                    itemArr: oldItems.concat(newToDo),
                    currentToDo: ""
                }
                return newState;
            });
        }
    }

    read() {
        let list = this.state.itemArr.filter(todo => {
            if (this.state.filterBy === "all" && !todo.deleted) {
                return todo;
            }
            if (this.state.filterBy === "active" && !todo.completed && !todo.deleted) {
                return todo;
            }
            if (this.state.filterBy === "completed" && todo.completed && !todo.deleted) {
                return todo;
            }
        }).map((todo, index) => {
            return <ToDoItem
                key={index}
                data={todo}
                finish={this.complete}
                remove={this.delete}
            />
        });
        return list
    }

    itemsLeft() {
        let filteredArr = this.state.itemArr.filter(todo => !todo.completed && !todo.deleted)
        if (filteredArr.length > 1) {
            return filteredArr.length + " items to do";
        } else if (filteredArr.length > 0) {
            return filteredArr.length + " item to do";
        } else {
            return ""
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.createItem()
        }
    }

    handleChange(event) {
        this.setState({ currentToDo: event.target.value });
    }

    complete(e) {
        let newArr = this.state.itemArr.map(todo => {
            if (todo.id === parseInt(e.target.id)) {
                todo.completed = !todo.completed
            }
            return todo;
        });
        this.setState({ itemArr: newArr })
    }
    delete(e) {
        let newArr = this.state.itemArr.map(todo => {
            if (todo.id === parseInt(e.target.id)) {
                todo.deleted = !todo.deleted
            }
            return todo;
        });
        this.setState({ itemArr: newArr })
    }

    deleteAll() {
        let newArr = this.state.itemArr.filter(todo => !todo.deleted)
        this.setState({ newArr: newArr.map(todo => todo.deleted = true) })
    }

    render() {
        let tempList = [];
        tempList = this.read();
        return (
            <container className="m-2">
                <div className="row m-2">
                    <div className="col text-center display-2">To Do List</div>
                </div>
                <div className="row m-1">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control col-8"
                            value={this.state.currentToDo}
                            placeholder="Add your To Do List Item"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                        />
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.createItem}>Add</button>
                    </div>
                </div>
                {tempList}
                <div className="row d-flex align-items-center">
                    <div className="col-3 text-center h4">
                        {this.itemsLeft()}
                    </div>
                    <div className="col-1">
                        <button
                            className="btn btn-primary p-1"
                            onClick={() => this.setState({ filterBy: "all" })}
                        >All</button>
                    </div>
                    <div className="col-2">
                        <button
                            className="btn btn-primary p-1"
                            onClick={() => this.setState({ filterBy: "active" })}
                        >Active</button>
                    </div>
                    <div className="col-3">
                        <button
                            className="btn btn-primary p-1"
                            onClick={() => this.setState({ filterBy: "completed" })}
                        >Completed</button>
                    </div>
                    <div className="col-3">
                        <button
                            className="btn btn-primary p-1 float-end"
                            onClick={this.deleteAll}
                        >Delete All</button>
                    </div>
                </div>
            </container>
        );
    }
}