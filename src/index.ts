import { load } from "cheerio";
import fetchRetry, { RequestInitRetryParams } from "fetch-retry";

let fetch: (input: URL | RequestInfo, init?: (RequestInit & RequestInitRetryParams<(input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>>) | undefined) => Promise<Response>;

(async () => {
	let origFetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response> = globalThis?.fetch;
	if (!origFetch && process?.versions?.node) origFetch = <any> (await import("node-fetch")).default;
	fetch = fetchRetry(origFetch, {
		retries: 100,
		retryOn: (_att, err, res) => !!(err !== null || res!.status >= 400),
		retryDelay: (attempt) => Math.pow(2, attempt) * 1000,
	});
})();

const wikiRegex = /(https?:\/\/)?(en\.)?wikipedia\.org\/wiki\/.*/;
const philoRegex = /(https?:\/\/)?(en\.)?wikipedia\.org\/wiki\/Philosophy$/;
const namespaces = [
	"User",
	"Wikipedia",
	"File",
	"MediaWiki",
	"Template",
	"Help",
	"Category",
	"Portal",
	"Draft",
	"TimedText",
	"Module",
];

interface Option {
	banNamespaces?: boolean;
	log?: boolean;
}

export default async function isWikiPhilosophy(url: string, option: Option = {}, stack: string[] = []) {
	if (!wikiRegex.test(url)) throw new Error("Only English Wikipedia links are supported.");
	if (philoRegex.test(url)) return { state: true, stack };
	const urlObj = new URL(url);
	url = "https://en.wikipedia.org" + urlObj.pathname;
	if (option.log) console.log(url);
	if (stack.some(l => l == url)) return { state: false, stack };
	while (!fetch) await sleep(100);
	const res = await fetch(url, { headers: { 'User-Agent': "Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0" } });
	if (!res.ok) throw new Error("HTTP Status Code: " + res.status);
	const html = await res.text();
	const $ = load(html);
	const newUrl = "https://en.wikipedia.org" +
		$("div.mw-content-ltr > p a")
			.filter((_ii, a) =>
				a.attribs.href.startsWith("/") &&
				(!option.banNamespaces || namespaces.every(ns => !a.attribs.href.split("/")[2].startsWith(ns))))
			.first().attr()?.href;
	stack.push(url);
	return isWikiPhilosophy(newUrl, option, stack);
}

async function sleep(ms: number) {
	await new Promise(res => setTimeout(res, ms));
}