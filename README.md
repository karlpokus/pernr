# wat?
This fork contains (1) a feature branch for creating a valid random ssn ([pending PR](https://github.com/arokor/pernr/pull/4)) and (2) a branch for a heroku deploy of an ssn-machine.

# ssn-machine
api for creating n valid random ssns. Note: deployed on a free tier heroku node so partial downtime is to be expected.

# usage
```bash
# usage
GET https://ssn-machine.herokuapp.com
# return n valid ssns
GET /gen?n=<number>
# returns true if ssn is valid
GET /valid?ssn=<ssn>
```

# todos
- [x] add fullyear to ssns
- [ ] only return unique ssns compared to POST payload

# license
Whatever the original repo had
