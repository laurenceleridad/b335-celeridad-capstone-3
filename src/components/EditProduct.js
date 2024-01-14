import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function EditProduct({product, fetchData}){

	//State for courseId for the fetch URl
	const [productId, setProductId] = useState('');

	//Form State
	const[name, setName] = useState("");
	const[description, setDescription] = useState("");
	const[price, setPrice] = useState("");

	//state for editCourse modals to open/close
	//pagclick ng button na editcourse may function na mattrigger para magkaron ng formbox msg
	const[showEdit, setShowEdit] = useState(false);

	// openEdit();
	// function openEdit(courseId){
	// 	//function declaration
	// 	//invoke before and after decalartion
	// }
	// openEdit();

	// const openEdit = function(courseId){
	// 	//function expression
	// 	//hindi pwede iinvoke before
	// 	//laging after ng declaration
	// }
	// openEdit();

	const openEdit = (productId) => {
		//request to get specific course
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then( data => {

			setProductId (data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

		setShowEdit(true);

	}

	//pagcnlose naman yng form clear the state
	const closeEdit = () => {
			setShowEdit(false);
			setName("");
			setDescription("");
			setPrice(0);
	}

	const editProduct = ( e, productId) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
			method:"PATCH",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem('access')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);
			if(data && data.message === 'Product updated successfully'){
				Swal.fire({
						title: 'Success!',
						icon: 'success',
						text: 'Product Successfully Updated'
					})
				closeEdit();
				fetchData();
			}
			else{
				Swal.fire({
						title: 'Error!',
						icon: 'error',
						text: 'Please try again'
					})
				closeEdit();
				fetchData();
			}
		})
	}

	return (
		<><Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={event => editProduct(event, productId)} >
					<Modal.Header closeButton> 
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={event => setName(event.target.value)} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description} onChange={event=> setDescription(event.target.value)} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price} onChange={event=> setPrice(event.target.value)} required />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
			          <Button variant="secondary" onClick={closeEdit}>Close</Button>
			          <Button variant="primary" type="submit">Save Changes</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)

}