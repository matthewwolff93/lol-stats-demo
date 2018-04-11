import React, { Component } from 'react';
import * as ApiHelper from './api-helper';
import _ from 'lodash';
import Promise from 'core-js/es6/promise'

class Match extends Component {

	constructor(props) {
		super(props);
		this.state = {
			championName: null,
			gameDuration: null,
			spell1: null,
			spell2: null,
			kda: null,
			level: null,
			totalCreepsKilled: null,
			creepScorePerMinute: null
		};
	}

	componentDidMount() {
		this.getChampionName(this.props.match.champion);
		this.getMatchDetails(this.props.match.gameId);
	}

	getChampionName(championId) {
		ApiHelper.fetchApiData(`static-data/v3/champions/${championId}`)
			.then(response => this.setState({ championName: response.data.name }))
			.catch(error => console.error(error));
	}

	getMatchDetails(matchId) {
		ApiHelper.fetchApiData(`match/v3/matches/${matchId}`)
			.then(response => {
				const match = response.data;
				const gameDuration = this.convertGameDuration(match.gameDuration);
				const participantId = this.getParticipantId(match, this.props.accountId);
				const participant = this.getParticipantDetails(match, participantId);
				const kda = this.getKDA(participant);
				const level = this.getLevel(participant);
				const totalCreepsKilled = this.getTotalCreepScore(participant);
				const creepScorePerMinute = this.getCreepScorePerMinute(totalCreepsKilled, match.gameDuration);

				this.setState({
					...this.state,
					gameDuration,
					kda,
					level,
					totalCreepsKilled,
					creepScorePerMinute
				});

				this.getSummonerSpells(participant);
				this.getItems(participant);
			}).catch(error => console.error(error));
	}

	getParticipantId(match, accountId) {
		const participant = _.find(match.participantIdentities, (participant) => {
			return participant.player.currentAccountId === accountId;
		});

		return participant.participantId;
	}

	getParticipantDetails(match, participantId) {
		const participant = _.find(match.participants, (participant) => {
			return participant.participantId === participantId;
		});
		return participant;
	}

	getSummonerSpells(participant) {
		const spell1 = this.fetchSummonerSpell(participant.spell1Id);
		const spell2 = this.fetchSummonerSpell(participant.spell2Id);
		Promise.all([spell1, spell2])
			.then(response => this.setState({...this.state, spell1: response[0].data.name, spell2: response[1].data.name}))
			.catch(error => console.error(error));
	}

	fetchSummonerSpell(spellId) {
		return ApiHelper.fetchApiData(`static-data/v3/summoner-spells/${spellId}`);
	}

	getKDA(participant) {
		const stats = participant.stats;
		return { kills: stats.kills, deaths: stats.deaths, assists: stats.assists };
	}

	getItems(participant) {
		const item1 = this.fetchItem(participant.stats.item0);
		const item2 = this.fetchItem(participant.stats.item1);
		const item3 = this.fetchItem(participant.stats.item2);
		const item4 = this.fetchItem(participant.stats.item3);
		const item5 = this.fetchItem(participant.stats.item4);
		const item6 = this.fetchItem(participant.stats.item5);
		const item7 = this.fetchItem(participant.stats.item6);

		Promise.all([item1, item2, item3, item4, item5, item6, item7])
			.then(response => this.setState({...this.state, }))
			.catch(error => console.error(error));
	}

	fetchItem(itemId) {
		return ApiHelper.fetchApiData(`static-data/v3/items/${itemId}`);
	}

	getLevel(participant) {
		return participant.stats.champLevel;
	}

	getTotalCreepScore(participant) {
		return participant.stats.totalMinionsKilled;
	}

	getCreepScorePerMinute(totalCreepScore, gameDurationInMs) {
		const minutes = Math.floor(gameDurationInMs / 60);
		return (totalCreepScore / minutes).toFixed(2);
	}

	convertGameDuration(gameDurationInMs) {
		const minutes = Math.floor(gameDurationInMs / 60);
		const seconds = Math.floor(gameDurationInMs % 60);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<th>Outcome</th>
							<th>Game length</th>
							<th>Summoner spells</th>
							<th>Champion played</th>
							<th>KDA</th>
							<th>Items</th>
							<th>Level</th>
							<th>Total creep score</th>
							<th>Creep score per minute</th>
						</tr>
						<tr>
							<td>{this.props.match.gameId}</td>
							<td>{this.state.gameDuration}</td>
							<td>{`${this.state.spell1} ${this.state.spell2}`}</td>
							<td>{this.state.championName}</td>
							<td>{this.state.kda && `${this.state.kda.kills}/${this.state.kda.deaths}/${this.state.kda.assists}`}</td>
							<td></td>
							<td>{this.state.level}</td>
							<td>{this.state.totalCreepsKilled}</td>
							<td>{this.state.creepScorePerMinute}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Match