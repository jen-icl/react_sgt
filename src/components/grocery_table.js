import React, {Component} from 'react';
import GroceryRow from './grocery_row';

class GroceryTable extends Component {
    render(){
        const {col = 's12', list, deleteGrocery, updateCheckbox, updateModal} = this.props;
        const groceryElements = list.map(grocery => {
            return <GroceryRow deleteGrocery={deleteGrocery} updateCheckbox={updateCheckbox} updateModal={updateModal} key={grocery.id} {...grocery} />
        });
        return (
            <div className={`grocery-table col ${col}`}>
                <table>
                    <thead>
                        <tr className="deep-orange lighten-3 grey-text text-darken-2">
                            <th>Check</th>
                            <th>Grocery Item</th>
                            <th>Store</th>
                            <th>Unit Price</th>
                            <th>Unit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="grey-text text-darken-2">
                        {groceryElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GroceryTable;
