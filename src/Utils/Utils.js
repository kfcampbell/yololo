import axios from 'axios';

export function isValidTickerSymbol(symbol) {
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
        .then((data) => {
            const singleStockData = data.data;
            if (!data.data) {
                console.log('wrong symbol!');
                return {res: false};
            }
            else {
                return {
                    res: true,
                    data: data.data 
                };
            }
        })
        .catch((error) => {
            console.log(error);
            return {res: false};
        });
}