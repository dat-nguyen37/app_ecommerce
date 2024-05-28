const mongoose=require('mongoose')


const connect=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Connect to DB')
    } catch (err) {
        console.log(err)
    }
}
module.exports= connect