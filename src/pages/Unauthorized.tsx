import { Button } from "@/components/ui/button";
import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div>
            <h1 className="text-xl">Fuck of man</h1>
            <p className="text-lg">You are Unauthorized</p>
            <Link to={"/"}><Button>Go back Motherfucker</Button></Link>
        </div>
    );
};

export default Unauthorized;