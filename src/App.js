import React from 'react'
import axios from 'axios'
import { mouseTrap } from 'react-mousetrap'
import Main from './Main';
import ConstantsList from './Utils/Constants';
import { isValidTickerSymbol } from './Utils/Utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      colorSchemeIndex: 0,
    };
  }

  componentDidMount() {

    var s = this;
    chrome.storage.sync.get(['stocksList'], function (items) {
      var stocks = [];
      if (!items.stocksList) {
        return;
      }

      items.stocksList.forEach(stock => {
        isValidTickerSymbol(stock).then((result) => {
          if (!result.res) {
            return;
          }
          stocks = [...stocks, result.data];
          s.setState({
            stockData: stocks,
          });
        });
      });
    });
  }

  newStockAdded(stockInfo) {

    var stocksSymbols = this.state.stockData.map(x => x.symbol);
    stocksSymbols = [...stocksSymbols, stockInfo.symbol];

    chrome.storage.sync.set({ 'stocksList': stocksSymbols }, function () {
    });

    this.setState({
      stockData: [...this.state.stockData, stockInfo],
    });
  }

  stockRemoved(tickerSymbol) {
    var stocksSymbols = this.state.stockData.map(x => x.symbol);
    stocksSymbols = stocksSymbols.filter(x => x !== tickerSymbol);

    var stocksData = this.state.stockData.filter(x => x.symbol !== tickerSymbol);

    chrome.storage.sync.set({ 'stocksList': stocksSymbols }, function () {
    });

    this.setState({
      stockData: stocksData
    });
  }

  render() {
    let backgroundColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].backgroundColor
    let headingColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].headingColor

    return (
      <Main {...this.props}
        newStockAdded={this.newStockAdded.bind(this)}
        stockRemoved={this.stockRemoved.bind(this)}
        backgroundColor={backgroundColor}
        stocks={this.state.stockData}
        headingColor={headingColor}>
      </Main>
    )
  }
}

export default mouseTrap(App);
