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
		out.push(pnr.toString({fullYear: true}));
	}
	return out.join('\n');
}

const handlers = {
	GET: {
		valid: function({ ssn }, req, cb) {
			if (!ssn) {
				return cb(null, new Error('Error: queryparam <ssn> missing'));
			}

			try {
				const pnr = new Pernr(ssn);
				cb(pnr.isValid().toString());
			} catch(err) {
				cb('false');
			}
		},
		gen: function({ n }, req, cb) {
			if (!n) {
				return cb(null, new Error('Error: queryparam <n> missing'));
			}

			if (isInt(n) && +n < 1000) {
				cb(ssns(+n));
			} else {
				cb(null, new Error('Error: queryparam <n> is not a number or above the limit of 1000'));
			}
		}
	},
	POST: { // wip
		uniq: function({ n }, req, cb) {
			if (!n) {
				cb(null, new Error('Error: queryparam <n> missing'));
			}

			let data = "";
			req
				.on('data', chunk => data += chunk)
				.on('end', () => cb(data || "no data"))
		}
	}
};

function parseUrlParts(req) {
	const parts = url.parse(req.url, true); // 2nd arg parses queryParams into {}
	const path = parts.pathname.substr(1); // remove /
	return {
		method: req.method,
		path: path ? path : "non-existent-key", // avoid looking up empty string as key on handlers
		query: parts.query
	}
}

function reply(res, data, err) {
	if (err) {
		data = usage(err.message); // err + usage
	}

	res.writeHead(200);
	res.end(data);
}

function usage(err) {
	return `
		${ err || "" }

		api

			GET /
				returns usage
			GET /gen?n=<number of ssns to create>
				return n valid ssns
			GET /valid?ssn=<ssn>
				returns true if ssn is valid
	`;
}

function router(req, res) {
	const { method, path, query } = parseUrlParts(req);

	if (handlers[method] && handlers[method][path]) {
		handlers[method][path](query, req, reply.bind(null, res));
	} else {
		reply(res, usage()); // usage
	}
}

srv.on('request', router).listen(PORT, () => console.log('api started on port', PORT));
