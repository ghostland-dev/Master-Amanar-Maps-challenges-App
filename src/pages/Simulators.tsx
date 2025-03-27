
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * This component redirects /simulators route to /simulator
 * to maintain backward compatibility with old links
 */
const Simulators = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the new simulator path
    navigate("/simulator", { replace: true });
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

export default Simulators;
