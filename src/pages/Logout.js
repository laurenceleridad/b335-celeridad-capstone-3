import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect } from 'react';

	export default function Logout() {

		const {unsetUser, setUser} = useContext(UserContext);
		// localStorage.clear();
		unsetUser(); //clear local storage

		useEffect(()=>{
			setUser({id:null, isAdmin:null}); //to set userState access field to null
		})

	    // Redirect back to login
	    return (
	        <Navigate to='/login' />
	    )

}