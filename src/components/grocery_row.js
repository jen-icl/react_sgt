import React from 'react';

 const GroceryRow = props => {
    return (
        <tr>
            <td>
                <label htmlFor="completed">
                    <input type="checkbox" className="filled-in" id="completed" />
                    <span></span>
                </label>
            </td>
            <td>{props.item}</td>
            <td>{props.store}</td>
            <td>{props.unit_price}</td>
            <td>{props.unit}</td>
            <td>
                <button onClick={() => props.delete(props.id)} className="btn btn-floating red darken-2">
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>
    );
}

export default GroceryRow;
/*https://reactjs.org/docs/forms.html - ctrl+f checkbox */
