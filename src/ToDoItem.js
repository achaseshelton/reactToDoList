import React, { Component } from 'react'

export default class ToDoItem extends Component {
    
    render() {
        const isCompleted = this.props.data.completed;

        return (
            // console.log(this.props),
            <div className="row m-1 border border-3 border-primary d-flex align-items-center">
                <div className="col">
                    <button
                        type="button btn-lg border border-primary  mx-auto"
                        className="btn btn-success text-primary m-1"
                        onClick={() => this.props.finish(this.props.data.id)}>
                        <i class="bi bi-check-circle-fill"></i>
                    </button>
                </div>
                <div className="col h2 text-primary fw-bold">
                    {isCompleted
                        ? <strike>{this.props.data.textValue}</strike>
                        : this.props.data.textValue
                    }
                </div>
                <div className="col">
                    <button
                        type="button btn-lg border border-primary  mx-auto"
                        className="btn btn-success text-primary float-end m-1"
                        onClick={() => this.props.remove(this.props.data.id)}>
                        <i class="bi bi-x-circle-fill"></i>
                    </button>
                </div>
            </div>
        )
    }

}