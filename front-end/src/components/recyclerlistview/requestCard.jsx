import { Link } from 'react-router-dom';

const RequestCard = ({ id, topic, description, studentId, dateCreated }) => {
  return (
    <Link to={`/request/${id}`}>
      <div className="bg-gray-100 rounded-lg p-6 shadow-md flex items-center justify-between">
        <div>
          {/* Topic */}
          <h3 className="text-xl font-bold text-black">{topic}</h3>
          
          {/* Description */}
          <p className="text-gray-700 mt-2">{description}</p>

          {/* Student ID */}
          <p className="text-gray-500 mt-4">Student: {studentId}</p>

          {/* Date Created */}
          <p className="text-gray-500 text-sm">Posted: {dateCreated.toDate().toString()}</p>
        </div>

        {/* Accept Button */}
        <div className="flex flex-col items-center">
          <button className="bg-green-700 text-white py-2 px-4 rounded-lg mt-4">
            Accept
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
