import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import ChosenItem from "./components/ChosenProduct";
import Header from "./components/Header/Header";
import Main from "./components/Main";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ChosenItem />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
