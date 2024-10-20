import { Link } from 'react-router-dom';

const RequestCard = ({ id, topic, description, studentUsername, dateCreated, tutorId, complete }) => {
  return (
    <Link to={`/request/${id}`}>
      <div className="transition ease-in-out delay-150 hover:bg-sagelite bg-lightsage font-figtree rounded-lg p-6 shadow-md flex items-center justify-between m-6">
        <div>
          {/* Topic */}
          <h3 className="text-xl font-bold text-black">{topic}</h3>
          
          {/* Description */}
          <p className="text-gray-700 mt-2">{description}</p>

          {/* Student ID */}
          <p className="text-gray-500 mt-4">Student: {studentUsername}</p>

          {/* Date Created */}
          <p className="text-gray-500 text-sm">Posted: {dateCreated.toDate().toString()}</p>
          <div className={`my-2 p-2 rounded-md inline-block ${tutorId ? "bg-darksage" : "bg-red"}`}>
            <p className="text-white text-sm">{tutorId ? "Claimed" : "Not Claimed"}</p>
          </div>
          <div className={`my-2 ml-2 p-2 rounded-md inline-block ${complete ? "bg-darksage" : "bg-red"}`}>
            <p className="text-white text-sm">{complete ? "Tutoring Complete" : "In Progress"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
