const express = require('express')
const routes = express.Router()
const mongoose = require('mongoose')

const Char = mongoose.model('Char',{
Nome: String,
Desc: String,
Aparencia: String,
Poder: String,
Autoria: String
}
)
const CharAproved = mongoose.model('CharAproved',{
Nome: String,
Desc: String,
Aparencia: String,
Poder: String,
Autoria: String
})

const Hist = mongoose.model('hist',{
        Titulo: String,
        Subtitulo: String,
        Autoria: String,
        Historia: String,
        Personagens: Array,
})
const HistApproved = mongoose.model('histAproved',{
    Titulo: String,
    Subtitulo: String,
    Autoria: String,
    Historia: String,
    Personagens: Array
})

let db = []
routes.delete('/deletartudo',async (req, res) => {
    // const chars = await Char.find()
    try {
        await Char.deleteMany()
        res.status(200).json({message: 'Tudo deletado.'})
    } catch (error) {
        res.status(404).json({error: error})
    }
}) 
// routes.get('/', async (req,res) => {
//     const chars = await Char.find()
//     chars.forEach((item, index) => {
//         item.index = index
//         console.log(item.index)
//         db.push(item)
//     })
//     // se tiver duplicando, utilizar new Set
//     return res.json(db)
// })
// O / VAI SER PRA PERSONAGENS E HISTORIAS JA APROVADOS...
routes.get('/char', async (req,res) => {
    let tempdb = [];
    const chars = await Char.find()
    chars.forEach((item, index) => {
        const finalItem = {...item.toObject(),id: index += 1}
        tempdb.push(finalItem)
    })
    // se tiver duplicando, utilizar new Set
    const uniqueDB = [... new Set(tempdb.map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
    return res.json(uniqueDB)
})

routes.post('/char', async (req, res) => {
    const chars = await Char.find()
    const { Nome, Desc, Aparencia, Poder, Autoria} = await req.body
    if (!Nome || !Desc || !Aparencia || !Poder || !Autoria) {
        console.log(Desc)
        return res.status(422).json({error: req.body})
    }

    let jaexiste;
    chars.forEach((item) => {
        if (item.Nome === Nome) {
            jaexiste = true
        }
    })
    if (jaexiste) {
        return res.status(202).json({error: 'A pessoa já existe no sistema'})

    }
    let Character = {
        Nome,
        Desc,
        Aparencia,
        Poder,
        Autoria
    }
    try {
        await Char.create(Character)
        res.status(201).json({message: 'Pessoa inserida no sistema.'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

routes.delete('/deletechars/:id/', async (req, res) => {
    const chars = await Char.findOne({_id: req.params.id})
    db.forEach((item,index) => {
        if (item._id === req.params.id) {
            db.splice(index, 1)
        }
    })
    if (chars) {
        await Char.deleteOne({ _id: req.params.id })
        res.status(200).json({message: 'Deletado com sucesso'})
    } else {
        res.status(404).json({message: 'Não há personagens com esse ID.'})
    }
})

routes.post('/aprovedChar', async (req, res) => {
    const chars = await Char.find()
    const CharsAproved = await CharAproved.find()
    const { Nome, Desc, Aparencia, Poder, Autoria} = await req.body
    if (!Nome || !Desc || !Aparencia || !Poder || !Autoria) {
        console.log(Desc)
        return res.status(422).json({error: req.body})
    }

    let jaexiste;
    CharsAproved.forEach((item) => {
        if (item.Nome === Nome) {
            jaexiste = true
        }
    })
    if (jaexiste) {
        return res.status(202).json({error: 'A pessoa já existe no sistema'})

    }
    let Character = {
        Nome,
        Desc,
        Aparencia,
        Poder,
        Autoria
    }
    try {
        await CharAproved.create(Character)
        await Char.deleteOne({ Nome: Nome, Autoria: Autoria })
        res.status(201).json({message: 'Pessoa inserida no sistema.'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

routes.get('/aprovedChar', async (req, res) => {
    let tempdb = [];
    const charsAproved = await CharAproved.find()
    charsAproved.forEach((item, index) => {
        const finalItem = {...item.toObject(),id: index += 1}
        tempdb.push(finalItem)
    })
    // se tiver duplicando, utilizar new Set
    const uniqueDB = [... new Set(tempdb.map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
    return res.json(uniqueDB)
})

routes.post('/hist',async (req, res) => {
    const Hists = await Hist.find()
    const { Titulo, Subtitulo, Autoria, Historia, Personagens} = await req.body
    if (!Titulo || !Historia) {
        return res.status(422).json({error: req.body})
    }

    let jaexiste;
    Hists.forEach((item) => {
        if (item.Titulo === Titulo) {
            jaexiste = true
        }
    })
    if (jaexiste) {
        return res.status(202).json({error: 'A história já existe no sistema'})

    }
    let Historiap = {
        Titulo,
        Subtitulo,
        Autoria,
        Historia,
        Personagens
    }
    try {
        await Hist.create(Historiap)
        // await Char.deleteOne({ Nome: Nome, Autoria: Autoria })
        res.status(201).json({message: 'História inserida no sistema.'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

routes.get('/hist',async (req, res) => {
    let tempdb = []
    const Hists = await Hist.find()
    Hists.forEach((item, index) => {
        const finalItem = {...item.toObject(),id: index += 1}
        tempdb.push(finalItem)
    })
    const uniqueDB = [... new Set(tempdb.map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
    return res.json(uniqueDB)
})

routes.post('/aprovedHist', async (req, res) => {
    const hists = await Hist.find()
    const CharsAproved = await HistApproved.find()
    const { Titulo, Subtitulo, Autoria, Historia, Personagens} = await req.body
    if (!Titulo || !Historia) {
        return res.status(422).json({error: req.body})
    }

    let jaexiste;
    HistApproved.forEach((item) => {
        if (item.Nome === Nome) {
            jaexiste = true
        }
    })
    if (jaexiste) {
        return res.status(202).json({error: 'A pessoa já existe no sistema'})

    }
    let Historiap = {
        Titulo,
        Subtitulo,
        Autoria,
        Historia,
        Personagens
    }
    try {
        await Hist.create(Historiap)
        // await Char.deleteOne({ Nome: Nome, Autoria: Autoria })
        res.status(201).json({message: 'História inserida no sistema.'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

routes.get('/aprovedHist', async (req, res) => {
    let tempdb = [];
    const histsAproved = await HistApproved.find()
    histsAproved.forEach((item, index) => {
        const finalItem = {...item.toObject(),id: index += 1}
        tempdb.push(finalItem)
    })
    // se tiver duplicando, utilizar new Set
    const uniqueDB = [... new Set(tempdb.map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
    return res.json(uniqueDB)
})

module.exports = routes