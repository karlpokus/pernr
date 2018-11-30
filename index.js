const Pernr = require('./lib/pernr');
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
	valid: function(ssn, cb) {
		try {
			const pnr = new Pernr(ssn);
			cb(pnr.isValid().toString());
		} catch(err) {
			cb('false');
		}
	},
	gen: function(n, cb) {
		if (isInt(n)) {
			cb(ssns(+n));
		} else {
			cb(null, new Error('Error: opt is not a number'));
		}
	}
};

function reply(data, err) {
	if (err) {
		console.error(usage(err.message));
		process.exit(1);
	}
	console.log(data);
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

function main(cmd, opt) {
	if (cmd != 'valid' && cmd != 'gen') {
		reply(null, new Error('Error: invalid cmd'));
	}
	if (!opt) {
		reply(null, new Error('Error: opt missing'));
	}
	handlers[cmd](opt, reply);
}

const [ cmd, opt ] = process.argv.slice(2);
main(cmd, opt);
//console.log(cmd, opt);
