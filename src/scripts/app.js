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
		const data = JSON.parse('{"matches":[{"platformId":"OC1","gameId":203143152,"champion":22,"queue":450,"season":11,"timestamp":1521436233677,"role":"DUO","lane":"MID"},{"platformId":"OC1","gameId":197983753,"champion":16,"queue":450,"season":11,"timestamp":1516435947567,"role":"NONE","lane":"MID"}],"startIndex":0,"endIndex":20,"totalGames":22}');
		this.setState({ matches: data.matches });

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
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">League of Legends Stats Demo</h1>
					<h2>{this.state.summonerName}</h2>
				</header>
				<main>
					{this.state.matches && <MatchList matches={this.state.matches} accountId={this.accountId} />}
				</main>
			</div>
		);
	}
}

export default App;
