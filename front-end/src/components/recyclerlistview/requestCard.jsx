import { Link } from 'react-router-dom';

const RequestCard = ({ id, topic, description, studentUsername, dateCreated }) => {
  return (
    <Link to={`/request/${id}`}>
      <div className="bg-lightsage font-figtree rounded-lg p-6 shadow-md flex items-center justify-between m-6">
        <div>
          {/* Topic */}
          <h3 className="text-xl font-bold text-black">{topic}</h3>
          
          {/* Description */}
          <p className="text-gray-700 mt-2">{description}</p>

          {/* Student ID */}
          <p className="text-gray-500 mt-4">Student: {studentUsername}</p>

          {/* Date Created */}
          <p className="text-gray-500 text-sm">Posted: {dateCreated.toDate().toString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
