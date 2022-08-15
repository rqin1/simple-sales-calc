import React from 'react';
import ProductButton from './ProductButton';
import './ButtonGrid.css'

// This component makes up the grid table for the product buttons
class ButtonGrid extends React.Component {

    constructor(props) {
        super(props);
        this.rowSize = 3;
    
        this.divideRows = this.divideRows.bind(this);
    }

    render() {
        return (
            <table className='table'>
                {this.divideRows()}
            </table>
        )
    }

    divideRows() {
        // Breaks up the products into rows of rowSize
        let tableContents = [];
        for (let i = 0; i < this.props.products.length; i += this.rowSize) {
            let rowProducts = this.props.products.slice(i, i + this.rowSize);
            let row = [];
            for (let j = 0; j < rowProducts.length; j++) {
                row.push(
                    <td key={i+j}>
                        <ProductButton 
                            product={rowProducts[j]}
                            transactionList={this.props.transactionList}
                            addProductToTransaction={this.props.addProductToTransaction}
                        />
                    </td>
                );
            }
            tableContents.push(<tr key={i}>{row}</tr>);
        }
        return (<tbody className='button'>{tableContents}</tbody>);
    }
}

export default ButtonGrid;