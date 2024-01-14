import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewCourses from './PreviewCourses';

export default function FeaturedCourses(){

	const[previews, setPreviews] = useState([]);

	useEffect(()=>{
		fetch(`http://localhost:4000/courses/`)
		.then(res => res.json())
		.then(data => { //[{course 1}, {course 2}, {course 3}, ....]

			//to store random indeces and featured course previews	
			const numbers = [];
			const featured = [];

			//this function is to generate unique random indeces

			const generateRandomNums = () => {
			        let randomNum = Math.floor(Math.random() * data.length)

			        if(numbers.indexOf(randomNum) === -1){
			          // If the random index is not in the array, add it
			          numbers.push(randomNum);
			          console.log("Numbers state");
			          console.log(numbers);
			        } else {
			          // If the random index is already in the array, generate a new one
			          generateRandomNums()
			        }
			      }
			      	//This loop will generate 5 random numbers/indeces through the use of generateRandomNums function
			      for(let i = 0; i < 5; i++){
			              generateRandomNums();

			              console.log("shuffled courses");
			              console.log(numbers);
			              console.log(data[numbers[i]]._id);//This is to get the id of the object
			              //kinuha id using index number
			              console.log(data[numbers[i]]);//The actual object retrieved using the index number
			              //kinuha course using index number

			              // Push a PreviewCourses component with the data of the randomly selected course
			              featured.push(
			                <PreviewCourses key={data[numbers[i]]._id} data={data[numbers[i]]} breakPoint={2} />
			              );
			            }

			            //featured state will contain 5 prevouew Courses component, then it is assigned to previews state.
			            setPreviews(featured);
		})

	}, []);

	return (
		<>
			<h2 className = "text-center">Featured Courses</h2>
			<CardGroup className = "justify-content-center">
			{/*this will render the 5 PreviewCourses component stored in previews state*/}
			{previews}
			</CardGroup>
		</>

	)
}