import "./App.css";
import { DisplayGraph } from "./graph/DisplayGraph";
import SidePanel from "./graph/SidePanel";

function App() {
    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row m-3">
                    <div className="col-8">
                        <div className="sigma-container">
                            <DisplayGraph />
                        </div>
                    </div>
                    <div className="col-4">
                        <SidePanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
