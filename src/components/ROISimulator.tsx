
import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { slideIn } from "@/lib/animations";
import ROIForm from "./roi-simulator/ROIForm";
import ROIResults from "./roi-simulator/ROIResults";
import { calculateROI, ROIResults as ROIResultsType } from "./roi-simulator/utils";

const ROISimulator = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [investment, setInvestment] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(1500);
  const [costs, setCosts] = useState<number>(500);
  const [period, setPeriod] = useState<string>("month");
  const [results, setResults] = useState<ROIResultsType | null>(null);
  
  const calculate = () => {
    const calculationResults = calculateROI(investment, revenue, costs);
    setResults(calculationResults);
    
    if (resultsRef.current) {
      slideIn(resultsRef.current, 'up');
    }
  };
  
  const reset = () => {
    setInvestment(1000);
    setRevenue(1500);
    setCosts(500);
    setPeriod("month");
    setResults(null);
  };
  
  useEffect(() => {
    if (simulatorRef.current) {
      slideIn(simulatorRef.current, 'right');
    }
  }, []);
  
  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div ref={simulatorRef}>
          <ROIForm 
            investment={investment}
            setInvestment={setInvestment}
            revenue={revenue}
            setRevenue={setRevenue}
            costs={costs}
            setCosts={setCosts}
            period={period}
            setPeriod={setPeriod}
            calculateResults={calculate}
            reset={reset}
          />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center">
              <Heart className="mr-1 h-4 w-4 text-red-500" />
              Développé pour vous aider à prendre de meilleures décisions financières
            </p>
          </div>
        </div>
        
        {results && (
          <div ref={resultsRef}>
            <ROIResults results={results} period={period} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ROISimulator;
