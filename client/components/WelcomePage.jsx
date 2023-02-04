import React, { Component } from 'react';
import Header from './Header';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <img src="https://images2.imgbox.com/db/bb/mB9SIWMw_o.png" alt="image host" width="375px"/>
            </div>
        )
    }
}

export default WelcomePage;
