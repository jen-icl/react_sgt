import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import axios from 'axios';
import AddGrocery from './add_grocery';
import GroceryTable from './grocery_table';

import GroceryList from '../dummy_data/grocery_list';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            groceries: [],
            error: ''
        }

        this.addGrocery = this.addGrocery.bind(this);
        this.deleteGrocery = this.deleteGrocery.bind(this);
    }


    async addGrocery(grocery){
        grocery.unit_price = parseInt(grocery.unit_price * 100);
        // try {
        // await axios.post('/api/groceryList', grocery)
        // this.getGroceryData();
        // } catch(err){
        //     this.setState({
        //         error:'Error adding grocery data'
        //     });
        // }
    }

    async deleteGrocery(id){
        console.log('delete clicked')
        // try {
        // await axios.delete(`/api/groceryList/${id}`);
        // } catch(err){
        //     this.setState({
        //         error:'Error deleting grocery data'
        //     });
        // }
    }

    componentDidMount(){
        this.getGroceryData();
    }

    /* async */ getGroceryData(){
        this.setState({
            groceries: GroceryList
        });
        // try {
        // const resp = await axios.get('/api/groceryList');
        // this.setState({
        //     groceries: resp.data.data
        // });
        // } catch(err){
        //     this.setState({
        //         error:'Error retrieving grocery data'
        //     });
        // }
    }

    render(){
        return (
            <div>
                <h1 className="center">Grocery List</h1>
                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <GroceryTable col="s12 m8" delete={this.deleteGrocery} list={this.state.groceries}/>
                    <AddGrocery col="s12 m4" add={this.addGrocery}/>
                </div>
            </div>
        );
    }
}

export default App;
