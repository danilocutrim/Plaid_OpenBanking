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
    app.get('/balance', function(request, response, next){
        client.getBalance(ACCESS_TOKEN,function(error, balanceResponse){
            if(error = null){
                console.log(error)
                return response.json({
                    error: error,
                })
            }
        console.log(balanceResponse.accounts)
        response.json({error: null, balance: balanceResponse})
        })
    })
}
