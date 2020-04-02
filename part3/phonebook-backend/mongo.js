import mongoose from 'mongoose'

// const args = process.argv.map((arg, i) => `args[${i}]: ${arg}`).join('\r\n');

// console.log('\r\n... printing arguments \r\n');
// console.log(args, '\r\n');

if (process.argv.length < 3) {
  console.log('Password required as argument')
}

const password = process.argv[2]

const clusterUrl = `mongodb+srv://fullstack:${password}@atkinsio-khajz.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(clusterUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  // console.log(`..attempting to save person \r\n\r\n  ${person}`);

  person.save().then(() => {
    console.log(
      `\r\n added ${process.argv[3]}: ${process.argv[4]} to phonebook.`
    )
    mongoose.connection.close()
  })
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log('An incorrect number of arguments was passed.')
}
