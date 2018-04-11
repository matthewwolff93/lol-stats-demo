import React, { Component } from 'react';
import axios from 'axios';
import '../styles/app.css';
import MatchList from './match-list';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = { matches: null, summoner: null };
	}

	componentDidMount() {
		const accountId = 200018706;
		// Need this proxy to prevent CORS issue with GET request
		// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		// TODO: Store apikey in a secure place
		// const url = 'https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/200018706/recent?api_key=RGAPI-ddb11cdf-6c59-41d2-bcf3-158ec890e7ab';

		// axios.get(proxyUrl + url)
		// .then(response => {
		// 	this.setState({ matches: response.data.matches });
		// }).catch(error => {
		// 	console.error(error);
		// });

		const data = JSON.parse('{"matches":[{"platformId":"OC1","gameId":203143152,"champion":22,"queue":450,"season":11,"timestamp":1521436233677,"role":"DUO","lane":"MID"},{"platformId":"OC1","gameId":197983753,"champion":16,"queue":450,"season":11,"timestamp":1516435947567,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":186547362,"champion":67,"queue":430,"season":9,"timestamp":1506326856481,"role":"DUO_CARRY","lane":"BOTTOM"},{"platformId":"OC1","gameId":186524542,"champion":37,"queue":430,"season":9,"timestamp":1506306070522,"role":"DUO_SUPPORT","lane":"BOTTOM"},{"platformId":"OC1","gameId":186523437,"champion":106,"queue":430,"season":9,"timestamp":1506303172100,"role":"DUO_SUPPORT","lane":"BOTTOM"},{"platformId":"OC1","gameId":186522845,"champion":91,"queue":450,"season":9,"timestamp":1506301434587,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":186045365,"champion":42,"queue":450,"season":9,"timestamp":1505899865679,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":186034623,"champion":81,"queue":980,"season":9,"timestamp":1505898325945,"role":"NONE","lane":"JUNGLE"},{"platformId":"OC1","gameId":179634427,"champion":4,"queue":65,"season":9,"timestamp":1500069690821,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":179535856,"champion":99,"queue":65,"season":9,"timestamp":1500008716997,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":179573393,"champion":21,"queue":65,"season":9,"timestamp":1500006846419,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178938552,"champion":96,"queue":300,"season":9,"timestamp":1499566972824,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178942941,"champion":15,"queue":300,"season":9,"timestamp":1499565404058,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178937799,"champion":20,"queue":65,"season":9,"timestamp":1499563949977,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178937393,"champion":76,"queue":65,"season":9,"timestamp":1499562200051,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178937061,"champion":67,"queue":65,"season":9,"timestamp":1499560159806,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178936858,"champion":21,"queue":65,"season":9,"timestamp":1499558826588,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178851910,"champion":37,"queue":300,"season":9,"timestamp":1499424106928,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178850905,"champion":51,"queue":300,"season":9,"timestamp":1499422649350,"role":"NONE","lane":"MID"},{"platformId":"OC1","gameId":178827438,"champion":31,"queue":300,"season":9,"timestamp":1499421350739,"role":"NONE","lane":"MID"}],"startIndex":0,"endIndex":20,"totalGames":22}');
		this.setState({ matches: data.matches });
	}

	fetchApiData(subUrl) {
		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const url = `https://oc1.api.riotgames.com/lol/${subUrl}/?api_key=RGAPI-ddb11cdf-6c59-41d2-bcf3-158ec890e7ab`;

		return axios.get(proxyUrl + url);
	}

	getRecentMatches(accountId) {
		this.fetchApiData(`match/v3/matchlists/by-account/${accountId}/recent`)
		.then(response => {
			this.setState({ matches: response.data.matches });
		}).catch(error => console.error(error));
	}

	getChampionInfo(championId) {
		this.fetchApiData(`static-data/v3/champions/${championId}`)
			.then(response => {
				response.data
			}).catch(error => console.error(error));
	}

	getSummonerInfo(accountId) {
		this.fetchApiData(`summoner/v3/summoners/by-account/${accountId}`)
			.then(response => {
				response.data
			}).catch(error => console.error(error));
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">League of Legends Stats Demo</h1>
				</header>
				<main>
					{this.state.matches && <MatchList matches={this.state.matches} />}
				</main>
			</div>
		);
	}
}

export default App;
