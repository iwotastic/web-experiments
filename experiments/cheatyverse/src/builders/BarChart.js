import { useState } from "react";
import { Link } from "react-router-dom";
import { Question } from "../util-components";
import { allFilled, toRVarname } from "../util-fns";

export function BarChart() {
    const [datasetName, setDatasetName] = useState("");
    const [xAxisVar, setXAxisVar] = useState("");
    const [yAxisVar, setYAxisVar] = useState("");
    const [facetVar, setFacetVar] = useState("");
    const [yAxisScale, setYAxisScale] = useState("linear");

    return <div>
        <h1>You want to make a bar chart</h1>
        <p><Link to="/">Go Back</Link></p>
        <Question label={"What is your dataset's name?"} required={true} value={datasetName} onNewValue={setDatasetName} />
        <Question label={"What variable should be used to form the bars?"} required={true} value={xAxisVar} onNewValue={setXAxisVar} />
        <Question label={"What variable should be used to decide bar height?"} required={true} value={yAxisVar} onNewValue={setYAxisVar} />
        <Question label={"What variable should be used to facet (or make separate graphs)?"} value={facetVar} onNewValue={setFacetVar} />
        <div className="question">
            <label>How should the bar heights be scaled?</label>
            <select value={yAxisScale} onChange={e => setYAxisScale(e.target.value)}>
                <option value="linear">Linear</option>
                <option value="scale_y_log10">{`Logarithmic (Base 10)`}</option>
            </select>
        </div>
        <h2>R Code</h2>
        {(allFilled(datasetName, xAxisVar, yAxisVar) ? (
            <pre>
                {[
                    `ggplot(${toRVarname(datasetName)}, aes(x = ${toRVarname(xAxisVar)}, y = ${toRVarname(yAxisVar)}))`,
                    `  geom_col()`
                ].concat(yAxisScale !== "linear" ? [
                    `  ${yAxisScale}()`
                ] : []).concat(facetVar !== "" ? [
                    `  facet_wrap(~ ${toRVarname(facetVar)})`
                ] : []).join(" + \n")}
            </pre>
        ) : (
            <div>
                <i>Please fill out the fields marked by an asterisk above to generate your R code.</i>
            </div>
        ))}
    </div>;
}
