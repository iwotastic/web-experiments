import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import { BarChart } from "./builders/Barchart";
import { Histogram } from "./builders/Histogram";
import { LinePlot } from "./builders/Lineplot";
import { Scatterplot } from "./builders/Scatterplot";
import { Homepage } from "./Homepage";
import { version } from "../package.json";
import { BoxPlot } from "./builders/BoxPlot";

export function App() {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/scatterplot" element={<Scatterplot />} />
            <Route path="/line-plot" element={<LinePlot />} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route path="/histogram" element={<Histogram />} />
            <Route path="/box-plot" element={<BoxPlot />} />
        </Routes>
        <hr />
        <p>
            Cheatyverse (version {version}),
            a <a href="https://web-experiments.ianmorrill.com">web experiment</a> created by <a href="https://ianmorrill.com">Ian Morrill</a>.
        </p>
        <p>
            {(
                "Disclaimer: Cheatyverse is not designed help you cheat in class or otherwise, nor is it a " +
                "replacement for knowing how to manipulate your own data. It simply is a cheatsheet for recalling " +
                "Tidyverse-related syntax."
            )}
        </p>
    </HashRouter>;
}
