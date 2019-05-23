import React from 'react';

 const GroceryRow = props => {
    return (
        <tr>
            <td className="center">
                <label htmlFor="completed">
                    <input type="checkbox" className="filled-in" id="completed" />
                    <span></span>
                </label>
            </td>
            <td>{props.item}</td>
            <td>{props.store}</td>
            <td className="center">${props.unit_price/100}</td>
            <td className="center">{props.unit}</td>
            <td className="center">
                <button onClick={() => props.delete(props.id)} className="btn btn-floating red darken-2">
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>
    );
}

export default GroceryRow;
/*https://reactjs.org/docs/forms.html - ctrl+f checkbox */
