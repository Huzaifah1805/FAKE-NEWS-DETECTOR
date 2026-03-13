import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 text-center text-dark-muted text-sm border-t border-dark-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} TruthLens AI Fake News Detector. Built with AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
