const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'NEUSGN', title: 'NEUSGN'},
        {id: 'NEEMLT', title: 'NEEMLT'}
    ]
});
fs.createReadStream('emails')
  .pipe(csv({separator:'\t'}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results)
    results.forEach(line => {
        let email = line.NEEMLT;
        let opcoRegex = '@idaho.sysco.com'
        let replaced
        if(email.indexOf(opcoRegex)!=-1) {
           while(email.indexOf(opcoRegex)!=-1) {
            let endPosition = email.indexOf(opcoRegex)
            let commaPosition = email.substr(0,endPosition).lastIndexOf(',')
            let firstName;
            let lastName;
            if(commaPosition == -1) {
                let lastFirst = email.substring(commaPosition,endPosition);
                firstName = lastFirst.substring(lastFirst.indexOf('.')+1)
                lastName = lastFirst.substring(0,lastFirst.indexOf('.'))
            } else {
                let lastFirst = email.substring(commaPosition,endPosition);
                firstName = lastFirst.substring(lastFirst.indexOf('.')+1)
                lastName = lastFirst.substring(1,lastFirst.indexOf('.'))
            }
            let replacement = firstName+'.'+lastName+'@sysco.com'
            replaced = email.replace(lastName+'.'+firstName+'@idaho.sysco.com',replacement)
            email=replaced;
        }
        line.NEEMLT = replaced;
      }
    })
    console.log(results);
    csvWriter.writeRecords(results)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
  });


 
// const records = [
//     {name: 'Bob',  lang: 'French, English'},
//     {name: 'Mary', lang: 'English'}
// ];
 



//original email from neemlt
// let replacementArray = []

// const replace = emailArr => {
//     emailArr.forEach(email => {
//         let opcoRegex = '@idaho.sysco.com'
//         let replaced
//         while(email.indexOf(opcoRegex)!=-1) {
//             let endPosition = email.indexOf(opcoRegex)
//             let commaPosition = email.substr(0,endPosition).lastIndexOf(',')
//             let firstName;
//             let lastName;
//             if(commaPosition == -1) {
//                 let lastFirst = email.substring(commaPosition,endPosition);
//                 firstName = lastFirst.substring(lastFirst.indexOf('.')+1)
//                 lastName = lastFirst.substring(0,lastFirst.indexOf('.'))
//             } else {
//                 let lastFirst = email.substring(commaPosition,endPosition);
//                 firstName = lastFirst.substring(lastFirst.indexOf('.')+1)
//                 lastName = lastFirst.substring(1,lastFirst.indexOf('.'))
//             }
//             let replacement = firstName+'.'+lastName+'@sysco.com'
//             replaced = email.replace(lastName+'.'+firstName+'@idaho.sysco.com',replacement)
//             email=replaced;
//         }
//         replacementArray.push(replaced);
//     });
// }
