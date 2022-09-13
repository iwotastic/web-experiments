import { useState } from "react";
import { Link } from "react-router-dom";
import { Question } from "../util-components";
import { allFilled, toRVarname } from "../util-fns";

export function BoxPlot() {
    const [datasetName, setDatasetName] = useState("");
    const [xAxisVar, setXAxisVar] = useState("");
    const [yAxisVar, setYAxisVar] = useState("");
    const [facetVar, setFacetVar] = useState("");

    return <div>
        <h1>You want to make a box plot</h1>
        <p><Link to="/">Go Back</Link></p>
        <Question label={"What is your dataset's name?"} required={true} value={datasetName} onNewValue={setDatasetName} />
        <Question label={"What variable should be used to decide the boxes?"} required={true} value={xAxisVar} onNewValue={setXAxisVar} />
        <Question label={"What variable should be used to decide the box size?"} required={true} value={yAxisVar} onNewValue={setYAxisVar} />
        <Question label={"What variable should be used to facet (or make separate graphs)?"} value={facetVar} onNewValue={setFacetVar} />
        <h2>R Code</h2>
        {(allFilled(datasetName, xAxisVar, yAxisVar) ? (
            <pre>
                {[
                    `ggplot(${toRVarname(datasetName)}, aes(x = ${toRVarname(xAxisVar)}, y = ${toRVarname(yAxisVar)}))`,
                    `  geom_boxplot()`
                ].concat(facetVar !== "" ? [
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
