import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa"; // Changed PDF icon to File icon

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        
        {/* Left Side - Profile Image & Social Links */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
            <img 
              src="Profile.png" // Replace this with your image path
              alt="Vakhtangi Sheklashvili"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Links */}
          <div className="flex mt-6 space-x-4">
            <a 
              href="https://www.linkedin.com/in/vakhtangi-sheklashvili-3606a12b8/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-3 rounded-full text-2xl shadow-lg 
              transition-all duration-300 transform hover:scale-110 hover:bg-blue-700"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com/Vahunhula" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 text-white p-3 rounded-full text-2xl shadow-lg 
              transition-all duration-300 transform hover:scale-110 hover:bg-gray-900"
            >
              <FaGithub />
            </a>
            <a 
              href="cv.pdf" // Replace with your actual CV link
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white p-3 rounded-full text-2xl shadow-lg 
              transition-all duration-300 transform hover:scale-110 hover:bg-green-700"
            >
              <FaFileAlt /> {/* This is the new file icon */}
            </a>
          </div>
        </div>

        {/* Right Side - Text */}
        <div className="text-center md:text-left md:ml-12">
          <h1 
            className="text-4xl md:text-6xl font-extrabold mb-4"
            style={{ fontFamily: 'Tektur, sans-serif' }}
          >
            WELCOME TO <br /> <span className="text-blue-500">MY PORTFOLIO</span>
          </h1>
          <p 
            className="text-lg text-gray-300 mb-6 max-w-md"
            style={{ fontFamily: 'Tektur, sans-serif' }}
          >
            Discover my creative work and projects that define my journey.
          </p>
          <a
            href="#projects"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md 
            hover:bg-blue-600 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Tektur, sans-serif' }}
          >
            View My Work
          </a>
        </div>

      </div>
    </section>
  );
}
