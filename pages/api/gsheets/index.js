//api/gsheet/index.js
import axios from 'axios'
// import { useState } from 'react'

// const getData = {}

export default (req, res) => {
    async function getGSheetData (){
        const getData = await axios.get('http://localhost:3030/gsheet')
        // console.log(getData.data)

        res.status(200).json(getData.data)
    }
    getGSheetData()

}  