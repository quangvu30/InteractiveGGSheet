const req = require('./req');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credential = require('./credential')

const PRIVATE_KEY = credential.private_key
const CLIENT_EMAIL = credential.client_email
const SHEET_ID = '15SVUIC4ngcU_oHqzNyKxfVLAaJ6RlgJGBENPI4MFT2w';
console.log(CLIENT_EMAIL)

let getGoogleSheet = async() => {
    try {
        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(SHEET_ID);

        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        // append rows
        await sheet.addRow(
            {
                "Phone": req.phone,
                "Money": req.money,
                "Type": req.type,
                "Gateway": req.gateway,
                "Txn_id": req.txn_id,
                "Content": req.content,
                "Datetime": req.datetime
            });
        return 'Writing data to Google Sheet succeeds!'
    }
    catch (e) {
        return e
    }
}

getGoogleSheet().then((res) => {
    console.log(res)
})