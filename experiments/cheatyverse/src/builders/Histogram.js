import { useState } from "react";
import { Link } from "react-router-dom";
import { Question } from "../util-components";
import { allFilled, toRVarname } from "../util-fns";

export function Histogram() {
    const [datasetName, setDatasetName] = useState("");
    const [dataVar, setDataVar] = useState("");
    const [binAttr, setBinAttr] = useState("bins");
    const [binValue, setBinValue] = useState("1");
    const [useLog, setUseLog] = useState(false);
    const [facetVar, setFacetVar] = useState("");

    return <div>
        <h1>You want to make a histogram</h1>
        <p><Link to="/">Go Back</Link></p>
        <Question label={"What is your dataset's name?"} required={true} value={datasetName} onNewValue={setDatasetName} />
        <Question label={"What variable should be used?"} required={true} value={dataVar} onNewValue={setDataVar} />
        <div className="question">
            <label>Use a logarithmic scale?</label>
            <input type="checkbox" checked={useLog} onChange={e => {
                setUseLog(e.target.checked);
                if (e.target.checked) {
                    setBinAttr("binwidth");
                    setBinValue("1")
                }
            }} />
        </div>
        <div className="question">
            <label>Use a bin</label>
            <select value={binAttr} onChange={e => setBinAttr(e.target.value)} disabled={useLog}>
                <option value="bins">count of</option>
                <option value="binwidth">width of</option>
            </select>
            <input value={binValue} onChange={e => setBinValue(e.target.value)} disabled={useLog} />
        </div>
        <Question label={"What variable should be used to facet (or make separate graphs)?"} value={facetVar} onNewValue={setFacetVar} />
        <h2>R Code</h2>
        {(allFilled(datasetName, dataVar) ? (
            <pre>
                {[
                    `ggplot(${toRVarname(datasetName)}, aes(x = ${toRVarname(dataVar)}))`,
                    `  geom_histogram(${(Number.isNaN(parseInt(binValue)) || parseInt(binValue) <= 1) ? "" : (binAttr + " = " + parseInt(binValue))})`
                ].concat(useLog ? [
                    `  scale_x_log10()`
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
