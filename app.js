const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

//MySQL code

const pool = mysql.createPool({
    connectionLimit: 10, 
    host:            'localhost', 
    user:            'root',
    password:        '',
    database:        'nodejs_beers'

})


//Get all beers


app.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as ID ${connection.threadId}`)
        //query(sqlString, callback)

        connection.query(`SELECT * FROM beers`, (err, rows) => {
            connection.release() //return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })

})


// Get a beer by ID


app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as ID ${connection.threadId}`)
        //query(sqlString, callback)

        connection.query(`SELECT * FROM beers WHERE id = ?`, [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })

})

// Delete a beer by ID

app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as ID ${connection.threadId}`)
        //query(sqlString, callback)

        connection.query(`DELETE FROM beers WHERE id = ?`, [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err){
                res.send(`Beer with the ID: ${req.param.id} was removed`)
            }else{
                console.log(err)
            }
        })

    })

})

app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as ID ${connection.threadId}`)
        //query(sqlString, callback)

        const params = req.body


        connection.query(`INSERT INTO beers SET ?`, params, (err, rows) => {
            connection.release() //return the connection to pool

            if(!err){
                res.send(`Beer with the NAME: ${params.name} has been added `)
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })

})


//Update a record for a beer

app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as ID ${connection.threadId}`)
        //query(sqlString, callback)

        const {id, name, tagline, description, image} = req.body


        connection.query(`UPDATE beers SET name = ?, tagline = ?, image = ? WHERE id = ?`, [name, tagline, image,  id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err){
                res.send(`Beer with the NAME: ${name} has been added `)
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })

})

//Listen on environment port of 5000
app.listen(port, () => console.log(`Listen on port ${port}`))