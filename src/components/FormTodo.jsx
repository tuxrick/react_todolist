import React , { useState } from "react";

const FormTodo = props => {
	const [description, setDescription] = useState("");
	const { handleAddItem } = props;
	const handleSubmit = e => {
		e.preventDefault();

		console.log(description);
		handleAddItem({
			done: false,
			id: (+new Date()).toString(),
			description
		  });		
		setDescription("");
	  };	
	return (
	  <form onSubmit={handleSubmit}>

		<div className="todo-list">
		  <div className="file-input">
			<input
			  type="text"
			  className="text"
			  value={description}
			  placeholder="Your next task!"
			  onChange={e => setDescription(e.target.value)}
			/>
			
			<button
			  className="button input-btn"
			  disabled={description ? "" : "disabled"}
			>
			  Add
			</button>
		  </div>
		</div>
	  </form>
	);
  };

export default FormTodo;