import React from 'react';
import axios from 'axios';
import Accessories from './Accessories.jsx';
import QuickView from './QuickView.jsx';
import RelatedItems from './RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.currURL = window.location.pathname.split('/')[1] || 1;
    this.state = {
      currProduct: {},
      accessories: [],
      relatedItems: [],
      viewHistory: false,
      pastItems: [],
      visible: false,
      currQuickView: {},
    };

    this.getViewHistory = this.getViewHistory.bind(this);
    this.getViewRelatedItems = this.getViewRelatedItems.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setCurrQuickView = this.setCurrQuickView.bind(this);
  }

  componentDidMount() {
    this.getCurrProduct();
  }

  getCurrProduct() {
    axios
      .get(`http://localhost:9000/${this.currURL}`)
      .then(result => {
        this.setState({
          currProduct: {
            productID: result.data.id,
            name: result.data.name,
            price: result.data.price,
            imageURL: result.data.imageURL,
            categoryName: result.data.categoryName,
          },
        });
      })
      .then(() => {
        this.saveCurrProduct(this.state.currProduct);
        // this.getAccessories();
        // this.getRelatedItems();
        // this.getPastItems();
      })
      .catch(err => {
        console.log('there was an error with currProduct get request: ', err);
      });
  }

  saveCurrProduct({ productID, name, price, imageURL, categoryName }) {
    axios
      .post('http://localhost:9000/SaveProduct', {
        productID: productID,
        name: name,
        price: price,
        imageURL: imageURL,
        categoryName: categoryName,
      })
      .catch(err => {
        console.log('there was an error with the save curr Product post request: ', err);
      });
  }

  getPastItems() {
    axios
      .get('http://localhost:9000/ViewHistory')
      .then(results => {
        this.setState({
          pastItems: results.data,
        });
      })
      .catch(err => {
        console.log('there was an error with the pastItems get request: ', err);
      });
  }

  getAccessories() {
    axios
      .get(`http://localhost:9000/items/${this.state.currProduct.categoryName}`)
      .then(results => {
        this.setState({
          accessories: results.data,
        });
      })
      .catch(err => {
        console.log("there was an error with currProduct's accessories get request: ", err);
      });
  }

  getRelatedItems() {
    axios
      .get(
        `http://localhost:9000/relatedItems/${this.state.currProduct.categoryName}/${this.currURL}`,
      )
      .then(results => {
        console.log('araretae', results);
        this.setState({
          relatedItems: results.data,
        });
      })
      .catch(err => {
        console.log("there was an error with the currProduct's related items get request: ", err);
      });
  }

  getViewHistory() {
    this.setState({
      viewHistory: true,
    });
  }

  getViewRelatedItems() {
    this.setState({
      viewHistory: false,
    });
  }

  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  setCurrQuickView(e) {
    let imageURL = e.target.dataset.imageurl;
    let categoryName = e.target.dataset.categoryname;
    let productID = e.target.dataset.productid;
    let name = e.target.dataset.name;
    let price = e.target.dataset.price;

    this.setState(
      {
        currQuickView: {
          imageURL,
          categoryName,
          productID,
          name,
          price,
        },
      },
      this.openModal,
    );
  }

  render() {
    return (
      <div id="wrapper">
        <div class="accessories">
          <div class="accessoryHead">
            {' '}
            <b class="bigHeader">Consider these accessories</b>{' '}
          </div>
          <Accessories accessories={this.state.accessories} />
        </div>
        <div class="relatedItems">
          <div class="relatedItemsHead">
            <b class="bigHeader">Recommended</b>
          </div>
          <div id="recViewOptions">
            <span class="choice" onClick={this.getViewRelatedItems}>
              Other recommendations
            </span>
            <span class="choice" onClick={this.getViewHistory}>
              Recently viewed items
            </span>
          </div>
          <QuickView
            data={this.state.currQuickView}
            modal={this.state.visible}
            closeModal={this.closeModal}
          />
          <RelatedItems
            relatedProducts={
              this.state.viewHistory ? this.state.pastItems : this.state.relatedItems
            }
            setQuickView={this.setCurrQuickView}
          />
        </div>
      </div>
    );
  }
}

export default App;
