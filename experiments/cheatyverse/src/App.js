import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import { Scatterplot } from "./builders/Scatterplot";
import { Homepage } from "./Homepage";

export function App() {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/scatterplot" element={<Scatterplot />} />
        </Routes>
    </HashRouter>;
}
