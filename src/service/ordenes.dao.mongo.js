const OrdenesDTO = require("../classes/Ordenes/orderDTO.class.js")  ;
const CustomError = require ("../classes/CustomError.class.js") ;
const DAO = require ("../classes/Dao.class.js") ;
const MongoClient = require ("../classes/MongoClient.class")
const Ordenes = require ("../models/order.model.js")

let instance

class OrdenesDaoMongo extends DAO {
    constructor() {
      super();
      this.collection = Ordenes;
      this.db = MongoClient.getInstance();
    }
    async deleteById(id){
        try {
            await this.collection.deleteOne({_id:id});
        } catch (error) {
            throw new CustomError(500, error); 
        }
    }
    async getById(id)  {
        try {
            const orden = await this.collection.findOne({ _id: id }, { __V: 0 });
            // return doc;
            return new OrdenesDTO(orden);
        } catch (error) {
            throw new CustomError(500, error); 
        } 
    }
    async getAll(){
        try {
            const ordenes = await this.collection.find({ });
            const result = ordenes.map((orden)=>(new OrdenesDTO(orden)))
            return result;
        } catch (error) {
            throw new CustomError(500, error); 
        }
    }
    async nextOrderNumber(){
        const lastOrder = await this.collection.findOne({}).sort({orderNumber:-1})
        if (!lastOrder) {
            return 1
        }   
        return lastOrder.orderNumber + 1
    }
    async create(carrito){  
        try {
            console.log('carrito.productos', carrito.productos)
            const orden = new this.collection({
                orderNumber:await this.nextOrderNumber(),
                username:carrito.username,
                address:carrito.address,
                productos: carrito.productos, 
                timestamp:Date.now(),
                status:"generada",
                productos: carrito.productos,
            })
            await orden.save() 
            return new OrdenesDTO(orden);
        } catch (error) {
            throw new CustomError(500, error); 
        }       
    }
    async getByusername(username){ 
        try {
            const orden = await this.collection.findOne({ username: username});
            return new OrdenesDTO(orden);
        } catch (error) {
            throw new CustomError(500, error);
        }
    }

    static getInstance() {
  
        if (!instance) instance = new OrdenesDaoMongo();
        return instance;
    }
}


module.exports = OrdenesDaoMongo
