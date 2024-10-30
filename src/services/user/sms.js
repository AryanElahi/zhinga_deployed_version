const Sdata = require("simple-data-storage");
const {Token,VerificationCode} = require('sms-ir');
const { get } = require("../../api/routes/V1/admin/admin.rout");
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
    await Sdata(number, { code, time: Date.now(), number})
}
async function generateNewCodeForThisNumber(code, number){
    await sendSMS(code, number)
    await saveCodeInDB(code, number)
}
async function CheckIfCorrect(code, number) {
    try {
      const savedCode =  Sdata(number);
      if (Date.now() - savedCode.time <= 120000) {
        if (savedCode.code == Number (code) ) {
          Sdata.clear(number);
          return 1;
        }
        else {
          Sdata.clear(number);
          return 2 
        }
      } else {
        Sdata.clear(number);
        return 3 
        }
    } 
    catch (err) {
      return false;
    }
}
async function run () {
  var code = getRandomInt()
  await sendSMS(code, "09181711690")
  await saveCodeInDB(code, 9181711690)
  await CheckIfCorrect(14567, 9181711690)
}
module.exports  = {
    generateNewCodeForThisNumber,
    CheckIfCorrect,
    sendSMS,
    getRandomInt, 
    saveCodeInDB
}