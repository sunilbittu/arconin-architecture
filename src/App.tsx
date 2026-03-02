import React, { useState } from 'react';
import { ArrowRight, MapPin, Phone, Globe, Camera, Share2, X, Compass, Home, TreePine, Building2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Modern Loft',
    location: 'Manhattan, NY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnMfTr9o6Oq8a_NyjSqQ_wXdc6qW0-2zXehQ2-EC5v0pYrFb1ORUou3kkHZIAsBuTH4RIRc8wYq3TiqjKNUmOe3cE4bXywlPKLBze7wqLwZE-4inqcOO8LQkMAYN6G4B556y4_Q8mPLjUz3F1n74YWP0eLCYThB3X0Y-AFYFHlN-JuO0gHalHukFnoJ7Lpil9wh4tAT34h8W5LhSgql4zGU5KqcWvLSsYvgfkBDub7pP7BeLPSj_HXZbAsn-fmKldgzsnjwxvTlIQ',
    alt: 'Modern high-rise loft interior',
    description: 'A stunning modern loft in the heart of Manhattan, featuring floor-to-ceiling windows, exposed brick walls, and custom-designed furniture that perfectly balances industrial edge with refined luxury.',
    client: 'Private Residence',
    year: '2023',
    services: 'Interior Design, Architecture'
  },
  {
    id: 2,
    title: 'Coastal Villa',
    location: 'Malibu, CA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Px9HQtJnA4Eakz8zfMcd4aINdTVM4_KnngRofiffiKJK1DFQqDXMreXMEdIiVkMLhdqce6ZHm09komOgLAwoyNU8efrthEcK8JZPb3Gzu3GBGuRY6XikeO3xWBWwbgFYxvul2gjRTQICR_b4uynz5wduXGGMX9St07YD-Oi29q8aa2ya8dcnYhHPJhqjSJaZhNQ0_2nSlA5XBT85g9s1Nbn-0hGNOJJzivivzZvZ92eygDsmN6GoR8qPgBe_i-ppty1cZ5pCfc8',
    alt: 'Luxury coastal villa exterior and pool',
    description: 'An expansive coastal villa designed to blur the lines between indoor and outdoor living. Features include an infinity pool, panoramic ocean views, and sustainable materials sourced locally.',
    client: 'Private Client',
    year: '2022',
    services: 'Architecture, Landscape Design'
  },
  {
    id: 3,
    title: 'Art Deco Suite',
    location: 'Paris, FR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsJwz8LBtKzMrG2lH9xfdKUKnwWu6a7AD6DsIHAmhipF7pLxL0DBvFOjcNKii3ZYYdy2fYWuwhnpH-Jjd4U_r_FUsqv2LimmGqV7cmQ4BG5cpdR7rpm7u3iyHChAYXC4xz8m3efiRfcx7yDgD9kKxO8nBOXw1uBCIbGkMSOzyHnRa2hGLs_AbxfywxDRnYXpXiy3iSNEfw2eAjiR9dG4imgga-UtvgrX4CExAVbGiZP9ZJwdFvoRQ_F_-mg5cpTUVOW7A9i6T9sm0',
    alt: 'Art deco inspired suite bathroom',
    description: 'A meticulous restoration and redesign of a historic Parisian suite, infusing classic Art Deco elements with modern amenities. Rich textures, bold geometric patterns, and bespoke lighting define the space.',
    client: 'Boutique Hotel',
    year: '2024',
    services: 'Interior Design, Renovation'
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary size-8">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-slate-100">ARCONIN</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest" href="#projects">Projects</a>
            <a className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest" href="#philosophy">Philosophy</a>
            <a className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest" href="#services">Services</a>
            <button 
              onClick={() => document.getElementById('inquire-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-bold tracking-wide hover:opacity-90 transition-opacity cursor-pointer"
            >
              Inquire
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] w-full overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20 z-10"></div>
            <div 
              className="h-full w-full bg-cover bg-center opacity-90" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9MryiXXf1lRmB1QDts3bn0Drvnf0BB-bnVYBFLVS0yCfn1nFar6V42igQAMpBK-M7JNaSyGK7bjqxdGdZore3mANiktH5Ud7DUXJ4HXWOXr5dosBSqsq5068LUW5LGStqDK_mWDC65jNeTqIYfyQ7gD9YLS-eAR5ses5SIOEPQQHzyRIsR-F4-_k1ZIVkSIh6ct3paQCCrN4NxfLxpENVusB2abIzXyJ9C93zV-JDd9IfO0j1t24uG3ipSS56mF3H1C1nG1bwC18')" }}
            ></div>
          </div>
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-white text-5xl md:text-8xl font-black leading-tight tracking-[-0.04em] max-w-5xl">
              Arconin: Designing Tomorrow's Spaces
            </h1>
            <p className="mt-6 text-slate-200 text-lg md:text-xl font-light tracking-wide max-w-2xl">
              Architectural sophistication meets functional elegance in every detail.
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#projects" className="inline-block bg-white text-slate-900 px-10 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors uppercase tracking-widest text-sm cursor-pointer">
                Explore Portfolio
              </a>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Portfolio</span>
              <h2 className="text-4xl font-bold mt-2 tracking-tight">Featured Projects</h2>
            </div>
            <a className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors" href="#">View All Works</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="aspect-[4/5] overflow-hidden rounded-xl relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={project.alt} 
                    src={project.image}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium uppercase tracking-tighter text-sm">{project.location}</p>
                  <button 
                    className="mt-4 text-sm font-bold uppercase tracking-widest text-primary hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="bg-slate-900 text-white py-32 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm">Our Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">Functional Elegance.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                At Arconin, we believe that luxury is not just about aesthetics—it's about how a space breathes, functions, and elevates the human experience. Our approach marries architectural rigor with an uncompromising eye for detail.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <span className="text-white text-3xl font-bold">01</span>
                  <h4 className="mt-2 text-primary font-bold uppercase tracking-widest text-xs">Space Optimization</h4>
                  <p className="mt-2 text-sm text-slate-500">Intelligent layouts that maximize flow and utility.</p>
                </div>
                <div>
                  <span className="text-white text-3xl font-bold">02</span>
                  <h4 className="mt-2 text-primary font-bold uppercase tracking-widest text-xs">Material Sourcing</h4>
                  <p className="mt-2 text-sm text-slate-500">Only the finest sustainable stones and woods.</p>
                </div>
              </div>
              <button className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] border-b border-primary pb-2 hover:gap-6 transition-all cursor-pointer">
                Discover the process <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  className="w-full aspect-[4/3] object-cover" 
                  alt="Minimalist architectural office space" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd86vFycIbE7CLHNr6vUMBWK17u39ZvncJzczerpGAIin89ioNjBTRKSq2sxgjMZ24upMv7pn-XYNE2G_yUGshcC5VEglAm_eDidaFvyWJPg52nQU1bDfrkmGSbLUODh2gelFKrDgBS6O8SYNyHEr-f2mZzqSVawyT4fMprW1-efEU_C6d6d-1-UVzR2a1VptDN5jTEXEYUI38s10FM9M64XshmtDKN1EG0zWMnmoVou2baQYVqq-nHzn1_ZAxBYB5o8XI6cQYRso"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-8 rounded-xl hidden md:block">
                <span className="block text-4xl font-black">15+</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Years of Experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Expertise</span>
            <h2 className="text-4xl font-bold mt-2 tracking-tight">Our Services</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Comprehensive architectural solutions tailored to elevate your vision from concept to reality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Architectural Design</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Innovative and sustainable building designs that harmonize with their environment while pushing creative boundaries.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interior Design</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Curated interior spaces that blend functionality with bespoke aesthetics, creating environments that inspire.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Landscape Architecture</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Seamless integration of natural elements and built structures to create cohesive outdoor living experiences.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Urban Planning</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Strategic master planning for communities and developments, focusing on sustainability and human connection.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-light dark:bg-background-dark border-t border-primary/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary size-6">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                  </svg>
                </div>
                <span className="text-xl font-black tracking-tighter">ARCONIN</span>
              </div>
              <div className="text-slate-500 max-w-sm">
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm leading-relaxed">
                      H.No.8-2-268/D/5, Road No 3, Kundan Marble Lane, Sagar Society, Sri Nagar Colony, Aurora Colony, Banjara Hills, Hyderabad, Telangana - 500034
                      <br/>
                      <a className="text-primary font-bold hover:underline mt-1 inline-block" href="https://maps.app.goo.gl/jshUGvwxp8LxKft6A?g_st=iwb" target="_blank" rel="noreferrer">View on Maps</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Babu Admin: <a className="hover:text-primary transition-colors" href="tel:8712175665">8712175665</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs text-primary mb-6">Navigation</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li><a className="hover:text-primary transition-colors" href="#projects">Portfolio</a></li>
                <li><a className="hover:text-primary transition-colors" href="#philosophy">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#services">Services</a></li>
                <li><a className="hover:text-primary transition-colors" href="#inquire-section">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs text-primary mb-6">Connect</h5>
              <div className="flex gap-4">
                <a className="size-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <Globe className="w-5 h-5" />
                </a>
                <a className="size-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <Camera className="w-5 h-5" />
                </a>
                <a className="size-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <Share2 className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div id="inquire-section" className="col-span-1 lg:col-span-2">
              <h5 className="font-bold uppercase tracking-widest text-xs text-primary mb-6">Inquire</h5>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-transparent border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full bg-transparent border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full bg-transparent border ${errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-bold tracking-wide hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Send Inquiry
                </button>
                {isSubmitted && <p className="text-green-500 text-xs mt-2 font-medium">Thank you! Your inquiry has been sent.</p>}
              </form>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-[0.2em]">
            <p>© 2024 Arconin Architectural Design Studio. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="relative bg-background-light dark:bg-background-dark w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">{selectedProject.location}</span>
              <h3 className="text-3xl font-bold mt-2 mb-6">{selectedProject.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {selectedProject.description}
              </p>
              <div className="space-y-4">
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Client</span>
                  <span className="font-medium">{selectedProject.client}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Year</span>
                  <span className="font-medium">{selectedProject.year}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Services</span>
                  <span className="font-medium">{selectedProject.services}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setTimeout(() => {
                    document.getElementById('inquire-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="mt-10 w-full bg-primary text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide hover:opacity-90 transition-opacity cursor-pointer"
              >
                Inquire About Similar Projects
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
