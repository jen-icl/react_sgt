import React, {Component} from 'react';

class Modal extends Component {
    componentDidMount(){
        const {updateModal} = this.props;
        const options = {
            onCloseEnd: () => {
                updateModal();
            }
        }
        M.Modal.init(this.Modal, options);
        let instance = M.Modal.getInstance(this.Modal);
        instance.open();
    }

    render(){
        const {children} = this.props;

        return(
            <div id="updateModal" className="modal" ref={Modal => this.Modal = Modal}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Modal;
