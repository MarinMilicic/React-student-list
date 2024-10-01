import Input from "components/Input";
import { useContext, useState } from "react";
import { getValues, url } from "utils/generic.utils";
import CustomDatepicker from "components/CustomDatepicker";
import ErrorField from "components/ErrorField";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { StudentContext } from "context/student.context";

const INITIAL_ERRORS = {
    name: null,
    surname: null,
    percentage: null,
    birthDate: null,
}

function Edit() {
    const [error, setError] = useState(INITIAL_ERRORS)
    const [birthDate, setBirthDate] = useState(null);
    const navigate = useNavigate()
    const { selectedStudent } = useContext(StudentContext)

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(event);

        const data = getValues(event.target)
        console.log("Formdata", data);

        // @ts-ignore
        const isValid = validate(data)
        console.log(isValid);

        if (isValid) {
            if (selectedStudent?.id || selectedStudent?.id === 0) {
                await axios.put(url(`/students/${selectedStudent.id}`), { ...data, birthDate: new Date(data.birthDate).getTime() })
                console.log("put");
            } else {
                await axios.post(url("/students"), { ...data, birthDate: new Date(data.birthDate).getTime() })
                console.log("post");
            }

            navigate("/")
        }
        // console.log(error)
    }

    const validate = ({ name, surname, percentage }) => {
        let isValid = true

        setError(INITIAL_ERRORS)

        if (!name) {
            setError(prevState => ({ ...prevState, name: "Name is required!" }))
            isValid = false
        }

        if (!surname) {
            setError(prevState => ({ ...prevState, surname: "Surname is required!" }))
            isValid = false
        }

        if (percentage === "" || percentage < 0 || percentage > 100) {
            setError(prevState => ({ ...prevState, percentage: "Percentage must be between 0 and 100!" }))
            isValid = false
        }

        if (!birthDate) {
            setError(prevState => ({ ...prevState, birthDate: "Please select your birth date!" }))
            isValid = false
        }

        return isValid
    }

    console.log("selectedStudent", selectedStudent);
    console.log("Hook Birthdate", birthDate);

    return (
        <form className="flex flex-column" onSubmit={submitHandler}>
            <ErrorField error={error.name}>
                <Input name="name" placeholder="Name" defaultValue={selectedStudent?.name} />
            </ErrorField>
            <ErrorField error={error.surname}>
                <Input name="surname" placeholder="Surname" defaultValue={selectedStudent?.surname} />
            </ErrorField>
            <ErrorField error={error.percentage}>
                <Input name="percentage" type="number" placeholder="Percentage" defaultValue={selectedStudent?.percentage} />
            </ErrorField>
            <ErrorField className="m-b-30" error={error.birthDate}>
                <CustomDatepicker name="birthDate" selected={birthDate} onChange={(date) => setBirthDate(date)} defaultValue={selectedStudent?.birthDate} />
            </ErrorField>
            <div className="flex">
                <button className="button m-r-10 grow" type="submit">Submit</button>
                <NavLink className="grow" to="/">
                    <button className="button button--disabled w-100" type="button">Cancel</button>
                </NavLink>
            </div>

        </form>
    );
}

export default Edit;