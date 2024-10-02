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
    const result = await Sdata(number, { code, time: Date.now(), number})
    console.log(result)
}
async function generateNewCodeForThisNumber(code, number){
    await sendSMS(code, number)
    await saveCodeInDB(code, number)
}
async function CheckIfCorrect(code, number) {
    try {
      console.log(code);
      const savedCode =  Sdata(number);
      console.log(savedCode);
      if (Date.now() - savedCode.time <= 120000) {
        if (savedCode.code == Number (code) ) {
          Sdata.clear(number);
          return true;
        }
        else {
          Sdata.clear(number);
          return false 
        }
        }
      else {
        return ("out of time")
      }
    } catch (err) {
      return false;
    }
}
async function run () {
  var code = getRandomInt()
  console.log("test")
  await sendSMS(code, 9181711690)
  console.log("test2")
  await saveCodeInDB(code, 9181711690)
  console.log("test2")
  await CheckIfCorrect(14567, 9181711690)
}
run()
module.exports  = {
    generateNewCodeForThisNumber,
    CheckIfCorrect,
    sendSMS,
    getRandomInt
}