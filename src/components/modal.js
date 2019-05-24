import React, {Component, Fragment} from 'react';

class Modal extends Component {
    componentDidMount(){
        M.Modal.init(this.modal);
    }
    render(){
        return(
            <Fragment>
                <a className="btn btn-floating avocadoBtn" href="#updateModal">
                    <i className="material-icons">edit</i>
                </a>

                <div id="updateModal" className="modal" ref={modal => this.modal = modal}>
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Modal;
