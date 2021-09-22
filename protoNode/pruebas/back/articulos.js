const { Router } = require('express')
const router = Router()
const Articulo = require('./articulo.model')

router.route('/')
    .get(async (req, res) => {
        const articulos = await Articulo.find()
        console.log(articulos)
        res.json(articulos)
    })
    .post(async (req, res) => {
        const { nombre, categoria, cantidad, marca, color, precio, descripciones, imagenes, valoracion, compras } = req.body
        const newArticulo = new Articulo({
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            marca: marca,
            color: color,
            precio: precio,
            descripciones: descripciones,
            imagenes: imagenes,
            valoracion: valoracion,
            compras: compras
        })
        await newArticulo.save()
        res.json({ message: 'Articulo guardado' })
    })

router.route('/:id')
    .get(async (req, res) => {
        const articulo = await Articulo.findById(req.params.id)
        res.json(articulo)
    })
    .put((req, res) => {
        const { nombre, categoria, cantidad, marca, color, precio, descripciones, imagenes } = req.body
        const newArticulo = new Articulo({
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            marca: marca,
            color: color,
            precio: precio,
            descripciones: descripciones,
            imagenes: imagenes,
        })
        Articulo.findOneAndUpdate(req.params.id, newArticulo)
        res.json({ message: 'Articulo actualizado' })
    })
    .delete(async (req, res) => {
        await Note.findById(req.params.id)
        res.json({ message: 'Articulo eliminado' })
    })

router.route('/categoria/:categoria/')
    .get(async (req, res) => {
        const articulos = await Articulo.find({categoria:req.params.categoria},null,{ skip:req.query.page*10 }).limit(10)
        console.log(articulos)
        res.json(articulos)
    })

router.route('/actualizar')
    .post(async(req,res)=>{
        console.log('ids')
        /*ejemplo del req.body
        [
        '5ec86894bdb30632d8c1372a',
        '5ea9a94c8887a932a4f918d2',
        '5ea9a94c8887a932a4f918d2',
        '5ea9a9cb8887a932a4f918d3',
        '5ea9a94c8887a932a4f918d2'
        ]
        */
        console.log(req.body)
        //Falta implementar la actualizacion de estos productos
        //Debe devolver los productos en un array
        res.json("articulos relucientes")
    })    
module.exports = router