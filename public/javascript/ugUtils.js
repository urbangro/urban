// TODO: check URL legitimacy
function request(requestType, url, callBack) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            callBack(this);
        } 
    }
    xhttp.open(requestType, url);
    xhttp.send();
}