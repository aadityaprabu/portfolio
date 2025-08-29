import React from "react";

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

const TimelineItem = ({ item, type }) => {
  return (
    <div className="relative mb-10 pl-8">
      <div className="absolute left-0 top-2 w-4 h-4 bg-[var(--primary)] rounded-full border-2 border-white"></div>
      <div className="bg-white/80 rounded-xl shadow-md p-6 border border-[var(--primary)]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
          <h3 className="text-2xl font-bold text-[var(--primary)]">
            {item.title}
          </h3>
          <span className="text-md font-semibold text-gray-500">
            {item.dateStart} - {item.dateEnd}
          </span>
        </div>

        <div className="text-lg font-semibold text-gray-700 mb-1">
          {item.company}
        </div>

        <div className="text-md text-gray-500 mb-2">{item.location}</div>
        <div className="text-lg text-gray-500 mb-1 text-left">
          {item.squad ? `${item.squad} ` : ""}
        </div>
        <div className="text-base text-gray-800 block pl-0 w-full text-justify">
          {item.description}
        </div>
      </div>
    </div>
  );
};

const Work = ({ work, internship }) => {
  // Safely default to empty arrays if props are missing
  const safeWork = Array.isArray(work) ? work : [];
  const safeInternship = Array.isArray(internship) ? internship : [];

  // Combine and tag items
  const allItems = [
    ...safeWork.map((item) => ({ ...item, type: "work" })),
    ...safeInternship.map((item) => ({ ...item, type: "intern" })),
  ];

  if (allItems.length === 0) {
    return <Loading />;
  }

  const parseDate = (date) => {
    if (date === "Present") return Infinity;
    const [year, month] = date.split("-");
    return new Date(Number(year), Number(month) - 1).getTime();
  };

  allItems.sort((a, b) => {
    const aStart = parseDate(a.dateStart);
    const bStart = parseDate(b.dateStart);
    if (aStart !== bStart) return bStart - aStart;
    const aEnd = parseDate(a.dateEnd);
    const bEnd = parseDate(b.dateEnd);
    return bEnd - aEnd;
  });

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-[var(--primary)]">
        Work Experience Timeline
      </h2>
      <div className="border-l-4 border-[var(--primary)] pl-2">
        {allItems.map((item, idx) => (
          <TimelineItem key={idx} item={item} type={item.type} />
        ))}
      </div>
    </div>
  );
};
export default Work;
