import { createClass } from "utils/generic.utils"

import "./style.scss"

function Header({ className = "", children }) {

  return (
    <header className={createClass({}, "header", className)}>{children}</header>
  )
}

export default Header