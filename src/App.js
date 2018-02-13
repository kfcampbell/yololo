import React from 'react'
import axios from 'axios'
import { mouseTrap } from 'react-mousetrap'
import Main from './Main';
import ConstantsList from './Utils/Constants';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      stockData: [],
      colorSchemeIndex: 0,
    }
    this.changeIndex = this.changeIndex.bind(this)
  }

  componentWillMount() {
    this.props.bindShortcut('space', this.changeIndex)
  }

  // idea: when instantiating main, pass in a function that causes this component to re-render.
  // then main can call it when a new stock is added.
  // first, need to alter this call to get each stock (maybe collect an array of Promises and then resolve all?)
  componentDidMount() {
    axios.get('https://api.iextrading.com/1.0/stock/alk/quote').then((data) => {
      const singleStockData = data.data;
      this.setState({
        stockData: [...this.state.stockData, singleStockData],
        loading: false,
      })
    });
  }

  generateRandomNumber(messages) {
    return Math.floor(Math.random() * messages.length)
  }

  generateRandomColorSchemeIndex() {
    return Math.floor(Math.random() * ConstantsList.colorSchemes.length)
  }

  changeIndex() {
    this.setState({
      colorSchemeIndex: this.generateRandomColorSchemeIndex()
    })
  }

  newStockAdded(stocks) {
    console.log('new stock added!', stocks);
  }
  
  // need to pass in newStockAdded to Main as a prop.
  // don't think any other props being passed to Main matter.
  render() {
    let backgroundColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].backgroundColor
    let headingColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].headingColor

    if (this.state.loading) {
      return (
        <Main newStockAdded={this.newStockAdded} {...this.props}>
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
      <Main {...this.props} backgroundColor={backgroundColor}>
        <div className='level' onClick={this.changeIndex}>
          <div className='level__inner'>
            <h2 className='heading heading--level-1 util--text-align-c' style={{ color: headingColor }}>
              {this.state.stockData[0].symbol}: ${this.state.stockData[0].latestPrice}</h2>
          </div>
        </div>
      </Main>
    )
  }
}

export default mouseTrap(App);
