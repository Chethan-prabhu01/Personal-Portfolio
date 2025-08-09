import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import profile from './profile.png';
import jobportal from './jobportal.jpeg';
import textto from './textto.jpeg';
import quizapp from './quizapp.png';
import ml from './ml.jpeg';
import weather from './weather.png';
import tic from './tic.jpeg';

import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Download, 
  ExternalLink, 
  Code, 
  Briefcase, 
  User, 
  Home, 
  MessageSquare,
  ChevronDown,
  Phone,
  Send
} from 'lucide-react';

// Typing Animation Hook
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};

// Navbar Component
const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, section: 'home' },
    { name: 'About', icon: User, section: 'about' },
    { name: 'Skills', icon: Code, section: 'skills' },
    { name: 'Experience', icon: Briefcase, section: 'experience' },
    { name: 'Projects', icon: Code, section: 'projects' },
    { name: 'Contact', icon: MessageSquare, section: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50 ${
                  activeSection === item.section 
                    ? 'text-blue-400 bg-gray-700/30' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const typedText = useTypewriter("Full Stack Developer", 100);
  const [heroRef, heroInView] = useIntersectionObserver();

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className={`max-w-4xl mx-auto text-center px-4 relative z-10 transition-all duration-1000 ${
        heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="mb-8">
          <img 
            src={profile}
            alt="Profile" 
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-400 shadow-xl animate-bounce"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Chethan Prabhu</span>
        </h1>
        
        <div className="text-2xl md:text-3xl mb-8 h-12">
          <span className="text-gray-300">I'm a </span>
          <span className="text-blue-400 font-semibold">{typedText}</span>
          <span className="animate-pulse">|</span>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Passionate about creating innovative web solutions and bringing ideas to life through code.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <a href="#projects">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            View My Work
          </button>
          </a>
           <a href="#experience">
          <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
            Experience
          </button>
           </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [aboutRef, aboutInView] = useIntersectionObserver();

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={aboutRef} className={`transition-all duration-1000 ${
          aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">
                Hello! I'm Chethan Prabhu
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A dedicated Computer Science student with a strong commitment to mastering the skills required to become a proficient full stack developer. I am deeply passionate about building intuitive and impactful digital solutions, and I approach every challenge with curiosity and a desire to learn. From front-end design to back-end development, I strive to create applications that are not only functional but also user-friendly and scalable.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I continuously explore emerging technologies, keeping pace with the fast-evolving tech landscape. Whether it's diving into the latest frameworks or refining my problem-solving skills, I believe in constant growth. I'm eager to contribute to forward-thinking teams where innovation, collaboration, and continuous improvement are valued—while making a meaningful impact through the work I do.
              </p>
              
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2 text-white">
                <a
                href="/Chethan_prabhu_resume__.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2 text-white"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
                </button>
                
                
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-2xl">
                <img 
                  src={profile}
                  alt="About me" 
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const [skillsRef, skillsInView] = useIntersectionObserver();
  
  const skills = [
    { name: 'React.js', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
    { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Python', level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'MongoDB', level: 75, color: 'from-green-400 to-green-600' },
    { name: 'Java', level: 88, color: 'from-blue-400 to-blue-600' },
    { name: 'SQL', level: 88, color: 'from-blue-400 to-blue-600' },
    { name: 'Git & GitHub', level: 88, color: 'from-blue-400 to-blue-600' },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={skillsRef} className={`transition-all duration-1000 ${
          skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{
                      width: skillsInView ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [expRef, expInView] = useIntersectionObserver();
  
  const experiences = [
    {
      title: 'Java Developer Intern',
      company: 'InnoByte Services',
      period: ' Oct 2024 - Nov 2024 ',
      description: 'Developed a Java-based Online Quiz Application with secure user authentication using SHA-256 and MySQL integration via JDBC, implementing CRUD operations for managing users, quizzes, and results, along with admin controls for quiz and question management; users can register, log in, take quizzes, and track their performance through a console-based interface.'
    },
    {
      title: 'IBM Skillsbuild Internship On AI & IBM Cloud Technologies',
      company: 'Edunet Foundation',
      period: ' July 2025 - Present',
      description: 'Developing a Network Intrusion Detection System (NIDS) using machine learning to detect malicious network activities early, leveraging a Kaggle dataset for model training and evaluation. The project integrates IBM Cloud Lite services, offering hands-on experience in a cloud-based AI environment. This showcases my skills in machine learning, AI, and cloud technology through a functional and effective security solution.'
    }, 
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div ref={expRef} className={`transition-all duration-1000 ${
          expInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-600"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start mb-12 ml-16">
                <div className="absolute -left-8 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900"></div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                  <h4 className="text-blue-400 font-medium mb-2">{exp.company}</h4>
                  <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [projectsRef, projectsInView] = useIntersectionObserver();
  
  const projects = [
    {
      title: 'Job Portal',
      description: 'A robust full-stack job portal web application that bridges the gap between job seekers and recruiters. This project is developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) and includes modern UI practices using HTML, CSS, and JavaScript.',
      image: jobportal,
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js','HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Chethan-prabhu01/JOB_PORTAL',
      demo: 'https://github.com/Chethan-prabhu01/JOB_PORTAL'
    },
    {
      title: 'Text-to-Image-Converter',
      description: 'Built a text-to-image generation platform using JavaScript, COCO dataset, Hugging Face APIs, and ZB-Tech models to convert narrative descriptions into realistic visuals.',
      image: textto,
      technologies: ['HTML', 'CSS', 'JavaScript', 'COCO Dataset', 'Hugging Face API', 'ZB-Tech Models'],
      github: 'https://github.com/Chethan-prabhu01/Text-to-image-converter',
      demo: 'https://github.com/Chethan-prabhu01/Text-to-image-converter'
    },
    {
      title: 'Quiz Application',
      description: 'QuizApplication is a Java-based console application that allows users to create, manage, and participate in quizzes. It leverages a MySQL database to store users, quizzes, questions, and quiz history securely.',
      image: quizapp,
      technologies: ['Java', 'JDBC', 'MySQL', 'SHA-256', 'Console I/O'],
      github: 'https://github.com/Chethan-prabhu01/QuizApplication',
      demo: 'https://github.com/Chethan-prabhu01/QuizApplication'
    },
     {
      title: 'WeatherNow',
      description: 'WeatherNow is a clean, modern, and responsive web app built using HTML, CSS, and JavaScript, allowing users to check real-time weather conditions by city or country. It fetches live weather data including temperature, humidity, wind speed, UV index, and more using a weather API.',
      image: weather,
      technologies: ['HTML', 'CSS', 'JavaScript', 'Weather API','JSON'],
      github: 'https://github.com/Chethan-prabhu01/WeatherNow',
      demo: 'https://weather-now-sable-two.vercel.app/'
    },
    {
      title: 'NETWORK-INTRUSION-DETECTION-SYSTEM-USING-ML',
      description: 'Developed a Machine Learning-based Network Intrusion Detection System (NIDS) using a Kaggle dataset to identify malicious network activities. Integrated IBM Cloud Lite services to deploy and evaluate the model, showcasing skills in ML, AI, and cloud computing',
      image: ml,
      technologies: ["AI","IBM Cloud","ML"],
      github: 'https://github.com/Chethan-prabhu01/NETWORK-INTRUSION-DETECTION-SYSTEM-USING-ML',
      demo:    'https://github.com/Chethan-prabhu01/NETWORK-INTRUSION-DETECTION-SYSTEM-USING-ML'
    },
    {
      title: 'Tic-Tac-Toe Game',
      description: 'A responsive and interactive Tic-Tac-Toe web game built using HTML, CSS, and JavaScript. Features include Player vs Player and Player vs AI modes using the Minimax algorithm. Includes game restart, visual highlights for wins, and clean UI/UX.',
      image: tic,
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Chethan-prabhu01/Tic-Tac-Toe-Game',
      demo: 'https://tic-tac-toe-game-dun-eta.vercel.app/'
    }

  ];

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={projectsRef} className={`transition-all duration-1000 ${
          projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a 
                      href={project.github}
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={project.demo}
                      className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a 
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [contactRef, contactInView] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    'service_om3nvrk',       
    'template_hbcvyeb',      
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message
    },
    'q6tHlYVB7gjIBIkBy'        
  )
  .then((result) => {
      alert("Message sent successfully ✅");
      setFormData({ name: '', email: '', message: '' }); 
  })
  .catch((error) => {
      alert("Failed to send message ❌");
      console.error(error);
  });
};

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={contactRef} className={`transition-all duration-1000 ${
          contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">prabhuchethan69@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">8904329315</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Mangalore, Karnataka , India</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a href="https://github.com/Chethan-prabhu01" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <Github className="w-6 h-6 text-white" />
                </a>
                <a href="https://www.linkedin.com/in/chethan-prabhu-71a2542b7" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a href="mailto:prabhuchethan69@gmail.com" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-white font-semibold"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Chethan Prabhu. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/Chethan-prabhu01" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/chethan-prabhu-71a2542b7/" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:prabhuchethan69@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;