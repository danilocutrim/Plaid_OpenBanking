const plaid = require('plaid')
const envvar = require('envvar')
const moment = require('moment')
const token = require('./get_access_token.js')

var APP_PORT = envvar.number('APP_PORT', 8000);
var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
var PLAID_SECRET = envvar.string('PLAID_SECRET');
var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2018-05-22'}
);

module.exports = function(app){
    ACCESS_TOKEN = token.ACCESS_TOKEN;
    app.get('/transactions', function(request, response, next) {
        var startDate = moment().subtract(30,
        'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
        count: 250,
        offset: 0,
        }, function(error, transactionsResponse) {
        if (error != null) {
            var msg = 'Could not exchange public_token!';
            console.log(msg + '\n' + JSON.stringify(error));
            return response.json({
                error: msg
            });
        }
        else {
            console.log(transactionsResponse);
            response.json({error: false, transactions:
            transactionsResponse});
            }
        });
    });
}