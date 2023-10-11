import { useContext } from "react"
import { AppContext } from "../Context/Context"

const Cart = () => {

  const {cartItems}= useContext(AppContext);

  console.log('cartItemssssssss', cartItems)
  return (
    <div>
      {cartItems.map((product) => (
        <div>
          <p> {product.id} </p>
          <p> {product.name} </p>
          <p> {product.price} </p>
        </div>
      ))}
    </div>
  )
}

export default Cart
