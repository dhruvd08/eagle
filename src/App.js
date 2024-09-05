import "./App.css";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Map from "./components/Map";
import incidents from "./incidents";

async function App() {
  const baseUrl = proccess.env.REACT_APP_BACKEND_URL;

  const incidents = (await fetch(baseUrl)).json;

  return (
    <div>
      <Header />
      <div id="container">
        <Map />
        <Feed incidents={incidents} />
      </div>
    </div>
  );
}

export default App;
