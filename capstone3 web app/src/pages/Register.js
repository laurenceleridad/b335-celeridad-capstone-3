import {Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2'

export default function Register(){

	// state hooks to store the values of input fields for Registration
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// state of the button
	const [isActive, setIsActive] = useState(false);

	// // states 
	// console.log(firstName);
	// console.log(lastName);
	// console.log(email);
	// console.log(mobileNo);
	// console.log(password);
	// console.log(confirmPassword);

	// useEffect() will only run once the firstName, lastName, email, mobileNo, password, confirmPassword state has been changed.
	// useEffect(() => {
	// 	if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (mobileNo.length >= 10) && (password === confirmPassword)){

	// 		// enables the button
	// 		setIsActive(true);
	// 	}
	// 	else{
	// 		setIsActive(false);
	// 	}
	// },[firstName, lastName, email, mobileNo, password, confirmPassword]);


	function registerUser(event){

		event.preventDefault(); // prevents the default behavior of an event. Specifically in our case submit event, it will prevent the refresh/redirection of the page

		fetch("http://localhost:4002/b2/users/", {
			method: 'POST',
			headers: { 'Content-Type' : "application/json"},
			body: JSON.stringify({
				firstName: firstName, 
				lastName: lastName,
				email: email,
				password: password,
				mobileNo: mobileNo
				
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.message === "Registered Successfully"){
				setFirstName('');
				setLastName('');
				setEmail('');
				setMobileNo('');
				setPassword('');
				setConfirmPassword('');
				Swal.fire({
				  icon: "success",
				  title: "Registered Successfully",
				});
			} else if (data.error === "All fields must be provided") {
	        	Swal.fire({
					  icon: "error",
					  title: "All fields must be provided",
					});
	      	} else if (data.error === "Duplicate email found") {
	        	Swal.fire({
					  icon: "error",
					  title: "Duplicate email found",
					  text: "Email already exist. Please try again."
					});
	      	} else if (data.error === "Enter 11 digit mobile number") {
		        Swal.fire({
					  icon: "error",
					  title: "Invalid mobile number",
					  text: "Enter 11 digit mobile number."
					});
	      	} else if (data.error === "Email invalid, no @ symbol") {
		        Swal.fire({
					  icon: "error",
					  title: "Invalid Email",
					  text: "Email invalid, no @ symbol."
					});
	      	}else if (data.error === "Password should be greater than 8 characters") {
		        Swal.fire({
					  icon: "error",
					  title: "Invalid Password",
					  text: "Password should be greater than 8 characters."
					});
	      	}else {
		       Swal.fire({
						  icon: "error",
						  title: "Failed to register",
						});
	      }
	    })
	    .catch(error => console.error("Error:", error))
	}

	return(
	<div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
		<Form onSubmit={(event) => registerUser(event)}>
			<h1 className="my-5 text-center">Register</h1>
			<Form.Group>
				<Form.Label>First Name: </Form.Label>
				<Form.Control type="text" placeholder="Enter First Name" required onChange={event => {setFirstName(event.target.value)}} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Last Name: </Form.Label>
				<Form.Control type="text" placeholder="Enter Last Name" required onChange={event => {setLastName(event.target.value)}} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Mobile No: </Form.Label>
				<Form.Control type="text" placeholder="Enter MobileNo" required onChange={event => {setMobileNo(event.target.value)}} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Email: </Form.Label>
				<Form.Control type="email" placeholder="Enter Email" required onChange={event => {setEmail(event.target.value)}} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Password: </Form.Label>
				<Form.Control type="password" placeholder="Enter Password" required onChange={event => {setPassword(event.target.value)}} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password: </Form.Label>
				<Form.Control type="password" placeholder="Confirm Password" required onChange={event => {setConfirmPassword(event.target.value)}} />
			</Form.Group>
			<Button className="mt-2" variant="primary" type="submit" id="submitBtn" >Submit </Button>
			{/*{	isActive === true ?
				<Button variant="primary" type="submit" id="submitBtn" >Submit
				</Button>
				:
				<Button variant="danger" type="submit" id="submitBtn" disabled>Submit
				</Button>
			}	*/}	
		</Form>
	    </div>
	  </div>
	</div>
	)



}