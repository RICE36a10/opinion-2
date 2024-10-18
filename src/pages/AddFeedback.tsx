import FeedbackForm from "@/components/FeedbackForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const AddFeedback = () => {
  return (
      <div>
        <FeedbackForm/>
        <p style={{textAlign: 'center', color: 'white'}}>
          Made With <FontAwesomeIcon icon={faHeart} style={{color: 'red',}}/> By Yash
        </p>
      </div>
  );
};

export default AddFeedback;
