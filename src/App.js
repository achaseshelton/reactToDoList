import React, { Component } from 'react';
import './App.css';
import ToDoItem from './ToDoItem';

// 

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
        this.completeAll = this.completeAll.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.complete = this.complete.bind(this);
        this.delete = this.delete.bind(this);
        this.restoreActive = this.restoreActive.bind(this);
    }

    componentDidMount() {
        // fetch the local storage files if they exsist and parse the files into the itemArr?
        let newArr = JSON.parse(localStorage.getItem("itemarr"))
        if (newArr) {
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
        let activeArr = this.state.itemArr.filter(todo => !todo.deleted);
        let filteredArr = this.state.itemArr.filter(todo => !todo.completed && !todo.deleted);
        let completedArr = this.state.itemArr.filter(todo => todo.completed && !todo.deleted);
        if (this.state.filterBy === "all") {
            return activeArr.length + " of " + activeArr.length + " items";
        } else if (this.state.filterBy === "active") {
            return filteredArr.length + " of " + activeArr.length + " items";
        } else if (this.state.filterBy === "completed") {
            return completedArr.length + " of " + activeArr.length + " items";
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

complete(id) {
    let newArr = this.state.itemArr.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed
        }
        return todo;
    });
    this.setState({ itemArr: newArr })
}
delete (id) {
    let newArr = this.state.itemArr.map(todo => {
        if (todo.id === id) {
            todo.deleted = !todo.deleted
        }
        return todo;
    });
    this.setState({ itemArr: newArr })
}

restoreActive() {
    let newArr = this.state.itemArr.filter(todo => todo.completed)
    this.setState({ newArr: newArr.map(todo => todo.completed = false) })
}

deleteAll() {
    let newArr = this.state.itemArr.filter(todo => todo.completed)
    this.setState({ newArr: newArr.map(todo => todo.deleted = true) })
}

completeAll() {
    let newArr = this.state.itemArr.filter(todo => !todo.completed)
    this.setState({ newArr: newArr.map(todo => todo.completed = true) })
}

render() {
    let tempList = this.read();
    return (
        <container className="m-2">
            <div className="row m-2">
                <div className="col text-center display-2 text-primary fw-bold">To Do List</div>
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
                    <button type="button" className="btn btn-success btn-lg text-primary" onClick={this.createItem}>
                        <i class="bi bi-plus-circle-fill"></i>
                    </button>
                </div>
            </div>
            {tempList}
            <div className="row d-flex align-items-center">
                <div className="col text-center h4 text-primary fw-bold">
                    {this.itemsLeft()}
                </div>
            </div>
            <div className="row m-1">
                <div className="btn-group d-flex justify content-center">
                    <button
                        className="btn btn-success p-1 text-primary fw-bold"
                        onClick={() => this.setState({ filterBy: "all" })}
                    >All</button>
                    <button
                        className="btn btn-success p-1 text-primary fw-bold"
                        onClick={() => this.setState({ filterBy: "active" })}
                    >Active</button>
                    <button
                        className="btn btn-success p-1 text-primary fw-bold"
                        onClick={() => this.setState({ filterBy: "completed" })}
                    >Completed</button>
                </div>
            </div>
            <div classname="row m-1">
                <div className="btn-group d-flex justify content-center">
                    <button
                        className="btn btn-success p-1 text-primary fw-bold"
                        onClick={this.restoreActive}
                    >Restore Completed</button>
                    <button
                        className="btn btn-success p-1 text-primary fw-bold"
                        onClick={this.completeAll}
                    >Complete All</button>
                    <button
                        className="btn btn-success p-1 text-primary fw-bold"
                        onClick={this.deleteAll}
                    >Delete Comnpleted</button>
                </div>
            </div>
        </container>
    );
}
}