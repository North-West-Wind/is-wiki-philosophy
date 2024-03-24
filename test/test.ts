import isWikiPhilosophy from "../dist";

(async () => {
	console.log(await isWikiPhilosophy("https://en.wikipedia.org/wiki/Trade_winds", { log: true, banNamespaces: true }));
})();