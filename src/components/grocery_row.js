import React from 'react';

 const GroceryRow = props => {
    const {id, item, store, unit_price, unit, completed, deleteGrocery, updateCheckbox} = props;
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
            <td>$ {unit_price/100}</td>
            <td>{unit}</td>
            <td>
                <button onClick={() => deleteGrocery(id)} className="btn btn-floating tangerineBtn">
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>
    );
}

export default GroceryRow;
/*https://reactjs.org/docs/forms.html - ctrl+f checkbox */
