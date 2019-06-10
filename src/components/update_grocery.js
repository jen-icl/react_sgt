import React, {Component} from 'react';
import Modal from './modal';

class UpdateGrocery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            item: '',
            store: '',
            unit_price: '',
            unit: '',
            error: '',
            touched: {
                item: false,
                store: false,
                unit_price: false,
                unit: false
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBlur(event) {
        const {touched} = this.state;
        const {name} = event.target;

        this.setState({
            touched: {
                ...touched,
                [name]: true
            }
        });
    }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {id, item, store, unit_price, unit} = this.state;

        if(item && store && unit_price && unit) {
            this.props.updateGrocery({
                id,
                item,
                store,
                unit_price,
                unit
            });
        } else {
            this.setState({
                error: 'Please input all fields'
            });
        }
    }

    componentDidMount() {
        const {updateGroceryData: {id, item, store, unit_price, unit}} = this.props;

        this.setState({
            id,
            item,
            store,
            unit_price: (unit_price/100).toFixed(2),
            unit,
            error: '',
            touched: {
                item: false,
                store: false,
                unit_price: false,
                unit: false
            }
        }, () => M.FormSelect.init(this.unit));
    }

    render() {
        const {col = "s12", updateModal} = this.props;
        const {item, store, unit_price, unit, error, touched} = this.state;
        const enableButton = !!item && !!store && !!unit_price && !!unit;

        return (
            <Modal updateModal={updateModal}>
                <div className={`col ${col}`}>
                    <div className="center deep-orange lighten-3 form-header">
                        <h6 className="grey-text text-darken-2">Update Grocery Item</h6>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input name="item" autoComplete="off" id="item" type="text" value={item} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                            <label className="active" htmlFor="item">
                                <i className="material-icons">local_pizza</i>
                                Grocery Item
                            </label>
                            {touched.item && !item ? <p className="errorInput red-text text-darken-2">Please enter grocery item</p> : null}
                        </div>
                        <div className="input-field">
                            <input name="store" autoComplete="off" id="store" type="text" value={store} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                            <label className="active" htmlFor="store">
                                <i className="material-icons">store</i>
                                Store
                            </label>
                            {touched.store && !store ? <p className="errorInput red-text text-darken-2">Please enter store name</p> : null}
                        </div>
                        <div className="input-field">
                            <input name="unit_price" autoComplete="off" id="unit_price" type="number" min="0" step="any" value={unit_price} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                            <label className="active" htmlFor="unit_price">
                                <i className="material-icons">attach_money</i>
                                Unit Price
                            </label>
                            {touched.unit_price && !unit_price ? <p className="errorInput red-text text-darken-2">Please enter unit price ($)</p> : null}
                        </div>
                        <div className="input-field">
                            <select name="unit" id="unit" ref={element => {this.unit = element}} value={unit} onChange={this.handleInputChange}>
                                <option value="" disabled>Select Unit Type</option>
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
                        {error ? <p className="errorInput red-text text-darken-2">{error}</p> : null}
                        <div className="center modalButton">
                            {enableButton ? <button className="btn grayBtn modal-close">Update</button> : <button disabled className="btn grayBtn modal-close">Update</button>}
                            <button className="btn tangerineBtn modal-close">Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default UpdateGrocery;
