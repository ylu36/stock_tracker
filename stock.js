var axios = require('axios');
const fs = require('fs');

const API_KEY = "7DDA68YJEWPNYHEB"

const percent = (open, close) => {
    return Number.parseFloat((close - open) / open * 100).toPrecision(3);
}

const getDailyQuote = async (ticker) => {
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}&adjusted=true&outputsize=full`;
    let response = await axios.get(url);
    let data = response.data['Time Series (Daily)'];
    let res = [];
    Object.keys(data).forEach(function(date){
        res.push(percent(data[date]['1. open'], data[date]['4. close']));
    });
    return res;
}

const main = async () => {
    uvxyData = await getDailyQuote('uvxy');
    tqqqData = await getDailyQuote('tqqq');
    length = uvxyData.length;
    tqqqData = tqqqData.slice(0, length);
    log(uvxyData.toString(), 'uvxy');
    log(tqqqData.toString(), 'tqqq');
}

const log = async(data, fileName) => {
    fs.writeFile(`./${fileName}.txt`, data, { flag: 'a+' },err => {
        if (err) {
          console.error(err)
          return
        }
    });
}

main();