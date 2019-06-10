import React, {Component} from 'react';

class Modal extends Component {
    componentDidMount() {
        let options = {};
        const {updateModal, deleteModal} = this.props;
        if(updateModal){
            options = {
                onCloseEnd: () => {
                    updateModal();
                }
            }
        }

        if(deleteModal){
            options = {
                onCloseEnd: () => {
                    deleteModal();
                }
            }
        }

        M.Modal.init(this.Modal, options);
        let instance = M.Modal.getInstance(this.Modal);
        instance.open();
    }

    render(){
        const {children} = this.props;

        return(
            <div id="modalpopup" className="modal" ref={Modal => this.Modal = Modal}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Modal;
