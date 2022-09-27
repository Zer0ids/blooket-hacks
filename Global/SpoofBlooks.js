if (!window.location.pathname.split('/').includes('lobby')) return alert('You must be in a game lobby! (e.g. https://www.blooket.com/play/lobby)');
reactHandler().stateNode.setState({
	lockedBlooks: [],
	takenBlooks: []
});
