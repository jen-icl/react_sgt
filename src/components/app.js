import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import axios from 'axios';
import GroceryTable from './grocery_table';
import AddGrocery from './add_grocery';
import UpdateGrocery from './update_grocery';
import DeleteGrocery from './delete_grocery';

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            groceries: [],
            updateGroceryData: {},
            updateModal: false,
            deleteGroceryData: {},
            deleteModal: false,
            error: ''
        };

        this.addGrocery = this.addGrocery.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.updateGrocery = this.updateGrocery.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);
        this.deleteModal = this.deleteModal.bind(this);
        this.deleteGrocery = this.deleteGrocery.bind(this);
    }

    async getGroceryData() {
        try {
            const resp = await axios.get('/api/groceries');
            const {success, error, data} = resp.data;

            if(success) {
                if(data.length > 0){
                    this.setState({
                        groceries: data
                    });
                } else {
                    this.setState({
                        groceries: [{
                            id: 0,
                            item: 'PLEASE ADD A GROCERY ITEM'
                        }]
                    });
                }
            } else {
                throw(error);
            }
        } catch(err){
            this.setState({
                error:`Unable to retrieve Grocery Data, ${err.code}`
            });
        }
    }

    async addGrocery(grocery) {
        grocery.unit_price = parseFloat(grocery.unit_price).toFixed(2) * 100;
        try {
            const resp = await axios.post('/api/groceries', grocery);
            const {success, error} = resp.data;

            if(success) {
                this.getGroceryData();
            } else {
                throw(error);
            }
        } catch(err){
            this.setState({
                error:`Unable to add Grocery Item, ${err.code}`
            });
        }
    }

    updateModal(grocery) {
        this.setState({
            updateModal: !this.state.updateModal,
            updateGroceryData: grocery || {}
        });
    }

    async updateGrocery(grocery) {
        grocery.unit_price = parseFloat(grocery.unit_price).toFixed(2) * 100;
        try {
            const resp = await axios.put('/api/groceries', grocery);
            const {success, error} = resp.data;

            if(success) {
                this.getGroceryData();
            } else {
                throw(error);
            }
        } catch(err){
            this.setState({
                error: `Unable to update Grocery Item, ${err.code}`
            });
        }
    }

    async updateCheckbox(id, completed) {
        completed = completed ? 0 : 1;

        try {
            const resp = await axios.put('/api/checkbox', {
                id,
                completed
            });
            const {success, error} = resp.data;

            if(success) {
                this.getGroceryData();
            } else {
                throw(error);
            }
        } catch(err){
            this.setState({
                error: `Unable to update Checkbox, ${err.code}`
            });
        }
    }

    deleteModal(grocery) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            deleteGroceryData: grocery || {}
        });
    }

    async deleteGrocery(id) {
        try {
            const resp = await axios.delete(`/api/groceries/${id}`);
            const {success, error} = resp.data;

            if(success) {
                this.getGroceryData();
            } else {
                throw(error);
            }
        } catch(err){
            this.setState({
                error:`Unable to delete Grocery Item ${err.code}`
            });
        }
    }

    componentDidMount() {
        this.getGroceryData();
    }

    render() {
        const {updateModal, updateGroceryData, deleteModal, deleteGroceryData} = this.state;

        return (
            <div>
                <h1 className="center">Grocery List</h1>
                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <GroceryTable col="s12 l9" deleteModal={this.deleteModal} updateCheckbox={this.updateCheckbox} updateModal={this.updateModal} list={this.state.groceries} />
                    <AddGrocery col="s12 l3" addGrocery={this.addGrocery} />
                </div>
                {updateModal ? <UpdateGrocery updateGroceryData={updateGroceryData} updateGrocery={this.updateGrocery} updateModal={this.updateModal} /> : null}
                {deleteModal ? <DeleteGrocery deleteGroceryData={deleteGroceryData} deleteGrocery={this.deleteGrocery} deleteModal={this.deleteModal} /> : null}
            </div>
        );
    }
}

export default App;
