import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };

    componentDidMount = () => {
        window.navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                lat: position.coords.latitude
            });
        },
            err => this.setState({ errorMessage: err.message }));
    }

    renderContent() {
        if (this.state.lat && !this.state.errorMessage) {
            return <SeasonDisplay latitude = {this.state.lat} />
        }
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        return <Spinner message="Please accept the geolocation..."/>
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
};

ReactDOM.render(<App />, document.querySelector('#root'));