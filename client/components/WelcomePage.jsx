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
                {/* <img src='https://avatars.githubusercontent.com/u/94339613?v=4'></img> */}
            </div>
        )
    }
}

export default WelcomePage;
