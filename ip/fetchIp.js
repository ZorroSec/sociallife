export default function fetchIp(){
    fetch("https://api.ipify.org/?format=json").then(response=>{
        response.json().then(data=>{
            return data
        })
    })
}