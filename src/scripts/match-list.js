import React, { Component } from 'react';
import Match from './match';
import '../styles/match-list.css';

class MatchList extends Component {

	renderMatches() {
		const sortedMatches = this.props.matches.sort().reverse();
		return sortedMatches.map((match, idx) => {
			return <Match key={'match' + idx} match={match} accountId={this.props.accountId} />
		});
	}

	render() {
		return (
			<div className="match-list">
				<h3>Match history</h3>
				{this.renderMatches()}
			</div>
		);
	}
}

export default MatchList;
