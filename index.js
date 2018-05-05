const http = require('http');
const url = require('url');
const Pernr = require('./lib/pernr');
const srv = http.createServer();
const PORT = process.env.PORT || 5555;
const isInt = (n) => !isNaN(parseFloat(n)) && isFinite(n) && !/\./.test(n);

function ssns(n) {
	let i = 0;
	let out = [];
	let pnr;

	for (i; i < n; i++) {
		pnr = new Pernr();
		out.push(pnr.toString());
	}
	return out.join('\n');
}

function api(req, res) {
	const { n } = url.parse(req.url, true).query;
	let reply;

	if (n && isInt(n) && +n < 1000) {
		reply = ssns(+n);
	} else {
		reply = 'usage: add number of ssns to create in query param n';
	}

	res.writeHead(200);
	res.end(reply);
}

srv.on('request', api).listen(PORT, () => console.log('api running..'));
