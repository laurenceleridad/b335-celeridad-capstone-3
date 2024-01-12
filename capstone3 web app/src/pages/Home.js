import Banner from '../components/Banner';
// import Highlights from '../components/Highlights';
// import FeaturedCourses from "../components/FeaturedCourses";
// import CourseCard from '../components/CourseCard';

export default function Error() {

	const data = {
        title: "Welcome to FragmanHubPH",
        content: "Seller of authentic fragrances",
        destination: "/courses",
        label: "Browse products"
    }
    
	return (
		<>
			<Banner data={data}/>

		</>
	)
}