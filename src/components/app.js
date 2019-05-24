import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import axios from 'axios';
import GroceryTable from './grocery_table';
import AddGrocery from './add_grocery';
import UpdateGrocery from './update_grocery';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            groceries: [],
            updateGroceryData: {},
            modal: false,
            error: ''
        }

        this.addGrocery = this.addGrocery.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.updateGrocery = this.updateGrocery.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);
        this.deleteGrocery = this.deleteGrocery.bind(this);
    }

    async getGroceryData() {
        try {
            const resp = await axios.get('/api/groceries');
            this.setState({
                groceries: resp.data.data
            });
        } catch(err){
            this.setState({
                error:'Unable to retrieve Grocery Data'
            });
        }
    }

    async addGrocery(grocery){
        grocery.unit_price = parseFloat(grocery.unit_price).toFixed(2) * 100;
        try {
            await axios.post('/api/groceries', grocery);
            this.getGroceryData();
        } catch(err){
            this.setState({
                error:'Unable to add Grocery Item'
            });
        }
    }

    updateModal(grocery){
        this.setState({
            modal: !this.state.modal,
            updateGroceryData: grocery || {}
        });
    }

    async updateGrocery(grocery){
        grocery.unit_price = parseFloat(grocery.unit_price).toFixed(2) * 100;
        try {
            await axios.put('/api/groceries', grocery);
            this.getGroceryData();
        } catch(err) {
            this.setState({
                error: 'Unable to update Grocery Item'
            });
        }
    }

    async updateCheckbox(id, completed){
        completed = completed ? 0 : 1;

        try {
            await axios.put('/api/checkbox', {
                id,
                completed
            });
            this.getGroceryData();
        } catch(err) {
            this.setState({
                error: 'Unable to update Checkbox'
            });
        }
    }

    async deleteGrocery(id){
        try {
            await axios.delete(`/api/groceries/${id}`);
            this.getGroceryData();
        } catch(err){
            this.setState({
                error:'Unable to delete Grocery Item'
            });
        }
    }

    componentDidMount(){
        this.getGroceryData();
    }

    render(){
        const {modal, updateGroceryData} = this.state;

        return (
            <div>
                <h1 className="center">Grocery List</h1>
                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <GroceryTable col="s12 l9" deleteGrocery={this.deleteGrocery} updateCheckbox={this.updateCheckbox} updateModal={this.updateModal} list={this.state.groceries} />
                    <AddGrocery col="s12 l3" addGrocery={this.addGrocery} />
                </div>
                {modal ? <UpdateGrocery updateGroceryData={updateGroceryData} updateGrocery={this.updateGrocery} updateModal={this.updateModal} /> : null}
            </div>
        );
    }
}

export default App;
