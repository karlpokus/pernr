# wat?
This fork contains the following branches:
- `feature/add-random-pernr` with [pending PR](https://github.com/arokor/pernr/pull/4)
- `fix/heroku-deploy` for heroku deploy of an ssn-machine
- `fix/no-limit` fork of the heroku branch without a limit on ssn generation. Intended for local use.

# ssn-machine
Public api for validating-, or creating valid ssns (<1000). Deployed on a free tier heroku node so partial downtime is to be expected.

```bash
# usage
GET https://ssn-machine.herokuapp.com
# return n valid ssns
GET /gen?n=<number>
# returns true if ssn is valid
GET /valid?ssn=<ssn>
```

# no-limit
Run this on you local machine. Same api as the ssn-machine. A quick load test of 100k ssns generated resulted in 85 MB mem usage.

```bash
$ node index.js
$ curl -s "localhost:5555/$API > file
```

# todos
- [x] add fullyear to ssns
- [ ] only return unique ssns compared to POST payload

# license
Whatever the original repo had
