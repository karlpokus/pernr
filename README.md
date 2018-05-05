# wat?
This fork contains (1) a feature branch for creating a valid random ssn ([pending PR](https://github.com/arokor/pernr/pull/4)) and (2) a branch for a heroku deploy of an ssn-machine.

# ssn-machine
api for creating n valid random ssns. Note: deployed on a free tier heroku node so partial downtime is to be expected.

# usage
```bash
GET https://ssn-machine.herokuapp.com?n=[ssns to create]
```

# todos
- [ ] add option for fullyear `obj.toString({fullYear:true})`
- [ ] only return unique ssns

# license
Whatever the original repo had
