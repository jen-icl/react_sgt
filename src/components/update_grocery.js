import React, {Component} from 'react';
import Modal from './modal';

class UpdateGrocery extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            item: '',
            store: '',
            unit_price: '',
            unit: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const {updateGrocery} = this.props;
        event.preventDefault();
        updateGrocery({...this.state});
    }

    componentDidMount() {
        const {updateGroceryData: {id, item, store, unit_price, unit}} = this.props;

        this.setState({
            id,
            item,
            store,
            unit_price: (unit_price/100).toFixed(2),
            unit
        }, () => M.FormSelect.init(this.unit));
    }

    render() {
        const {col = "s12", updateModal} = this.props
        const {item, store, unit_price, unit} = this.state;

        return (
            <Modal updateModal={updateModal}>
                <div className={`col ${col}`}>
                    <div className="center deep-orange lighten-3 form-header">
                        <h6 className="grey-text text-darken-2">Update Grocery Item</h6>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input name="item" autoComplete="off" id="item" type="text" value={item} onChange={this.handleInputChange} />
                            <label className="active" htmlFor="item">Grocery Item</label>
                        </div>
                        <div className="input-field">
                            <input name="store" autoComplete="off" id="store" type="text" value={store} onChange={this.handleInputChange} />
                            <label className="active" htmlFor="store">Store</label>
                        </div>
                        <div className="input-field">
                            <input name="unit_price" autoComplete="off" id="unit_price" type="number" min="0" step="any" value={unit_price} onChange={this.handleInputChange} />
                            <label className="active" htmlFor="unit_price">Unit Price</label>
                        </div>
                        <div className="input-field">
                            <select name="unit" id="unit" ref={element => {this.unit = element}} value={unit} onChange={this.handleInputChange} required>
                                <option value="" disabled>Select Unit</option>
                                <option value="/btl">Bottle (btl)</option>
                                <option value="/dz">Dozen (dz)</option>
                                <option value="/ea">Each (ea)</option>
                                <option value="/fl.oz">Fluid Ounce (fl.oz)</option>
                                <option value="/gal">Gallon (gal)</option>
                                <option value="/g">Gram (g)</option>
                                <option value="/kg">Kilogram (kg)</option>
                                <option value="/oz">Ounce (oz)</option>
                                <option value="/pk">Pack (pk)</option>
                                <option value="/lb">Pound (lb)</option>
                            </select>
                            <label className="active" htmlFor="unit"></label>
                        </div>
                        <button className="btn grayBtn modal-close">Update</button>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default UpdateGrocery;
