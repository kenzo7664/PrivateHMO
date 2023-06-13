export function PostData(type, userData){
    let online = navigator.onLine? "online" :'offline'
    let BaseUrl = "https://portal.lifeworthhmoportal.com/api/"

    return new Promise((resolve,reject)=>{
       if(online === "online"){
        fetch(BaseUrl+type,{
            method:'POST',
            headers:{
               "Content-Type": "application/json",
             "Accept": "application/json"
            }, 
            body:JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch((error) => {
          reject(error)
        });
      } else {
        alert("You are Disconnected From The Internet")
        
      }

    })
}