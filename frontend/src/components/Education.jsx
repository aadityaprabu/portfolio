import React from "react";

const EducationItem = ({ item }) => (
  <div className="relative mb-10 pl-8">
    <div className="absolute left-0 top-2 w-4 h-4 bg-[var(--primary)] rounded-full border-2 border-white"></div>
    <div className="bg-white/80 rounded-xl shadow-md p-6 border border-[var(--primary)]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <h3 className="text-2xl text-left font-bold text-[var(--primary)]">
          {item.degree ? `${item.degree}` : ""}
        </h3>

        <span className="text-md font-semibold text-gray-500">
          {item.dateStart} - {item.dateEnd}
        </span>
      </div>
      <div className="text-md text-left text-gray-500 mb-2">{item.level}</div>
      <div className="text-lg font-semibold text-gray-700 mb-1">
        {item.institution}
      </div>

      <div className="text-md text-gray-500 mb-2">{item.location}</div>
      {item.board && (
        <div className="text-md text-gray-500 mb-2">Board: {item.board}</div>
      )}
      {item.percentage && (
        <div className="text-md text-gray-800">
          Percentage: {item.percentage}
        </div>
      )}
      {item.cgpa && (
        <div className="text-md text-gray-800">CGPA: {item.cgpa}</div>
      )}
    </div>
  </div>
);

const Education = ({ education }) => {
  const safeEducation = Array.isArray(education) ? education : [];
  if (safeEducation.length === 0) {
    return <Loading />;
  }
  const sorted = [...safeEducation].sort((a, b) => {
    const parseDate = (date) => {
      const [year, month] = date.split("-");
      return new Date(Number(year), Number(month) - 1).getTime();
    };
    return parseDate(b.dateStart) - parseDate(a.dateStart);
  });
  return (
    <div className="max-w-4xl mx-auto py-16">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-[var(--primary)]">
        Education Timeline
      </h2>
      <div className="border-l-4 border-[var(--primary)] pl-2">
        {sorted.map((item, idx) => (
          <EducationItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

const Loading = () => (
  <div className="flex items-center justify-center h-full">
    <svg
      className="animate-spin h-8 w-8 text-[var(--primary)]"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
    <span className="ml-2 text-lg text-[var(--primary)]">Loading...</span>
  </div>
);
export default Education;
