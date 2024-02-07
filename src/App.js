import CreateOrder from "./CreateOrder";
import { Provider } from "react-redux";
import OrderTable from "./commponents/OrderTable";
import "./styles.css";
import { store } from "./redux/store";

export default function App() {
  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
  ];
  return (
    <div className="App">
      <Provider store={store}>
        <div class="container">
        <CreateOrder />
        <OrderTable />
        </div>
      </Provider>
    </div>
  );
}
