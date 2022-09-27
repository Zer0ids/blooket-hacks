let box = prompt(`Which box do you want to open? (e.g. Space)`);
let boxes = {
	safari: 25,
	aquatic: 20,
	bot: 20,
	space: 20,
	breakfast: 15,
	medieval: 15,
	wonderland: 15
}
if (!Object.keys(boxes).includes(box.toLowerCase())) return alert('I could not find that box!');
let amount = prompt('How many boxes do you want to open?');
fetch("https://api.blooket.com/api/users", {
	credentials: "include"
}).then(x => x.json()).then(x => {
	if (x.tokens < boxes[box.toLowerCase()] * amount) amount = Math.floor(x.tokens / boxes[box.toLowerCase()]);
	if (!amount) return alert('You do not have enough tokens!');
	let wait = ms => new Promise(r => setTimeout(r, ms));
	getValues().then(async e => {
		let error = false,
			blooks = [];
		for (let i = 0; i < amount; i++) {
			fetch("https://api.blooket.com/api/users/unlockblook", {
				method: "put",
				credentials: "include",
				headers: {
					"content-type": "application/json",
					"X-Blooket-Build": e.blooketBuild
				},
				body: await encodeValues({
					name: x.name,
					box: box.charAt(0).toUpperCase() + box.slice(1).toLowerCase()
				}, e.secret)
			}).then(async x => {
				let blook = await x.json();
				blooks.push(blook.unlockedBlook);
				alert(`${blook.unlockedBlook} (${i + 1}/${amount})`);
			}).catch(() => {
				error = true
			});
			await wait(750);
			if (error) break;
		}
		let count = {};
		blooks.forEach(blook => {
			count[blook] = (count[blook] || 0) + 1
		});
		alert(`Results:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`));
	}).catch(() => alert('There was an error encoding requests!'));
}).catch(() => alert('There was an error getting username!'));
