const createPerson=(params) =>{
const personObject= {
    name : params.name,
    username : params.username,
    password : params.password
}
return personObject
}

module.exports =() =>{
    createPerson
}