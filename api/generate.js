import { put } from "@vercel/blob";
import crypto from "crypto";

export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({success:false});

 try{
  const {name,ticker,desc,address,logo,theme,twitter,telegram,buy}=req.body;

  const safe = name.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
  const unique = crypto.randomBytes(4).toString("hex");
  const filename = `${safe}-${unique}.html`;

  const colors = {
    pink:"#ff007a",
    blue:"#007bff",
    dark:"#1a1a1a",
    solana:"linear-gradient(135deg,#9945FF,#14F195)"
  };
  const bg = colors[theme] || "#cfa65b";

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>${name}</title>
  <style>
  body{font-family:Arial;background:#121212;color:white;padding:30px;}
  .box{background:#1a1a1a;padding:20px;border-radius:12px;max-width:600px;margin:auto;border:1px solid #cfa65b;}
  h1{text-align:center;color:#cfa65b;}
  .btn{padding:10px;background:#cfa65b;color:#111;text-align:center;border-radius:8px;margin:8px 0;display:block;text-decoration:none;font-weight:bold;}
  </style>
  </head>
  <body>
  <div class="box">
    <h1>${name} ($${ticker})</h1>
    <p>${desc}</p>
    <p><b>Contract:</b> ${address}</p>
    ${twitter?`<a class="btn" href="${twitter}">Twitter</a>`:""}
    ${telegram?`<a class="btn" href="${telegram}">Telegram</a>`:""}
    ${buy?`<a class="btn" href="${buy}">Where to Buy</a>`:""}
  </div>
  </body>
  </html>`;

  const blob = await put(filename, Buffer.from(html), {
    access:"public",
    contentType:"text/html"
  });

  return res.json({success:true,url:blob.url});

 }catch(e){
  return res.json({success:false,error:e.toString()});
 }
}
