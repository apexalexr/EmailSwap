
//original email from neemlt
let emailArray = ['a@gmail.com,last.first@idaho.sysco.com',
                'last.first@idaho.sysco.com,a@gmail.com',
                'a@gmail.com,last.first@idaho.sysco.com,b@gmail.com',
                'a@gmail.com,last.first@idaho.sysco.com,last.first@idaho.sysco.com,b@gmail.com',
                'a@gmail.com,last.first@idaho.sysco.com,last.first@idaho.sysco.com,b@gmail.com,a@gmail.com,last.first@idaho.sysco.com,last.first@idaho.sysco.com,b@gmail.com']
let replacementArray = []

const replace = emailArr => {
    emailArr.forEach(email => {
        let opcoRegex = '@idaho.sysco.com'
        let replaced
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
        replacementArray.push(replaced);
    });
}

console.log(emailArray)
replace(emailArray);
console.log(replacementArray,1)