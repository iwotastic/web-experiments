import { useState } from "react";
import { Link } from "react-router-dom";
import { Question } from "../util-components";
import { allFilled, toRVarname } from "../util-fns";

export function Scatterplot() {
    const [datasetName, setDatasetName] = useState("");
    const [xAxisVar, setXAxisVar] = useState("");
    const [yAxisVar, setYAxisVar] = useState("");
    const [colorVar, setColorVar] = useState("");
    const [sizeVar, setSizeVar] = useState("");
    const [facetVar, setFacetVar] = useState("");
    const [xAxisScale, setXAxisScale] = useState("linear");
    const [yAxisScale, setYAxisScale] = useState("linear");

    return <div>
        <h1>You want to make a Scatterplot</h1>
        <p><Link to="/">Go Back</Link></p>
        <Question label={"What is your dataset's name?"} required={true} value={datasetName} onNewValue={setDatasetName} />
        <Question label={"What should go on the x axis?"} required={true} value={xAxisVar} onNewValue={setXAxisVar} />
        <Question label={"What should go on the y axis?"} required={true} value={yAxisVar} onNewValue={setYAxisVar} />
        <Question label={"What variable should be used to determine color?"} value={colorVar} onNewValue={setColorVar} />
        <Question label={"What variable should be used to determine size?"} value={sizeVar} onNewValue={setSizeVar} />
        <Question label={"What variable should be used to facet (or make separate graphs)?"} value={facetVar} onNewValue={setFacetVar} />
        <div className="question">
            <label>How should the <i>x</i> axis be scaled?</label>
            <select value={xAxisScale} onChange={e => setXAxisScale(e.target.value)}>
                <option value="linear">Linear</option>
                <option value="scale_x_log10">{`Logarithmic (Base 10)`}</option>
            </select>
        </div>
        <div className="question">
            <label>How should the <i>y</i> axis be scaled?</label>
            <select value={yAxisScale} onChange={e => setYAxisScale(e.target.value)}>
                <option value="linear">Linear</option>
                <option value="scale_y_log10">{`Logarithmic (Base 10)`}</option>
            </select>
        </div>
        <h2>R Code</h2>
        {(allFilled(datasetName, xAxisVar, yAxisVar) ? (
            <pre>
                {[
                    `ggplot(${toRVarname(datasetName)}, aes(x = ${toRVarname(xAxisVar)}, y = ${toRVarname(yAxisVar)}${colorVar !== "" ? ", color = " + toRVarname(colorVar) : ""}${sizeVar !== "" ? ", size = " + toRVarname(sizeVar) : ""}))`,
                    `  geom_point()`
                ].concat(xAxisScale !== "linear" ? [
                    `  ${xAxisScale}()`
                ] : []).concat(yAxisScale !== "linear" ? [
                    `  ${yAxisScale}()`
                ] : []).concat(facetVar !== "" ? [
                    `  facet_wrap(~ ${toRVarname(facetVar)})`
                ] : []).join(" + \n")}
            </pre>
        ) : (
            <div>
                <i>Please fill out the above fields to generate your R code.</i>
            </div>
        ))}
    </div>;
}
