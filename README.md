# india-mutual-fund-info
This package provides a Javascript function interface for accessing historical and current information about Indian Mutual Funds. Text data is downloaded from AMFI's portal https://www.amfiindia.com/ and returned as an object array.

## Usage
```javascript
const nav = require('india-mutual-fund-info');

(async () => {
    
    // https://www.amfiindia.com/spages/NAVAll.txt
    const infoArrToday = await nav.today(); 

    const fromDate = new Date("1 April 2020");
    const toDate = new Date("15 May 2020"); 
    
    // https://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=1&frmdt=1-Apr-2020&todt=15-May-2020
    const infoArrHistorical = await nav.history(fromDate,toDate); 
    
})();
```
```javascript
console.log(infoArrToday[0]);
```
```javascript
{
  'Scheme Code': '119551',
  'ISIN Div Payout/ ISIN Growth': 'INF209KA12Z1',
  'ISIN Div Reinvestment': 'INF209KA13Z9',
  'Scheme Name': 'Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - IDCW',
  'Net Asset Value': '154.6417',
  Date: '21-May-2021',
  'AMC Name': 'Aditya Birla Sun Life Mutual Fund',
  'Scheme Type': 'Open Ended Schemes(Debt Scheme - Banking and PSU Fund)'
}
```
```javascript
console.log(infoArrHistorical[0]);
```
```javascript
{
  'Scheme Code': '120352',
  'Scheme Name': 'Sahara Infrastructure Fund ---FIXED PRICING -Direct-Dividend',
  'ISIN Div Payout/ISIN Growth': 'INF515L01924',
  'ISIN Div Reinvestment': 'INF515L01932',
  'Net Asset Value': '20.328',
  'Repurchase Price': '',
  'Sale Price': '',
  Date: '01-Apr-2020',
  'AMC Name': 'Sahara Mutual Fund',
  'Scheme Type': 'Open Ended Schemes ( Growth )'
}
```
