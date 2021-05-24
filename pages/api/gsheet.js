
import { google } from 'googleapis';
import keys from '../../jbid-googleapi-keys'

// const { google } = require('googleapis');
// const keys = require('../../jbid-googleapi-keys.json');

const scope = 'https://www.googleapis.com/auth/spreadsheets';

const connect = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    [scope]
);

export default function gsheet(req, res) {

    connect.authorize( (err, tokens) => {

        if ( err ) {
            console.log("connect error : " + err);
            return;
        } else {
            console.log(tokens);
            getSheetData(connect);
        }
    
    })

    async function getSheetData( con ) { 

        const sheetId = '1H2RQ_OIyD8MI-KoAslC0unfeCh7-McpThGGC3AXsqY0';
        const sheetRange = '기술자수첩!A2:E4';
    
        const sheets = google.sheets({  version : 'v4', auth : con });
    
        const opt = {
            spreadsheetId : sheetId,
            range : sheetRange
        };
    
        let datas = await sheets.spreadsheets.values.get(opt);
        console.table(datas.data.values);
        const rows = datas.data.values;
        let jsonData = [];
        if ( rows.length ) {
            rows.map( ( row ) => {
                let tempData = {};
                tempData.id = row[0];
                tempData.name = row[1];
                tempData.phone = row[2];
                tempData.company = row[3];
                tempData.modify = row[4];
                jsonData.push(tempData);
            })
        }
        console.table(jsonData);
        
        res.status(200).json(jsonData);
    }

}