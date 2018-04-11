import React, { Component } from 'react';
import '../styles/match-list.css';
import Match from './match';

class MatchList extends Component {

	renderMatches() {
		const sortedMatches = this.props.matches.sort().reverse();
		return sortedMatches.map((match, idx) => {
			return <Match key={'match' + idx} match={match} accountId={this.props.accountId} />
		});
	}

	render() {
		return (
			<div>
				<p>Match history</p>
				{this.renderMatches()}
			</div>
		);
	}
}

export default MatchList;
