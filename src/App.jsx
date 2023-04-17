import Navbar from "./components/navbar";
import CartContainer from "./components/cartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Model from "./components/model";
function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('test'));
  },[])

  if(isLoading) {
    return (
      <div className="loading">
        <h1>Loading....</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Model/>}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
