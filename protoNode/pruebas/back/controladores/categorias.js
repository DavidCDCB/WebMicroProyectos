const { Router } = require('express')
const router = Router()
const Categoria = require('./../modelos/categoria.model')

router.route('/')
    .get(async (req, res) => {
        const categorias = await Categoria.find()
        console.log(categorias)
        res.json(categorias) 
    })
    .post(async (req, res) => {
        const { nombre,imagen,_id} = req.body
        const newCategoria = new Categoria({
            _id:_id,
            nombre: nombre,
            imagen: imagen,
        })
        await newCategoria.save()
        res.json({ message: 'Articulo guardado' })
    })

router.route('/:id')
    .get(async (req, res) => {
        const categoria = await Categoria.findById(req.params.id)
        res.json(categoria)
    })
    .put((req, res) => {
        const { nombre,imagen,_id } = req.body
        const newCategoria = new Categoria({
            _id:_id,
            nombre: nombre,
            imagen: imagen,
        })
        Articulo.findOneAndUpdate(req.params.id, newArticulo)
        res.json({ message: 'Articulo actualizado' })
    })
    .delete(async (req, res) => {
        await Note.findById(req.params.id)
        res.json({ message: 'Articulo eliminado' })
    })

module.exports = router