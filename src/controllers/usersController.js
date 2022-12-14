
const path = require( 'path')
const main = require('../nodemailer/mailAdmin.js')

class UsuarioController{

  async getHome(req,res){
    res.sendFile(path.join(__dirname, ".././public/home.html"));
  }
  async getHomeAdmin(req,res){
      // res.render('chats.hbs');
      res.sendFile(path.join(__dirname, ".././public/index.html"));
  }
  //LOGIN
  async getLogin(req, res){
      if(req.isAuthenticated()){
        // console.log('estoy logueadooooo')
        let user= req.user
        res.redirect('/productos')
      }else{
        // console.log('usuario no logueado')
        res.sendFile(path.join(__dirname, ".././public/login.html")); //aca si podría un res.render
      }
      
  }

  async getUserInfo(req, res){ 
      const {username, name,surname, address, phone, avatar} = req.user
      res.render('info',{username, name,surname, address,phone, avatar})    
  }
  async postLogin(req, res){
      let user= req.username
      res.redirect('/productos')
  }
  async getFailLogin(req, res){
      // console.log('req.session.messages',req.session.messages)
      res.sendFile(path.join(__dirname, ".././public/faillogin.html"));
  }
      //SIGNUP
  async getSignup(req, res){
    res.sendFile(path.join(__dirname, ".././public/signup.html")); 
  }
  async postSignup(req, res){
    // console.log('req- metodo post-login',req.body)
    let user= req.user
    main(`Nuevo Registro de ${req.user.name} ${req.user.surname} - ${req.user.username}`, 
    `<h1>Datos de Registro</h1>
    <ul>
        <li>E-mail: ${req.user.username} </li>
        <li>Nombre: ${req.user.name} </li>
        <li>Apellido: ${req.user.surname} </li>
        <li>Dirección: ${req.user.address} </li>
       <li>Teléfono: ${req.user.phone} </li>
       <li>avatar: http://localhost:8080/image/${req.user.avatar}  </li>
   </ul>`)
    // console.log('usersignup', user)
    res.redirect('/')
  }

  async getFailSignup(req, res){
      res.sendFile(path.join(__dirname, ".././public/failsignup.html"));
  }
  async getLogout(req, res, next)  {
      let user= req.user.username
      req.logout(function(err) {   //METODO DE PASSPORT
        if (err)  return next(err); 
        res.send(`<h1>Hasta luego ${user}</h1>
          <script type="text/javascript">
          setTimeout(function(){ location.href = '/'},2000)
          </script>`
        )
      })
  }
}
module.exports = UsuarioController

                ////////             OTROS                 ////////

// const getUsers = async (req, res) => {
//     const verUsers= await UsuarioDao.getAll()
//     res.json(verUsers)
// }

// const postUser = async (req, res) => {
//     const {username, password, nombre, direccion, edad, telefono,avatar} = req.body 
//     const elemento = await UsuarioDao.newProduct(username, password, nombre, direccion, edad, telefono,avatar)
//     res.json(elemento)
// }
//////// CON USERNAME //////////////// 
// const getUserMail = async (req, res) => {
//     const username = req.params.username
//     console.log('username', username)
//     const elemento = await UsuarioDao.getByUsername(username)
//     console.log('elemento', elemento)
//     if(!elemento){return res.status(404).json({error: "Usuario no encontrado"})}
//     res.json(elemento)
// }
// const putUserMail = async (req, res) => {
//     const {username, password, nombre, direccion, edad, telefono,avatar} = req.body
//     const id = req.params.id
//     const elemento = await UsuarioDao.getById(id)
//     if(!elemento){return res.status(404).json({error: "Usuario no encontrado"})}
//     const elementChanged = await UsuarioDao.update(id,username, password, nombre, direccion, edad, telefono,avatar)
//     res.json(elementChanged)
    
// }
// const deleteUserMail = async (req, res) => {
//     const id = req.params.id
//     if(!id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
//     await UsuarioDao.deleteById(id)
//     res.json(await UsuarioDao.getAll())
// }

//////////////////////////////////////////////////////////////////////////////////////
// const getUserId = async (req, res) => {
//     const id = req.params.id
//     console.log('id', id)
//     const elemento = await UsuarioDao.getById(id)
//     console.log('elemento', elemento)
//     if(!elemento){return res.status(404).json({error: "Usuario no encontrado"})}
//     res.json(elemento)
// }
// const putUser = async (req, res) => {
//     const {username, password, nombre, direccion, edad, telefono,avatar} = req.body
//     const id = req.params.id
//     const elemento = await UsuarioDao.getById(id)
//     if(!elemento){return res.status(404).json({error: "Usuario no encontrado"})}
//     const elementChanged = await UsuarioDao.update(id,username, password, nombre, direccion, edad, telefono,avatar)
//     res.json(elementChanged)
    
// }
// const deleteUser = async (req, res) => {
//     const id = req.params.id
//     if(!id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
//     ////////HACER  más adelante agregar borrar usuario y carrito de usuario////////////////////!?!?!
//     /////const usuario = await UsuarioDao.getById(id)
//     /////CREAR    const carrito= await CarritoDao.getByUsername(usuario.username)
//     //// await CarritoDao.deleteById(carrito._id.toString())
//     await UsuarioDao.deleteById(id)
//     res.json(await UsuarioDao.getAll())
// }

