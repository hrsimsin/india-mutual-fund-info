const fetch = require('node-fetch');

const isError = txt => !txt.split('\n')[0].toLowerCase().includes('scheme');

const fetchTxt = url =>
    new Promise((resolve, reject) => {
        fetch(url).then(
            (result) => { result.text().then((result) => { 
                if(isError(result))
                    reject('AMFI endpoint returned error.');
                else
                    resolve(result); 
            }, (reason) => { reject(reason) }) },
            (reason) => { reject(reason); });
    });


const txtToObjectArray = (txt) => {
    const removeBlankLines = txt => txt.replace(/(\n{2,})/gm, '\n').replace(/(\r)/gm, '');
    const isDataRow = row => row.split(';').length == headers.length;

    rows = removeBlankLines(txt).split('\n').filter(el => el.length>1);
    const headers = rows.shift().split(';');

    const arr = [];
    var schemeType = '';
    var amcName = '';

    for (var i = 0; i < rows.length; ++i) {
        const row = rows[i];
        if (isDataRow(row)) {
            const attr = row.split(';');
            const data = {};
            for (var j = 0; j < attr.length; ++j) {
                data[headers[j]] = attr[j];
            }
            data['AMC Name'] = amcName;
            data['Scheme Type'] = schemeType;
            arr.push(data);
        }
        else if (isDataRow(rows[i + 1])) {
            amcName = row;
        }
        else {
            schemeType = row;
        }
    }
    return (arr);
}

class NAV{
    static today(){
        return new Promise((resolve,reject)=>{
            fetchTxt('https://www.amfiindia.com/spages/NAVAll.txt').then(
                (result)=>{
                    resolve(txtToObjectArray(result));
                },
                (reason)=>{
                    reject(reason);
                }
            )
        });
    }

    static history(fromDate,toDate){
        const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
        const dateStr = date => `${date.getDate()}-${monthNames[date.getMonth()].substr(0,3)}-${date.getFullYear()}`;
        return new Promise((resolve,reject)=>{
            if(!(fromDate instanceof Date) || !(toDate instanceof Date)){
                reject('Parameters should be instances of Date class.');
            }
            if(fromDate.getTime()<1143829800000){
                reject('toDate should be >= (1 August 2006).');
            }
            if(fromDate>toDate){
                reject('toDate should be after fromDate.');
            }
            if(toDate-fromDate > 90*24*60*60*60*1000){
                reject('fromDate & toDate must me max 90 days apart.');
            }
            if(toDate>Date.now()+24*60*60*1000 || fromDate>Date.now()+24*60*60*1000){
                reject('Parameter dates should be before tommorrow.');
            }
            fetchTxt(`https://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?tp=1&frmdt=${dateStr(fromDate)}&todt=${dateStr(toDate)}`).then(
                (result)=>{
                    resolve(txtToObjectArray(result));
                },
                (reason)=>{
                    reject(reason);
                }
            )
        });
    }
}

module.exports=NAV;