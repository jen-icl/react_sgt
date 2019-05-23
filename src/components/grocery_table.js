import React, {Component} from 'react';
import GroceryRow from './grocery_row';

class GroceryTable extends Component {
    render(){
        const {col = 's12', list} = this.props;
        const groceryElements = list.map(grocery => {
            return <GroceryRow delete={this.props.delete} key={grocery.id} {...grocery}/>
        });
        return (
            <div className={`col ${col}`}>
                <table>
                    <thead className="rocket-metallic">
                        <tr>
                            <th>Check</th>
                            <th>Grocery Item</th>
                            <th>Store</th>
                            <th>Unit Price</th>
                            <th>Unit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="grayText">
                        {groceryElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GroceryTable;
