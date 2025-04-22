import React, { useState, useCallback } from 'react';
import { Github, Linkedin, Mail, X, Check, Download, ExternalLink } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);

      const response = await fetch('/resume.pdf');
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'janikaa_resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadError('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const skills = [
    'Python', 'C', 'Java', 'HTML', 'CSS', 'Javascript',
    'Wireshark', 'BurpSuite', 'React', 'nmap', 'Metasploit', 'Figma'
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#F1EBD4] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#0D0D0D]/90 backdrop-blur-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-display font-bold text-[#E576CD]">janikaa</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#F1EBD4] hover:text-[#E576CD] transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pl-[15%]">
              <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                Hi, I'm Janikaa.
              </h2>
              <p className="text-xl font-medium mb-4 text-[#CB7CC7]">
                Exploring web development and cybersecurity
              </p>
              <p className="mb-8 text-lg">
                B.E. in CS (Cybersecurity), DSCE (2026)
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#E576CD] text-[#0D0D0D] px-6 py-3 rounded-lg hover:bg-[#CB7CC7] transition-colors font-medium flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Work in Progress
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="border border-[#E576CD] text-[#E576CD] px-6 py-3 rounded-lg hover:bg-[#E576CD] hover:text-[#0D0D0D] transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  Download Resume
                </button>
              </div>
              {downloadError && (
                <p className="mt-2 text-red-500 text-sm">{downloadError}</p>
              )}
            </div>
            <div className="relative flex justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-full border-4 border-[#E576CD]">
                <img
                  src= "/pfp.jpg" 
                  alt="Professional headshot"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-[#E576CD]">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F1EBD4]/10 rounded-2xl p-6 hover:transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-display font-bold mb-4">Furhaven</h3>
              <p className="mb-4">
                Furhaven is a platform that helps users locate nearby animal shelters,
                donate, volunteer, and support pet welfare.
              </p>
              <a
                href="https://github.com/Janikaa17/FurHaven"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#E576CD] hover:text-[#CB7CC7] font-medium"
                aria-label="View Furhaven project on GitHub"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F1EBD4]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-display font-bold mb-8 text-[#E576CD]">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-[#0D0D0D] p-4 rounded-lg flex items-center justify-between hover:bg-[#E576CD]/10 transition-colors"
                >
                  <span className="font-medium">{skill}</span>
                  <Check className="w-4 h-4 text-[#E576CD]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md mx-auto bg-[#F1EBD4]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-display font-bold mb-8 text-[#E576CD]">Get in Touch</h2>
            <div className="space-y-6">
              <a
                href="mailto:janikaa.sureshkumar@gmail.com"
                className="flex items-center text-lg hover:text-[#E576CD] transition-colors font-medium"
                aria-label="Send email"
              >
                <Mail className="w-6 h-6 mr-4" />
                janikaa.sureshkumar@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/janikaa-sureshkumar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-lg hover:text-[#E576CD] transition-colors font-medium"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-6 h-6 mr-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Janikaa17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-lg hover:text-[#E576CD] transition-colors font-medium"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-6 h-6 mr-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-[#0D0D0D] p-8 rounded-2xl max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#F1EBD4] hover:text-[#E576CD]"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p id="modal-title" className="text-center text-lg mt-4 mb-8 font-medium">
              I'm working on exciting things—let's connect in the meantime!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#E576CD] text-[#0D0D0D] px-6 py-3 rounded-lg hover:bg-[#CB7CC7] transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
