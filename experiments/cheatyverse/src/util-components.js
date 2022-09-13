export function Question({label, value, onNewValue, required}) {
    return <div className={required ? "question required" : "question"}>
        <label>{label}</label>
        <input value={value} onChange={e => onNewValue(e.target.value)} />
    </div>;
}
