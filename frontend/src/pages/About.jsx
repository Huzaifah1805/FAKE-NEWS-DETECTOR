import React from 'react';
import { ShieldCheck, BrainCircuit, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 pt-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">About TruthLens</h1>
        <p className="text-dark-muted text-lg max-w-2xl mx-auto">
          We leverage cutting-edge Deep Learning and Natural Language Processing to combat digital misinformation and restore trust in online content.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass-card p-8 text-center border-t-2 border-t-primary hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
            <BrainCircuit size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Advanced ML Model</h3>
          <p className="text-dark-muted text-sm leading-relaxed">
            Powered by a PassiveAggressiveClassifier trained on thousands of authentic and fabricated news articles utilizing TF-IDF Vectorization.
          </p>
        </div>

        <div className="glass-card p-8 text-center border-t-2 border-t-success hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto bg-success/10 text-success rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">High Accuracy</h3>
          <p className="text-dark-muted text-sm leading-relaxed">
            Trained and tested meticulously to achieve &gt;95% accuracy in distinguishing linguistic patterns characteristic of fake news.
          </p>
        </div>

        <div className="glass-card p-8 text-center border-t-2 border-t-purple-500 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
            <Rocket size={32} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Instant Analysis</h3>
          <p className="text-dark-muted text-sm leading-relaxed">
            Lightning-fast web scraping and processing pipeline allows for real-time verification of any article URL or text snippet.
          </p>
        </div>
      </div>

      <div className="glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
        <h2 className="text-2xl font-bold text-white mb-4">How it Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-dark-muted leading-relaxed relative z-10">
          <li><strong className="text-white">Input:</strong> Provide an article URL or paste the raw text.</li>
          <li><strong className="text-white">Extraction:</strong> If a URL is provided, our backend web scraper extracts the core article text, filtering out ads and navigation.</li>
          <li><strong className="text-white">Preprocessing:</strong> The text is cleaned, tokenized, and transformed using a pre-fitted TF-IDF Vectorizer.</li>
          <li><strong className="text-white">Classification:</strong> The processed text vectors are fed into our ML model to predict authenticity and calculate a statistical confidence score.</li>
          <li><strong className="text-white">Result:</strong> You instantly receive the verdict and see it reflected in your overall dashboard analytics.</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
