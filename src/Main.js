import React from 'react';
import './Main.css';
import { isValidTickerSymbol } from './Utils/Utils';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStockRemoved = this.handleStockRemoved.bind(this);
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

    handleStockRemoved(symbol) {
        this.props.stockRemoved(symbol);
    }

    render() {
        var headingColor = this.props.headingColor;
        var s = this;
        return (
            <main className='body' role='main' style={{ backgroundColor: this.props.backgroundColor }}>
                <div className='flex-container'>
                    <div className='flex__item'>
                        <div className='level level--padding-short'>
                            <div className='level__inner'>
                                <h1 className='heading heading--level-2 util--text-align-d'>Tyler Eliel's Very Own New Tab Extension</h1>
                            </div>
                        </div>
                    </div>

                    <table className='flex__item heading heading--level-3 util--text-align-c'>
                        <tr>
                            <th className='heading heading--level-3 util--text-align-c' style={{ color: headingColor }}>Remove From List</th>
                            <th className='heading heading--level-3 util--text-align-c' style={{ color: headingColor }}>Ticker</th>
                            <th className='heading heading--level-3 util--text-align-c' style={{ color: headingColor }}>Full Company Name</th>
                            <th>Latest Price</th>
                            <th>Change</th>
                            <th>YTD Change</th>
                        </tr>
                        {
                            this.props.stocks.map(function (stockData, index) {
                                return (
                                    <tr className='heading heading--level-3 util--text-align-c' key={index} style={{ color: headingColor }}>
                                        <td><button onClick={() => s.handleStockRemoved(stockData.symbol)} className="button-error small-button pure-button">X</button></td>
                                        <td>{stockData.symbol}</td>
                                        <td>{stockData.companyName}</td>
                                        <td>${stockData.latestPrice}</td>
                                        <td>${stockData.change}</td>
                                        <td>{stockData.ytdChange.toFixed(2)}%</td>
                                    </tr>);
                            })
                        }
                    </table>

                    <form>
                        <h1>ADD NEW COMPANY TO LIST</h1>
                        <div className="question">
                            <input onChange={this.handleChange} type="text" required />
                            <label>Type a ticker symbol here.</label>
                        </div>
                        <button onClick={this.handleSubmit}>ADD</button>
                    </form>

                </div>
            </main>
        )
    }
};

export default Main;