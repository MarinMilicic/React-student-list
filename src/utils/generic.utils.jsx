import { API_HOST } from "constants/generic.constants";

export function createClass(classObj, ...rest) {
    console.log("CreateClass 1:", classObj, rest)

    const classes = Object.keys(classObj).filter((key) => classObj[key])

    console.log("CreateClass 2:", classes);

    // return `${classes.join(" ")} ${rest.join(" ")}`
    return [...classes, ...rest].join(" ")
}

export function url(path) {
    return `${API_HOST}${path}`
}

export function getValues(form) {
     const formData = new FormData(form)

     // @ts-ignore
     return Object.fromEntries(formData)
}