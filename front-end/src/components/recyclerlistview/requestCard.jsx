const RequestCard = ({ topic, description, studentId, tutorId, complete, dateCreated }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Topic: {topic}</h3>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Student ID:</strong> {studentId}</p>
      <p><strong>Tutor ID:</strong> {tutorId}</p>
      <p><strong>Completed:</strong> {complete ? 'Yes' : 'No'}</p>
      <p><strong>Date Created:</strong> {new Date(dateCreated.toDate()).toLocaleString()}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: 16,
    margin: '10px 0',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default RequestCard;
