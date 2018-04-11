import React, { Component } from 'react';
import '../styles/app.css';
import MatchList from './match-list';

import * as ApiHelper from './api-helper';

class App extends Component {

	accountId = 200018706;

	constructor(props) {
		super(props);
		this.state = { matches: null, summonerName: null };
	}

	componentDidMount() {
		this.fetchRecentMatches(this.accountId);
		this.fetchSummonerName(this.accountId);
	}

	fetchRecentMatches(accountId) {
		ApiHelper.fetchApiData(`match/v3/matchlists/by-account/${this.accountId}/recent`)
		.then(response => {
			const shortenedMatches = response.data.matches.slice(0, 4);
			this.setState({ matches: shortenedMatches });
		}).catch(error => console.error(error));
	}

	fetchSummonerName(accountId) {
		ApiHelper.fetchApiData(`summoner/v3/summoners/by-account/${this.accountId}`)
			.then(response => this.setState({ summonerName: response.data.name }))
			.catch(error => console.error(error));
	}

	render() {
		return (
			<div className="app">
				<header>
					<h1>League of Legends Stats Demo</h1>
					<h2>{this.state.summonerName}</h2>
				</header>
				<main>
					{this.state.matches && <MatchList matches={this.state.matches} accountId={this.accountId} />}
					{!this.state.matches && <div className="loader-container"><div className="loader"></div></div>}
				</main>
			</div>
		);
	}
}

export default App;
