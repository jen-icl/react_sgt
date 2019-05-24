import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import axios from 'axios';
import AddGrocery from './add_grocery';
import GroceryTable from './grocery_table';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            groceries: [],
            error: ''
        }

        this.addGrocery = this.addGrocery.bind(this);
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
        //need item, store, unit_price, unit
        grocery.unit_price = parseInt(grocery.unit_price * 100);
        try {
            await axios.post('/api/groceries', grocery);
            this.getGroceryData();
        } catch(err){
            this.setState({
                error:'Unable to add Grocery Item'
            });
        }
    }

    async updateGrocery(grocery){
        //need item, store, unit_price, unit, id
        grocery.unit_price = parseInt(grocery.unit_price * 100);
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
        return (
            <div>
                <h1 className="center grey-text text-darken-2">Grocery List</h1>
                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <GroceryTable col="s12 l9" deleteGrocery={this.deleteGrocery} updateCheckbox={this.updateCheckbox} list={this.state.groceries}/>
                    <AddGrocery col="s12 l3" add={this.addGrocery}/>
                </div>
            </div>
        );
    }
}

export default App;
