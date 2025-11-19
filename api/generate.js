
import { put } from "@vercel/blob";
import crypto from "crypto";

export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({success:false});
 try{
  const {name,ticker,desc,address,logo,twitter,telegram,buy}=req.body;
  const safe=name.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
  const unique=crypto.randomBytes(4).toString("hex");
  const filename=`${safe}-${unique}.html`;

  const html=`<html><head><meta charset='UTF-8'><title>${name}</title></head>
  <body><h1>${name} ($${ticker})</h1><p>${desc}</p></body></html>`;

  const blob=await put(filename,Buffer.from(html),"public");
  return res.json({success:true,url:blob.url});
 }catch(e){return res.json({success:false,error:e.toString()});}
}
