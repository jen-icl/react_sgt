import React from 'react';
import Modal from './modal';

const DeleteGrocery = props => {
    const {col = "s12", deleteGroceryData: {id, item}, deleteGrocery, deleteModal} = props;

    return (
        <Modal deleteModal={deleteModal}>
            <div className={`col ${col}`}>
                <div className="center deep-orange lighten-3 form-header">
                    <h6 className="grey-text text-darken-2">
                        Delete
                        <span className="red-text text-darken-2"> {item}</span>
                        ?
                    </h6>
                </div>
                <div className="center modalButton">
                    <button className="btn grayBtn modal-close" onClick={() => deleteGrocery(id)}>Delete</button>
                    <button className="btn tangerineBtn modal-close">Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteGrocery;
