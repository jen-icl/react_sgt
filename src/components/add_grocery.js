import React, {Component} from 'react';

class AddGrocery extends Component {
    constructor(props){
        super(props);

        this.state = {
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

    handleSubmit(event){
        event.preventDefault();
        this.props.add({...this.state});

        this.setState({
            item: '',
            store: '',
            unit_price: '',
            unit: ''
        }, () => M.FormSelect.init(this.unit));
    }

    componentDidMount(){
        M.FormSelect.init(this.unit);
    }

    render(){
        const {col = "s12"} = this.props
        const {item, store, unit_price, unit} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={`col ${col}`}>
                <div className="input-field">
                    <input name="item" autoComplete="off" id="item" type="text" value={item} onChange={this.handleInputChange} />
                    <label htmlFor="item">Grocery Item</label>
                </div>
                <div className="input-field">
                    <input name="store" autoComplete="off" id="store" type="text" value={store} onChange={this.handleInputChange} />
                    <label htmlFor="store">Store</label>
                </div>
                <div className="input-field">
                    <input name="unit_price" autoComplete="off" id="unit_price" type="number" value={unit_price} onChange={this.handleInputChange} />
                    <label htmlFor="unit_price">Unit Price</label>
                </div>
                <div className="input-field">
                    <select name="unit" id="unit" ref={element => { this.unit = element }} value={unit} onChange={this.handleInputChange} required>
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
                </div>
                <button className="btn green">Add Grocery</button>
            </form>
        );
    }
}

export default AddGrocery;
