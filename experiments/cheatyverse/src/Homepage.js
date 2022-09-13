import { Link } from "react-router-dom";
import { version } from "../package.json";

export function Homepage() {
    return <div>
        <h1>Cheatyverse</h1>
        <p>
            {`Because sometimes Tidyverse's "Grammar of Graphics" is to big brain for us small brained humans.`}
        </p>
        <p>
            {`Just select what you want to do from the list below to build your R script.`}
        </p>
        <ul>
            <li><Link to="/scatterplot">I want to make a Scatterplot</Link></li>
        </ul>
        <hr />
        <p>
            Cheatyverse v{version}. A Web Experiment by <a href="https://ianmorrill.com">Ian Morrill</a>.
        </p>
    </div>;
}
