//modify the config to use mongo locally TODO
module.exports = {
  "db": {
        "mongodb": "mongodb://username:password@dsXXXXX.mongolab.com:45077/databasename"
    },
    "logger": {
        "api": "logs/api.log",
        "exception": "logs/exceptions.log"
    }
};
