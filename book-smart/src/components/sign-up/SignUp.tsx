import { useEffect } from 'react';
import '../ExploreContainer.css';

// interface ContainerProps {
//   name: string;
// }

const SignUp: React.FC = () => {
    useEffect(()=>{
        console.log("signup");
    },[])
  return (
    <div className="container">
      <strong>BOOKSMART</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">SignUp options</a></p>
    </div>
  );
};

export default SignUp;