import React from 'react';

 const GroceryRow = props => {
    const {id, item, store, unit_price, unit, completed, deleteGrocery, updateCheckbox, updateModal} = props;
    const checkboxStatus = completed ?
        <label className="checkbox">
             <input type="checkbox" className="filled-in" onChange={() => updateCheckbox(id, completed)} defaultChecked/>
            <span></span>
        </label> :
        < label className="checkbox">
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
                <button onClick={() => updateModal(props)} className="btn btn-floating grayBtn">
                    <i className="material-icons">edit</i>
                </button>
                <button onClick={() => deleteGrocery(id)} className="btn btn-floating tangerineBtn">
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>
    );
}

export default GroceryRow;
