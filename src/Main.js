import React from 'react';
import './Main.css';
import { isValidTickerSymbol } from './Utils/Utils';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'ALK',
            stocksList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newStockAdded = this.props.newStockAdded.bind(this);
    }

    componentDidMount() {
        var val = this.state.value;
        var s = this;
        chrome.storage.sync.get(['stocksList'], function (items) {
            var stocks = [];
            if (items.stocksList) {
                stocks = items.stocksList;
            }

            s.setState({
                value: val,
                stocksList: stocks
            });
        });
    }

    handleChange(event) {
        var stocks = this.state.stocksList;
        this.setState({
            value: event.target.value,
            stocksList: stocks
        });
    }

    handleSubmit(event) {
        if (!this.state.value || this.state.value == undefined || this.state.value == '') {
            return;
        }

        if(this.state.stocksList.includes(this.state.value.toLowerCase())) {
            alert("You've already added this stock!");
            return;
        }

        isValidTickerSymbol(this.state.value).then((result) => {
            if (result.res) {
                var stocks = this.state.stocksList;
                stocks = [...stocks, this.state.value.toLowerCase()];
                chrome.storage.sync.set({ 'stocksList': stocks }, function () {
                });

                var val = this.state.value;
                this.setState({
                    value: val,
                    stocksList: stocks
                });
                console.log(JSON.stringify(result.data));
                this.newStockAdded(result.data);
            }
            else {
                alert('Please enter a valid ticker symbol! Come on....');
            }
        });

        event.preventDefault();
    }

    render() {
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
                        {this.state.stocksList}
                    </div>
                    <div className='flex__item'>
                        <div className='level'>
                            <div className='level__inner'>
                                <h3 className='heading heading--level-3 util--text-align-c'>Click a stock price to change color.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
};

export default Main;