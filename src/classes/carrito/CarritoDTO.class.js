class CarritoDTO {
    constructor(data){
        this._id=data._id
        this.username= data.username
        this.address = data.address
        this.timestamp= data.timestamp
        this.productos =data.productos  ////quantity.....
    }
}
module.exports = CarritoDTO;  