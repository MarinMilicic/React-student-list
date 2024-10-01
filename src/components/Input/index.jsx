import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createClass } from "utils/generic.utils";

import "./style.scss"

function Input({ icon = null, className = "", ...rest }) {
    const [isFocused, setIsFocused] = useState(false)

    console.log("Input", {isFocused, rest});

    return (
        // <div className={`input-field ${isFocused ? "focused" : ""} ${className}`}>
        <div className={createClass({focused: isFocused}, "input-field", className)}>
            {icon && <FontAwesomeIcon className="input-field__icon" size="lg" icon={icon} />}
            <input className="input-field__input" autoComplete="off" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} {...rest} />
        </div>
    )
}

export default Input