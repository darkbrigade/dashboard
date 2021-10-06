
async function getCred(){
    let usernameTextElement = document.querySelector('#username')
    let passwordTextElement = document.querySelector('#password')
    let usernameTextValue = usernameTextElement.value
    let passwordTextValue = passwordTextElement.value
    useToken(usernameTextValue,passwordTextValue)
    usernameTextElement.value= ""
    passwordTextElement.value= ""
}

function fetchMyToken(url,method,user,pass,myToken){
    return fetch(`${url}?username=${user}&password=${pass}`,{
        method: `${method}`
    })
    .then(response => response.json())
    .then(data => {
       return data.token
        //console.log(myToken)

    }) 
}

async function useToken(usernameTextValue,passwordTextValue){
    let response = await function(){
        return fetchMyToken('https://restapi.itarea.app/wp-json/jwt-auth/v1/token','POST',usernameTextValue,passwordTextValue)
        .then(function(result){
        return result 
        })
    }
    let token = await response()
    //console.log(token)
    let usage = await function(){
        return fetch('https://restapi.itarea.app/wp-json/wp/v2/users',{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`
            }
        })
                .then(response => response.json())
                .then(data => {
                   return console.log(data)
                })
    }
    usage()
    return 
}





