// @ts-nocheck
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DatePicker from "react-datepicker";
import { createClass } from "utils/generic.utils";
import { useEffect } from "react";

import "./style.scss"

function CustomDatepicker({ className = "", onChange, defaultValue, ...rest }) {
  useEffect(() => {
    if (defaultValue || defaultValue === 0) {
      onChange(defaultValue)
    }
  }, [])

  return (
    <div className={createClass({}, "custom-datepicker", className)}>
      <FontAwesomeIcon size="lg" icon={faCalendarDays} />
      <DatePicker {...rest} onChange={onChange} />
    </div>
  )
}

export default CustomDatepicker