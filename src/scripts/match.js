import React, { Component } from 'react';
import * as ApiHelper from './api-helper';
import _ from 'lodash';

class Match extends Component {

	constructor(props) {
		super(props);
		this.state = {
			championName: null,
			gameDuration: null,
			summonerSpells: null,
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
				const summonerSpells = this.getSummonerSpells(participant);
				const kda = this.getKDA(participant);
				const level = this.getLevel(participant);
				const totalCreepsKilled = this.getTotalCreepScore(participant);
				const creepScorePerMinute = this.getCreepScorePerMinute(totalCreepsKilled, match.gameDuration);

				this.setState({
					gameDuration,
					summonerSpells,
					kda,
					level,
					totalCreepsKilled,
					creepScorePerMinute
				});
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
		return [participant.spell1Id, participant.spell2Id];
	}

	getKDA(participant) {
		const stats = participant.stats;
		return { kills: stats.kills, deaths: stats.deaths, assists: stats.assists };
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
							<td>{this.state.summonerSpells}</td>
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