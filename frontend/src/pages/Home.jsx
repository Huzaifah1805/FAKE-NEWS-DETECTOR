import React, { useState } from 'react';
import { Search, Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { detectFakeNews } from '../services/api.js';

const Home = () => {
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = inputType === 'url' ? { url: inputValue } : { text: inputValue };
      const res = await detectFakeNews(payload);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 pt-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Verify the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">Truth</span> Instantly
        </h1>
        <p className="text-dark-muted text-lg">
          Paste an article URL or text to run it through our advanced Machine Learning detection engine.
        </p>
      </div>

      <div className="glass-card p-6 md:p-8 mb-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-primary/10 blur-[100px] pointer-events-none"></div>

        <div className="flex gap-4 mb-6 border-b border-dark-border pb-4 relative z-10">
          <button 
            type="button"
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${inputType === 'text' ? 'bg-primary/20 text-primary' : 'text-dark-muted hover:text-white'}`}
            onClick={() => { setInputType('text'); setInputValue(''); setResult(null); setError(null); }}
          >
            Paste Text
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${inputType === 'url' ? 'bg-primary/20 text-primary' : 'text-dark-muted hover:text-white'}`}
            onClick={() => { setInputType('url'); setInputValue(''); setResult(null); setError(null); }}
          >
            Check URL
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="relative mb-6">
            <div className="absolute top-4 left-4 text-dark-muted">
              {inputType === 'url' ? <LinkIcon className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </div>
            {inputType === 'text' ? (
              <textarea 
                className="input-field pl-12 min-h-[160px] resize-y"
                placeholder="Paste the news article text here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              <input 
                type="url"
                className="input-field pl-12"
                placeholder="https://example.com/news-article..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={!inputValue.trim() || loading}
            className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Intelligence...
              </span>
            ) : 'Analyze Accuracy'}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className={`glass-card p-6 md:p-8 animate-fade-in ${result.prediction === 'REAL' ? 'border-success/50 bg-success/5' : 'border-danger/50 bg-danger/5'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${result.prediction === 'REAL' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                {result.prediction === 'REAL' ? <CheckCircle className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="text-xl font-medium text-dark-muted mb-1">Analysis Verdict</h3>
                <div className={`text-4xl font-bold ${result.prediction === 'REAL' ? 'text-success' : 'text-danger'}`}>
                  {result.prediction === 'REAL' ? 'Authentic' : 'Fabricated'}
                </div>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <div className="text-sm text-dark-muted mb-2">Confidence Score</div>
              <div className="text-3xl font-bold text-white">{(result.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div className="w-full bg-dark-bg rounded-full h-3 mb-6 overflow-hidden border border-dark-border">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${result.prediction === 'REAL' ? 'bg-success' : 'bg-danger'}`}
              style={{ width: `${result.confidence * 100}%` }}
            ></div>
          </div>
          
          <p className="text-dark-muted text-sm leading-relaxed border-t border-dark-border pt-4">
            * This AI assessment is based on linguistic patterns, sentence structures, and trained machine learning datasets. Always verify with primary sources.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
