if(document.getElementById("input-regex") !== null){
let valid_regex=document.getElementById("input-regex").value;
if(document.getElementsByClassName("vjs-remaining-time-display")[0] !== undefined){
    let txtUpdate=document.getElementsByClassName("vjs-remaining-time-display")[0].textContent;
    txtUpdate=txtUpdate.replace(new RegExp(valid_regex),"");
    document.getElementsByClassName("vjs-remaining-time-display")[0].textContent=txtUpdate;
    }
}