export default function Projects() {
  const projects = [
    { title: "Project 1", description: "A cool project I built" },
    { title: "Project 2", description: "Another cool project" },
  ];

  return (
    <section id="projects" className="bg-black text-white py-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}