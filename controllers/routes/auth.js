const plaid = require('plaid')
const envvar = require('envvar')
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
    ACCESS_TOKEN = token.ACCESS_TOKEN
    app.get('/auth', function(request, response, next) {
        PUBLIC_TOKEN = request.body.public_token;
        client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
            if (error != null) {
                var msg = 'Could not exchange public_token!';
                console.log(msg + '\n' + JSON.stringify(error));
                return response.json({
                    error: msg
                });
            }
            console.log(authResponse);
            response.json({error: null, auth: authResponse});
        });
    });
}