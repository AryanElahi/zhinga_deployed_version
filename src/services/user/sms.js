const Sdata = require("simple-data-storage");
const {Token,VerificationCode} = require('sms-ir')
const token = new Token();
const verificationCode = new VerificationCode();

const max = 99999
const min = 10000

function getRandomInt () {
    return Math.floor(Math.random() * (max - min) + min)
}
async function sendSMS (code, number) {
    const tokenResult = await token.get(
    "f39b005ce36d425bc915005c", "it66)%#Zhinga@*&") 
    const verificationResult = await verificationCode.send(tokenResult, number , code)
    return verificationResult
} 
async function saveCodeInDB(code, number) {
    await Sdata(number, {code, time: Date.now()})
}
async function generateNewCodeForThisNumber(number){
    const code = getRandomInt() 
    await saveCodeInDB(code, number)
    await sendSMS(code, number)
}
async function CheckIfCorrect(code, number) {
    try {
      console.log(code);
      const savedCode =  Sdata(number);
      console.log(savedCode);
      if (Date.now() - savedCode.time <= 120000) {
        console.log("test2");
        console.log("saved code", savedCode.code);
        if (savedCode.code == Number (code) ) {
          console.log("saved code", savedCode.code);
          Sdata.clear(number);
          console.log("true")
          return true;
        }
        return false;
      }
    } catch (err) {
      return false;
    }
}
async function run () {
//generateNewCodeForThisNumber("09181711690")
await CheckIfCorrect(89102 , "09181711690")
}
run()
module.exports  = {
    generateNewCodeForThisNumber,
    CheckIfCorrect,
    sendSMS
}