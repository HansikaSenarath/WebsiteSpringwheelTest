const LeadershipApplication = ({ section }) => {
  return (
    <div className="mt-8 bg-gray-50 border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">
        Leadership Application
      </h3>
      <ul className="list-disc ml-5 text-gray-700 space-y-2">
        {section.leadershipApplication.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeadershipApplication;
