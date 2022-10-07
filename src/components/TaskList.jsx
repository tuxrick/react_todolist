import React , { useState, useEffect } from "react";
import Checkbox from "./Checkbox";


const TaskList = props => {
    const { list, setList } = props;
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);


    
    let inputElement = "";
    const fileReader = new FileReader();
    
    useEffect(() => {
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);

            };

            fileReader.readAsText(file);
            setFile(null);
        }        
    }, [file]);

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
        const array = csvRows.map(i => {
          const values = i.split(",");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
    
        setArray(array);
        
        array.map((item) => (
            list.push({done: false, id: (+new Date()).toString() ,description: item.Tasks})
        ));                    
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        inputElement.click();

            
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);

            };

            fileReader.readAsText(file);
            setFile(null);

        }
    
        
    };

    const onChangeStatus = e => {
        const { name, checked } = e.target;
        const updateList = list.map(item => ({
            ...item,
            done: item.id === name ? checked : item.done
          }));
          setList(updateList);
    };

    const onClickRemoveItem = e => {
        const updateList = list.filter(item => !item.done);
        setList(updateList);
    };

    const chk = list.map(item => (
        <Checkbox key={item.id} data={item} onChange={onChangeStatus} />
    ));

	return ( 
        <div className="todo-list">
            {list.length ? chk : "No tasks"}
            {list.length ? (
            <p>
            <button className="button list-btn" onClick={onClickRemoveItem}>
                Delete all done
            </button>
            </p>
            ) : null}
            <br/>
            <form>
                <input
                    style={{ display: "none" }}
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                    ref={input => {inputElement = input;}}
                />
                <button 
                    className="button list-btn"                     
                    onClick={handleOnSubmit}
                >
                    Import CSV  
                </button>
            </form>                
        </div>
    );
};

export default TaskList;