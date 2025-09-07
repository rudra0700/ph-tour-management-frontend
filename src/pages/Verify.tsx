import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email] = useState(location.state);

    useEffect(() => {
       if(!email){
        navigate("/")
       }
    }, [email])
    return (
        <div>
            <h1>From verification page</h1>
        </div>
    );
};

export default Verify;