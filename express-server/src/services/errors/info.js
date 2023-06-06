export const generateUserErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    *  title : needs to be a String, received ${product.title}
    *  description : needs to be a String, received ${product.description}
    *  code : needs to be a Number, received  ${product.code}
    *  price : needs to be a Number, received ${product.price}
    *  stock : needs to be a Number, received ${product.stock}
    *  category : needs to be a String, received ${product.category}
    *  thumbnails : needs to be a .jpg, received ${product.thumbnails}
    `
}