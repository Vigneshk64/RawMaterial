console.log("Jai")

const Test = require('./test')

Test()

const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json());
app.use(cors());

const port = 7002
app.listen(port, () => {
    console.log('----------------------------');
    console.log('Server is running on port' + port);
})



const ConnectMongo = require('./db')
ConnectMongo()

app.get('/api', (req, res) => {
    res.send("Hai")
    console.log("How is the Day ?")
})

app.use('/order', require('./Router/OrderRouter.js'));

app.use('/invent', require('./Router/InventoryRouter.js'))
app.use('/app', require('./Router/AdminRouter.js'))
app.use('/category', require('./Router/CategoryRouter.js'))
app.use('/api', require('./Router/studRouter.js'))
app.use('/invent/files', express.static('files'))
app.use('/order/upload', express.static('upload'))
app.use('/online', require('./Router/OnlePayRouter.js'))


const StudentSchema = require('./Module/User.js')
const student = require('./Module/User.js')
app.post('/insert', async (req, res) => {
    try {

        const { name, email, password } = req.body


        const Student = new StudentSchema({
            name: name,
            email: email,
            password: password,

        })

        const savestd = await Student.save()
        res.send(savestd)

    } catch (error) {

        console.log(error)

    }
})

app.get('/get', async (req, res) => {
    try {
        const data = await StudentSchema.find()
        res.json(data)

    } catch (error) {
        console.log(error)

    }
})