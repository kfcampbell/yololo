import React from 'react';
import './Main.css';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'check it out',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("A letter was pressed: !");
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        alert('You clicked the submit button and nothing else: ' + this.state.value);
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
                        {this.props.children}
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