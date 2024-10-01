import ListElement from "./ListElement";

import "./style.scss";

function List({ title, data, renderData }) {
    const elementList = data.map((item, index) => {
        return <ListElement key={index}>{renderData(item)}</ListElement>
    });

    return (
        <>
            <h2 className="m-b-20">{title}</h2>
            <ul className="list">{elementList}</ul>
        </>
    );
}

export default List;