import React, { Component } from 'react';
import '../styles/match-list.css';
import Match from './match';

class MatchList extends Component {

	renderMatches() {
		return this.props.matches.map((match, idx) => {
			return <Match key={'match' + idx} match={match} />
		});
	}

	render() {
		return (
			<div>
				{this.renderMatches()}
			</div>
		);
	}
}

export default MatchList;
