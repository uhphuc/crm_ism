import { useAuth } from "../../hook/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById, getCustomerByEmail } from "../../api/customer";
import HomeContent from "../../components/customer/homeContent";

const CustomerHomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setIsLoading(true);
                const response = await getCustomerByEmail(user.email);
                setCustomer(response);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        if (user && user.role === "customer") {
            fetchCustomer();
        } else {
            navigate("/sign-in");
        }
    }
    , [user, navigate]);

    
    return (
        <>
        {
            (!customer?.phone &&  !customer?.address) ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-white">Please update your phone number.</p>
                    <Link to="/customer/update-profile" className="text-white underline">Update Profile</Link>
                </div>
            ) : (
                <div className="flex flex-col h-screen">
                    <HomeContent customer={customer} />
                </div>
            )
        }
        </>
    );
}
export default CustomerHomePage;