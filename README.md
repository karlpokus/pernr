# wat?
This fork contains the following branches:
- `feature/add-random-pernr` with [pending PR](https://github.com/arokor/pernr/pull/4)
- `fix/heroku-deploy` for heroku deploy of an ssn-machine
- `fix/no-limit` fork of the heroku branch without a limit on ssn generation. Intended for local use.

# ssn-machine
Public http api for validating-, or creating valid ssns (<1000). Deployed on a free tier heroku node so partial downtime is to be expected.

```bash
# usage
GET https://ssn-machine.herokuapp.com
# return n valid ssns
GET /gen?n=<number>
# returns true if ssn is valid
GET /valid?ssn=<ssn>
```

# no-limit
Run this on you local machine. I benchmarked 1M ssns generated to 5.018 secs.

```bash
$ node index.js gen|valid num|ssn > file
```

# todos
- [x] add fullyear to ssns
- [x] remove http from local scope
- [ ] only return unique ssns compared to POST payload

# license
Whatever the original repo had
