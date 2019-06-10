import React from 'react';

 const GroceryRow = props => {
    const {id, item, store, unit_price, unit, completed, deleteModal, updateCheckbox, updateModal} = props;

    if(id === 0){
        return (
            <tr>
                <td colSpan="6" className="center">{item}</td>
            </tr>
        );
    }

    const checkboxStatus = completed ?
        <label className="checkbox" title="Bought?">
            <input type="checkbox" className="filled-in" onChange={() => updateCheckbox(id, completed)} defaultChecked />
            <span></span>
        </label> :
        < label className="checkbox" title="Bought?">
             <input type="checkbox" className="filled-in" onChange={() => updateCheckbox(id, completed)} />
            <span></span>
        </label>

    return (
        <tr>
            <td className="center">{checkboxStatus}</td>
            <td>{item}</td>
            <td>{store}</td>
            <td>$ {(unit_price/100).toFixed(2)}</td>
            <td>{unit}</td>
            <td>
                <button onClick={() => updateModal(props)} className="btn btn-floating grayBtn" title="Edit">
                    <i className="material-icons">edit</i>
                </button>
                <button onClick={() => deleteModal(props)} className="btn btn-floating tangerineBtn" title="Delete">
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>
    );
}

export default GroceryRow;
