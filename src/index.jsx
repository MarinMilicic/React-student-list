import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentList from './view/StudentList';
import Edit from 'view/Edit';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from 'components/Header';
import { StudentProvider } from 'context/student.context';

import "./style.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <StudentProvider>
            <Header>
                <FontAwesomeIcon className="m-r-20" size="2x" icon={faBrain} />
                <h1>Brainlab</h1>
            </Header>
            <main className="main-container">
                <Routes>
                    <Route path='*' element={<Navigate to='/' />}></Route>
                    <Route path='/' element={<StudentList />}></Route>
                    <Route path='/edit' element={<Edit />}></Route>
                </Routes>
            </main>
        </StudentProvider>
    </BrowserRouter>
);
