import React, { Component } from 'react'

export default class ToDoItem extends Component {
    constructor(props) {
        super(props);
    }




    render() {
        const isCompleted = this.props.data.completed === true;
        
        return (
            // console.log(this.props),
            <div className="row m-1 border border-3 border-dark d-flex align-items-center">
                <div className="col">
                    <button
                        type="button btn-lg border border-rounded-circle mx-auto"
                        className="btn btn-primary"
                        id={this.props.data.id}
                        onClick={this.props.finish}>
                        C
                         </button>
                </div>
                <div className="col h2 text-primary">
                {isCompleted
                ?<strike>{this.props.data.textValue}</strike>
                : this.props.data.textValue
                }
                </div>
                <div className="col">
                    <button
                        type="button btn-lg border border-rounded-circle mx-auto"
                        className="btn btn-primary"
                        id={this.props.data.id}
                        onClick={this.props.remove}>
                        X
                         </button>
                </div>
            </div>
        )
    }

}