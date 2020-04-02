/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log(`\r\n connecting to ${url} \r\n`)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) =>
    console.log(`error connecting to MongoDB: ${error.message}`)
  )

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8, required: true, unique: false }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const object = returnedObject
    object.id = object._id.toString()
    delete object._id
    delete object.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
