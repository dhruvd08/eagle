import './App.css';
import Header from './components/Header';
import Feed from "./components/Feed";
import Map from './components/Map';
import incidents from './incidents';

function App() {
  return (<div><Header />
    <div id="container">
      <Map />
      <Feed incidents={incidents}/>
    </div>
    </div>
  );
}

export default App;
