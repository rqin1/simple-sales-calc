import React from 'react';
import Button from '@mui/material/Button';
import './ProductButton.css'

// This is the component for the buttons for each product
class ProductButton extends React.Component {

    constructor(props) {
        super(props);
    
        this.addProductToTransaction = this.addProductToTransaction.bind(this);
    }

    render() {
        return (
            <Button 
                variant="outlined"
                className='button'
                onClick={this.addProductToTransaction}>
                {this.props.product.productName}
            </Button>
        )
    }

    addProductToTransaction() {
        this.props.addProductToTransaction(this.props.product);
    }
}

export default ProductButton;