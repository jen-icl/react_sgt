import React, {Component} from 'react';

class AddGrocery extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const {item, store, unit_price, unit} = this.state;

        if(item && store && unit_price && unit) {
            this.props.addGrocery({...this.state});

            this.setState({
                item: '',
                store: '',
                unit_price: '',
                unit: ''
            }, () => M.FormSelect.init(this.unit));
        } else {
            this.setState({
                error: 'Please select a unit'
            });
        }
    }

    componentDidMount() {
        M.FormSelect.init(this.unit);
    }

    render() {
        const {col = "s12"} = this.props
        const {item, store, unit_price, unit, error, touched} = this.state;

        return (
            <div className={`col ${col}`}>
                <form onSubmit={this.handleSubmit}>
                    <div className="center deep-orange lighten-3 form-header">
                        <h6 className="grey-text text-darken-2">Add Grocery Item</h6>
                    </div>
                    <div className="input-field">
                        <input name="item" autoComplete="off" id="item" type="text" value={item} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                        <label htmlFor="item">Grocery Item</label>
                        {touched.item && !item ? <p className="errorInput red-text text-darken-2">Please enter grocery item</p> : null}
                    </div>
                    <div className="input-field">
                        <input name="store" autoComplete="off" id="store" type="text" value={store} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                        <label htmlFor="store">Store</label>
                        {touched.store && !store ? <p className="errorInput red-text text-darken-2">Please enter store name</p> : null}
                    </div>
                    <div className="input-field">
                        <input name="unit_price" autoComplete="off" id="unit_price" type="number" min="0" step="any" value={unit_price} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                        <label htmlFor="unit_price">Unit Price ($)</label>
                        {touched.unit_price && !unit_price ? <p className="errorInput red-text text-darken-2">Please enter unit price ($)</p> : null}
                    </div>
                    <div className="input-field">
                        <select name="unit" id="unit" ref={element => { this.unit = element }} value={unit} onChange={this.handleInputChange}>
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
                        <label htmlFor="unit"></label>
                        {error ? <p className="errorInput red-text text-darken-2">{error}</p> : null}
                    </div>
                    <button className="btn grayBtn">Add Grocery</button>
                </form>
            </div>
        );
    }
}

export default AddGrocery;
