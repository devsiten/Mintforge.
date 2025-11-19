async function generateSite(){
 let status=document.getElementById("status");
 status.innerText="Generating...";

 const payload = {
   name: name.value,
   ticker: ticker.value,
   desc: desc.value,
   address: address.value,
   logo: "",
   theme: theme.value,
   twitter: twitter.value,
   telegram: telegram.value,
   buy: buy.value
 };

 let res = await fetch("/api/generate", {
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(payload)
 });

 let out = await res.json();

 if(out.success){
   status.innerHTML = `<b>Done!</b><br><a href="${out.url}" target="_blank">View Website</a>`;
 } else {
   status.innerText = "Error: " + out.error;
 }
}