var request = require('request');

var BTCEAdapter = {
    name: 'BTC-e',
    provides: [
        ['btc','usd'],
        ['btc','eur'],
        ['btc','rur'],
        ['ltc','btc']
    ],
    get_pair: function(from,to,callback) {
        // console.log(from,to);
        // if(['usd', 'eur', 'gbp', 'rub'].indexOf(to) == -1) {

        //     // btc-e is backwards for altcoins, so flip the pair!
        //     var tmp = to;
        //     to = from;
        //     from = tmp;
        // }
        console.log(from,to);

        var pair = [from,to].join('_'),
            ticker_url = 'https://wex.nz/api/2/'+pair+'/ticker';
        
        request(ticker_url, function(error,response,body) {
            if(error || response.statusCode != 200) {
                console.error(this.name, 'Invalid response code or server error:',error,response.statusCode);
                return callback(true,null);
            }
            var ticker_data = JSON.parse(body);
            if(!('ticker' in ticker_data) || !('last' in ticker_data['ticker'])) {
                return callback(true,null);
            }
            return callback(false, ticker_data['ticker']['last']);

        }.bind(this));
    },
}

module.exports = BTCEAdapter;
