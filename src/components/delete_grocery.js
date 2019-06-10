import React from 'react';
import Modal from './modal';

const DeleteGrocery = props => {
    console.log('delete props', props)
    const {col = "s12", deleteItemId, deleteGrocery, deleteModal} = props;

    return (
        <Modal deleteModal={deleteModal}>
            <div className={`col ${col}`}>
                <div className="center deep-orange lighten-3 form-header">
                    <h6 className="grey-text text-darken-2">Delete Grocery Item?</h6>
                </div>
                <button className="btn grayBtn modal-close" onClick={() => deleteGrocery(deleteItemId)}>Delete</button>
            </div>
        </Modal>
    );
}

export default DeleteGrocery;
