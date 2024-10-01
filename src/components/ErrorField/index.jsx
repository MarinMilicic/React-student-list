import { createClass } from "utils/generic.utils";

import "./style.scss"

function ErrorField({ className = "", error = null, children }) {
    return (
        <div className={createClass({invalid: error}, "error-field", className)}>
            {children}
            <div className="error-field__message">{error}</div>
        </div>
         
    )
}

export default ErrorField;