export default function Skills() {
    const skills = [
      { name: "React", level: "Intermediate" },
      { name: "Next.js", level: "Intermediate" },
      { name: "JavaScript", level: "Advanced" },
      { name: "HTML & CSS", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
      { name: "MongoDB / Firebase", level: "Intermediate" },
      { name: "Java", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "C#", level: "Advanced"},
    ];
  
    return (
      <section className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-extrabold text-blue-500 mb-8" style={{ fontFamily: 'Tektur, sans-serif' }}>
          My Skills
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-semibold">{skill.name}</h2>
              <div className="bg-gray-700 w-full h-2 rounded-md overflow-hidden mt-2">
  <div 
    className="bg-blue-500 h-full"
    style={{ width: skill.level === "Advanced" ? "100%" : skill.level === "Intermediate" ? "70%" : "40%" }}
  ></div>
</div>

            </div>
          ))}
        </div>
      </section>
    );
  }
  