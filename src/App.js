import './App.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGrid from "./ButtonGrid";
import Products from "./ProductList.json";

function App() {

  // Price formatter for displaying currenc
  let priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', 
  });
  let products = Products.products; // retrieve list of products
  let [transactionList, setTransactionList] = useState([]); // initialize transaction
  let [subtotal, setSubtotal] = useState(0);
  let [tax, setTax] = useState(0);

  const addProductToTransaction = (product) => {
    // Add the product to the transaction list
    const newTransactionList = [...transactionList];
    newTransactionList.push(product);
    setTransactionList(newTransactionList);

    // Calculate new subtotal and tax
    setSubtotal(subtotal + product.price);
    setTax(tax + (product.vat ? product.price * 0.05 : 0));
  }

  const voidTransaction = () => {
    // Clear transaction list, subtotal and tax
    setTransactionList([]);
    setSubtotal(0);
    setTax(0);
  }

  return (
    <div className='row'>
      <ButtonGrid 
        products={products} 
        transactionList={transactionList}
        addProductToTransaction={addProductToTransaction}
      />
      <div>
        <div className='transaction'>
          {transactionList.map((product, index) => (
            <div className='row' key={index}>
              <div className='transaction-left'>
                {product.productName}
              </div>
              <div className='transaction-right'>
                {priceFormatter.format(product.price)}
              </div>
            </div>
          ))}
        </div>
        <div className='row'>
          <div>
            Subtotal:
          </div>
          <div className='right-align'>
            {priceFormatter.format(subtotal)}
          </div>
        </div>
        <div className='row'>
          <div>
            Tax:
          </div>
          <div className='right-align'>
            {priceFormatter.format(tax)}
          </div>
        </div>
        <div className='row'>
          <div>
            Total:
          </div>
          <div className='right-align'>
            {priceFormatter.format(subtotal + tax)}
          </div>
        </div>
        <div className='button-row'>
          <Button
            variant="outlined" 
            className='buttons'
            onClick={voidTransaction}>
            Void
          </Button>
            <a 
            className='buttons'
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(transactionList, null, '\t')
            )}`}
            download="transaction.json">
              <Button 
                variant="outlined"
                className='buttons'>
                Save
              </Button>
            </a>
        </div>
      </div>
    </div>
  );
}

export default App;
