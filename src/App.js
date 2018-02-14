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
      loading: true,
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
            stockData: stocks
          });
        });
      });
    });
  }

  newStockAdded(stockInfo) {

    var stocksSymbols = this.state.stockData.map(x => x.symbol);
    stocksSymbols = [...stocksSymbols, stockInfo.symbol];

    chrome.storage.sync.set({ 'stocksList': stocksSymbols }, function () {
      console.log('successfully updated stocks');
    });

    this.setState({
      stockData: [...this.state.stockData, stockInfo],
      loading: false
    });
  }

  render() {
    let backgroundColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].backgroundColor
    let headingColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].headingColor

    if (this.state.loading) {
      return (
        <Main newStockAdded={this.newStockAdded.bind(this)} headingColor={headingColor} stocks={this.state.stockData} {...this.props}>
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </Main>
      )
    }

    return (
      <Main {...this.props} backgroundColor={backgroundColor} stocks={this.state.stockData} headingColor={headingColor}>
        <div className='level'>
          <div className='level__inner'>
            {
              this.state.stockData.map(function (stockData, index) {
                return (
                  <h2 className='heading heading--level-1 util--text-align-c' key={index} style={{ color: headingColor }}>
                    {stockData.symbol}: ${stockData.latestPrice}</h2>);
              })
            }
          </div>
        </div>
      </Main>
    )
  }
}

export default mouseTrap(App);
