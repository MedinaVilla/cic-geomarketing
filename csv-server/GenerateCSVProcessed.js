const csv = require('csv-parser');
const fs = require('fs');

let results = [];

fs.createReadStream('./input/denue_cdmx_Preproceso2.csv')
    .pipe(csv())
    .on('data', (row) => {
        let myRow = row;
        console.log(myRow["'id'"]);
        // console.log(myRow.categoria)
        myRow.categoria?.replace(/['"]+/g, '')
        // console.log(myRow)
        results.push(row);


    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        fs.writeFileSync("output/denue_cdmx_Preproceso2.json", JSON.stringify(results), 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    });