fetch("https://api.blooket.com/api/users", {
	credentials: "include"
}).then(x => x.json()).then(x => {
	getValues().then(async e => {
		fetch("https://api.blooket.com/api/users/add-rewards", {
			method: "put",
			credentials: "include",
			headers: {
				"content-type": "application/json",
				"X-Blooket-Build": e.blooketBuild
			},
			body: await encodeValues({
				name: x.name,
				addedTokens: 250,
				addedXp: 300
			}, e.secret)
		});
		fetch("https://api.blooket.com/api/users/add-rewards", {
			method: "put",
			credentials: "include",
			headers: {
				"content-type": "application/json",
				"X-Blooket-Build": e.blooketBuild
			},
			body: await encodeValues({
				name: x.name,
				addedTokens: 250,
				addedXp: 300
			}, e.secret)
		}).then(() => alert('Added daily rewawrds!')).catch(() => alert('There was an error when adding rewards!'));;
	}).catch(() => alert('There was an error encoding requests!'));
}).catch(() => alert('There was an error getting username!'));
