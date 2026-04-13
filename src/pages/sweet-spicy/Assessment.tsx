import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Question {
  id: string;
  type: 'single' | 'multi' | 'text';
  question: string;
  options?: string[];
  minWords?: number;
  maxSelect?: number;
}

const questions: Question[] = [
  {
    id: 'q1',
    type: 'single',
    question: 'When you want something — and I mean really want something — what do you do?',
    options: [
      'I make a plan and I execute it quietly until I have it',
      'I ask for it directly — I don\'t do hints',
      'I create the conditions where it comes to me naturally',
      'I wait and see if it matters enough to pursue',
      'I go after it with everything I have and I don\'t stop'
    ]
  },
  {
    id: 'q2',
    type: 'multi',
    question: 'Which of these feel like you in a relationship — honestly, not ideally?',
    maxSelect: 3,
    options: [
      'I need a lot of attention and I am not ashamed of it',
      'I test people to see if they can keep up',
      'I give more than I take and sometimes that costs me',
      'I get jealous but I handle it with grace',
      'I need to feel like I am the priority — not one of many',
      'I am emotionally low-maintenance, I handle myself',
      'I like to be in control of most things',
      'I surrender fully when I trust someone completely',
      'I get bored easily if there is no challenge',
      'I love deeply but I take a long time to get there'
    ]
  },
  {
    id: 'q3',
    type: 'single',
    question: 'Your partner is giving you less attention than you need. What do you do?',
    options: [
      'I communicate it directly and clearly',
      'I pull back and give him space to notice',
      'I become more present — I make myself impossible to ignore',
      'I internalize it and try not to need as much',
      'I find small ways to remind him what he has'
    ]
  },
  {
    id: 'q4',
    type: 'single',
    question: 'Strength in a woman looks like:',
    options: [
      'Never needing anyone',
      'Knowing exactly what she needs and asking for it',
      'Being able to handle everything on her own',
      'Choosing who gets to see her soft side',
      'Never showing weakness in public'
    ]
  },
  {
    id: 'q5',
    type: 'multi',
    question: 'What does a good life look like to you? Pick what genuinely moves you.',
    maxSelect: 3,
    options: [
      'A home that feels like a world of its own',
      'Traveling to places that change how I see things',
      'Building something — a business, a project, a legacy',
      'A partner who is also my best friend and my challenge',
      'Financial independence that I built myself',
      'A family I am deeply proud of',
      'Continuous learning — I never stop growing',
      'A creative life — making things, documenting things',
      'Adventure that has no ceiling'
    ]
  },
  {
    id: 'q6',
    type: 'single',
    question: 'If a man challenges your opinion directly and confidently — how do you feel?',
    options: [
      'Defensive — I know what I think',
      'Interested — show me what you\'ve got',
      'Attracted — I like a man who holds his ground',
      'Uncomfortable — I prefer harmony',
      'Both B and C — and slightly dangerous for both of us'
    ]
  },
  {
    id: 'q7',
    type: 'text',
    question: 'Describe yourself in a relationship. Not who you want to be — who you actually are. What do you give? What do you need? Where do you struggle?',
    minWords: 80
  },
  {
    id: 'q8',
    type: 'single',
    question: 'The word "surrender" in the context of a relationship means:',
    options: [
      'Giving up',
      'Losing yourself in someone',
      'Choosing to let go with someone you completely trust',
      'Weakness',
      'Something I am not comfortable with'
    ]
  },
  {
    id: 'q9',
    type: 'multi',
    question: 'What kind of energy do you bring into intimacy?',
    maxSelect: 2,
    options: [
      'Soft and present — I give everything',
      'Playful and teasing — I like the game',
      'Intense and consuming — when I am in I am completely in',
      'Guarded until I feel completely safe',
      'Dominant and in control',
      'Surrendered and trusting',
      'A mix that depends on who I am with and what I feel'
    ]
  },
  {
    id: 'q10',
    type: 'text',
    question: 'Tell me something you want from a relationship that you have never said out loud to anyone. You do not have to explain it. Just say it.',
    minWords: 0
  }
];

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    try {
      // Store answers in Supabase for Ahmad's manual review
      // Note: Claude evaluation can be done manually via admin dashboard
      const { error } = await supabase.from('sweet_spice_requests').insert({
        answers: answers,
        status: 'pending'
      });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Always go to contact collection - Ahmad will review manually
      navigate('/sweet-spice/contact');

    } catch (error) {
      console.error('Assessment error:', error);
      // Still navigate to contact even if storage fails
      navigate('/sweet-spice/contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAnswered = () => {
    const answer = answers[question.id];
    if (!answer) return false;
    if (question.type === 'text' && question.minWords && question.minWords > 0) {
      const wordCount = answer.trim().split(/\s+/).length;
      return wordCount >= question.minWords;
    }
    return true;
  };

  const renderQuestion = () => {
    if (question.type === 'single') {
      return (
        <div className="space-y-4">
          {question.options?.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                answers[question.id] === option
                  ? 'border-pink-500 bg-pink-500/10'
                  : 'border-white/10 hover:border-pink-500/30 hover:bg-white/5'
              }`}
            >
              <span className="text-sm font-medium text-white/80">{option}</span>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'multi') {
      const selected = answers[question.id] || [];
      const canSelectMore = selected.length < (question.maxSelect || 3);

      return (
        <div className="space-y-4">
          {question.options?.map((option, idx) => {
            const isSelected = selected.includes(option);
            const canSelect = isSelected || canSelectMore;

            return (
              <button
                key={idx}
                onClick={() => {
                  if (isSelected) {
                    handleAnswer(selected.filter((s: string) => s !== option));
                  } else if (canSelect) {
                    handleAnswer([...selected, option]);
                  }
                }}
                disabled={!canSelect}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-500/10'
                    : canSelect
                    ? 'border-white/10 hover:border-pink-500/30 hover:bg-white/5'
                    : 'border-white/5 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    isSelected ? 'border-pink-500 bg-pink-500' : 'border-white/30'
                  }`}>
                    {isSelected && <span className="text-black text-xs">✓</span>}
                  </div>
                  <span className="text-sm font-medium text-white/80">{option}</span>
                </div>
              </button>
            );
          })}
          <p className="text-xs text-white/40 text-center">
            Select up to {question.maxSelect} options
          </p>
        </div>
      );
    }

    if (question.type === 'text') {
      const wordCount = (answers[question.id] || '').trim().split(/\s+/).filter((w: string) => w).length;
      const minWords = question.minWords || 0;

      return (
        <div className="space-y-4">
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full h-48 p-4 bg-black/50 border border-white/10 rounded-xl text-white/80 placeholder-white/30 resize-none focus:border-pink-500/50 focus:outline-none transition-colors"
            placeholder="Write your answer here..."
          />
          <div className="flex justify-between text-xs">
            <span className={wordCount >= minWords ? 'text-pink-400' : 'text-white/40'}>
              {wordCount} words
            </span>
            {minWords > 0 && (
              <span className="text-white/40">
                Minimum {minWords} words
              </span>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Pink ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(244,114,182,0.12), transparent 70%)'
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">
              Assessment
            </p>
            <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              A Few <span className="text-pink-400">Questions</span>
            </h1>
            <p className="text-sm text-white/40 italic">
              One at a time. Be honest — there are no right answers, only true ones.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-2 text-center">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Question card */}
          <div className="glass border-pink-500/20 p-8 rounded-2xl space-y-6">
            <h2 className="text-lg font-medium text-white/90 leading-relaxed">
              {question.question}
            </h2>

            {renderQuestion()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-sm font-medium text-white/60 hover:border-pink-500/30 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered() || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-black rounded-xl text-sm font-black uppercase tracking-widest italic hover:bg-pink-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Evaluating...
                </>
              ) : currentQuestion === questions.length - 1 ? (
                <>
                  Submit
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Note */}
          <p className="text-xs text-white/30 text-center mt-6 italic">
            Your answers are evaluated by AI and reviewed personally. This is not a test — just a way to protect the space for the right energy.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
