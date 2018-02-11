import React from 'react'
import axios from 'axios'
import { mouseTrap } from 'react-mousetrap'

const colorSchemes = [
  {
    backgroundColor: '#062F4F',
    headingColor: '#4ABDAC',
  },
  {
    backgroundColor: '#EA526F',
    headingColor: '#FCEADE'
  },
  {
    backgroundColor: '#171738',
    headingColor: '#DFF3EF'
  },
  {
    backgroundColor: '#272932',
    headingColor: '#72B01D'
  },
  {
    backgroundColor: '#72B01D',
    headingColor: '#001D4A'
  },
  {
    backgroundColor: '#103900',
    headingColor: '#0FFF95'
  },
  {
    backgroundColor: '#1D1E2C',
    headingColor: '#DDBDD5'
  },
  {
    backgroundColor: '#59656F',
    headingColor: '#F7EBEC'
  },
  {
    backgroundColor: '#292F36',
    headingColor: '#FF6B6B'
  },
  {
    backgroundColor: '#373F51',
    headingColor: '#DAA49A'
  },
  {
    backgroundColor: '#424242',
    headingColor: '#FCFC62'
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      stockData: [],
      colorSchemeIndex: 0,
      value: ''
    }
    this.changeIndex = this.changeIndex.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        value: ''
      })
    })
  }

  generateRandomNumber(messages) {
    return Math.floor(Math.random() * messages.length)
  }

  generateRandomColorSchemeIndex() {
    return Math.floor(Math.random() * colorSchemes.length)
  }

  changeIndex() {
    this.setState({
      colorSchemeIndex: this.generateRandomColorSchemeIndex()
    })
  }

  handleChange(event) {
    console.log("Form was submitted!");
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    let backgroundColor = colorSchemes[this.state.colorSchemeIndex].backgroundColor
    let headingColor = colorSchemes[this.state.colorSchemeIndex].headingColor

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


const Main = (props) => {
  return (
    <main className='body' role='main' style={{ backgroundColor: props.backgroundColor }}>
      <div className='flex-container'>
        <div className='flex__item'>
          <div className='level level--padding-short'>
            <div className='level__inner'>
              <h1 className='heading heading--level-2 util--text-align-c'>Stocks 'n' Stuff</h1>
            </div>
          </div>
        </div>


        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>


        <div className='flex__item'>
          {props.children}
        </div>
        <div className='flex__item'>
          <div className='level'>
            <div className='level__inner'>
              <h3 className='heading heading--level-3 util--text-align-c'>Click to change color.</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default mouseTrap(App)
