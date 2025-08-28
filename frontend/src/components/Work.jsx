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

// const workData = {
//   internships: [
//     {
//       title: "Application Developer Intern",
//       company: "IDFC FIRST Bank Limited",
//       location: "Chennai, India",
//       dateStart: "2024-01",
//       dateEnd: "2024-06",
//       description:
//         "Gained hands-on experience in test-driven development with Golang and ReactJS. Participated in simulated team meetings and discussions, conducted seminars, and led knowledge transfer and brain refresher sessions. Contributed to the development of an anomaly detection system for identifying potential fraudulent transactions using clustering and decision tree-based machine learning models.",
//     },
//     {
//       title: "Application Developer Intern",
//       company: "Pavartha Software Private Limited",
//       location: "Chennai, India",
//       dateStart: "2023-06",
//       dateEnd: "2023-07",
//       description:
//         "Developed a cross-platform mobile application using Ionic Angular, enabling users to seamlessly retrieve and view real-time sunrise and sunset timings based on their current or selected location.",
//     },
//   ],
//   workExperience: [
//     {
//       title: "Application Developer",
//       company: "IDFC FIRST Bank Limited",
//       squad: "Fraud Risk Management",
//       location: "Chennai, India",
//       dateStart: "2024-07",
//       dateEnd: "Present",
//       description:
//         "Currently working on Project Optimus, a web and mobile banking application, with a focus on building rule engines, and tracking and blocking malicious activities to enhance system security. Developing machine learning systems to detect anomalies in customer behavior, automating scripts for generating daily and monthly rule breach reports, archiving data from mongo to S3, and creating proof of concepts to introduce and validate new ideas. Current tech stack: Python, ReactJS, NodeJS, AWS, Golang.",
//     },
//   ],
// };
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
        <div className="text-base text-gray-800 w-full block pl-0 text-left">
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
