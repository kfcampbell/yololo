import React from 'react'
import axios from 'axios'
import { mouseTrap } from 'react-mousetrap'
import Main from './Main';
import ConstantsList from './Constants';

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

  componentDidMount() {
    axios.get('https://api.iextrading.com/1.0/stock/alk/quote').then((data) => {
      const singleStockData = data.data;
      this.setState({
        stockData: [...this.state.stockData, singleStockData],
        loading: false,
      })
    });
    console.log('test of constants', ConstantsList.ACTION_VALID);
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

  
  render() {
    let backgroundColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].backgroundColor
    let headingColor = ConstantsList.colorSchemes[this.state.colorSchemeIndex].headingColor

    if (this.state.loading) {
      return (
        <Main {...this.props}>
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

export default mouseTrap(App)
