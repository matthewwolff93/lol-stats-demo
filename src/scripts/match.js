import React from 'react';

const Match = (props) => {
	return (
		<div>
			<table>
				<tr>
					<th>Outcome</th>
					<th>Game length</th>
					<th>Summoner name</th>
					<th>Summoner spells</th>
					<th>Champion played</th>
					<th>KDA</th>
					<th>Items</th>
					<th>Level</th>
					<th>Total creep score</th>
					<th>Creep score per minute</th>
				</tr>
				<tr>
					<td>{props.match.gameId}</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
	);
}

export default Match