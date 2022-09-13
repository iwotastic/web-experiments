import { Link } from "react-router-dom";
import { version } from "../package.json";

export function Homepage() {
    return <div>
        <h1>Cheatyverse</h1>
        <p>
            {(
                "Ian's unofficial cheatsheet for the Tidyverse family of R libraries, with fancy interactive bits " +
                "powered by the magic of React. Written because I was fed up with having to remember all of the " +
                "syntactic idiosyncracies of R and the Tidyverse. If you too are having to learn R and the " +
                "Tidyverse, perhaps you will find this website as helpful as I attempted to make it."
            )}
        </p>
        <p>
            {(
                "To get started, just select a link from below to view that part of the Cheatyverse cheatsheet."
            )}
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
