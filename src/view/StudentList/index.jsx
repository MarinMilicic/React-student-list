import List from "components/List";
import Input from "components/Input";
import { useContext, useEffect, useState } from "react";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Moment from "react-moment";
import axios from "axios";
import { url } from "utils/generic.utils";
import { NavLink, useNavigate } from "react-router-dom";
import { StudentContext } from "context/student.context";

import "./style.scss"


function StudentList() {
  const [students, setStudents] = useState([])
  const { selectedStudent, setSelectedStudent } = useContext(StudentContext)
  const navigate = useNavigate()

  const inputHandler = (event) => {
    const filter = event.target.value

    fetchStudents(filter)
  }

  const fetchStudents = async (filter = "") => {
    const { data } = await axios.get(url("/students"))

    const filteredResults = data.filter(({ name, surname }) => {
      const value = `${name}${surname}`.toLowerCase()
      return value.includes(filter.toLowerCase())
    })

    console.log("Handler", filteredResults);
    setStudents(filteredResults);
  }

  const deleteStudent = async (id) => {
    await axios.delete(url(`/students/${id}`))

    fetchStudents()
  }

  const editHandler = (student) => {
    setSelectedStudent(student)
    navigate("/edit")
    // console.log(selectedStudent);
    // console.log(student);
  }

  useEffect(() => {
    fetchStudents();
    setSelectedStudent(null);
    console.log("Effect: Hello");
  }, [])


  console.log("Render", students);

  return (
    <>
      <Input className="m-b-20 m-t-10" icon={faMagnifyingGlass} type="text" placeholder="Search..." onChange={inputHandler} />
      <NavLink className="m-b-10" to="/edit">
        <button className="button" type="button">Add new student</button>
      </NavLink>
      <List title="Prvi kolokvij" data={students} renderData={({ id, name, surname, percentage, birthDate }) => (
        <div className="flex flex-align-center w-300px" onClick={() => editHandler({ id, name, surname, percentage, birthDate })}>
          <div>
            <div className="flex gap-10 m-b-10">
              <span>{name}</span>
              <span>{surname}</span>
              <span><Moment format="DD MMMM YYYY">{birthDate}</Moment></span>
            </div>
            <div>Test result: {percentage}%</div>
          </div>
          <FontAwesomeIcon className="m-l-auto" size="lg" color="red" icon={faXmark} onClick={(event) => {
            event.stopPropagation()
            deleteStudent(id)
          }}
          />
        </div>
      )} />
    </>
  )
}

export default StudentList;
