import React from 'react';
import './Main.css';
import { isValidTickerSymbol } from './Utils/Utils';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'ALK',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.newStockAdded = this.props.newStockAdded.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleSubmit(event) {
        if (!this.state.value || this.state.value == undefined || this.state.value == '') {
            return;
        }

        for (var i = 0; i < this.props.stocks.length; i++) {
            if (this.props.stocks[i].symbol.toLowerCase() === this.state.value.toLowerCase()) {
                alert("You've already added this stock!");
                return;
            }
        }

        isValidTickerSymbol(this.state.value).then((result) => {
            if (result.res) {
                var stocks = this.props.stocks;
                this.props.newStockAdded(result.data);
            }
            else {
                alert('Please enter a valid ticker symbol! Come on....');
            }
        });

        event.preventDefault();
    }

    render() {
        var headingColor = this.props.headingColor;
        return (
            <main className='body' role='main' style={{ backgroundColor: this.props.backgroundColor }}>
                <div className='flex-container'>
                    <div className='flex__item'>
                        <div className='level level--padding-short'>
                            <div className='level__inner'>
                                <h1 className='heading heading--level-2 util--text-align-c'>Stocks 'n' Stuff</h1>
                            </div>
                        </div>
                    </div>

                    <form>
                        <h1>ADD NEW COMPANY TO LIST</h1>
                        <div className="question">
                            <input onChange={this.handleChange} type="text" required />
                            <label>Type a ticker symbol here.</label>
                        </div>
                        <button onClick={this.handleSubmit}>ADD</button>
                    </form>

                    <div className='flex__item'>
                        {
                            this.props.stocks.map(function (stockData, index) {
                                return (
                                    <h3 className='heading heading--level-3 util--text-align-c' key={index} style={{ color: headingColor }}>
                                        {stockData.symbol}: ${stockData.latestPrice}</h3>);
                            })
                        }
                    </div>
                </div>
            </main>
        )
    }
};

export default Main;