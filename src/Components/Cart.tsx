import { useContext } from "react"
import { AppContext } from "../Context/Context"

const Cart = () => {

  const {cartItems}= useContext(AppContext);

  console.log('cartItemsssss', cartItems)
  return (
    <div>
      {cartItems.map((product) => (
        <p> {product.name} </p>
      ))}
    </div>
  )
}

export default Cart
