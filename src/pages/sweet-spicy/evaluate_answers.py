#!/usr/bin/env python3
"""
Sweet Spice Assessment Evaluator
Evaluates a woman's answers against Ahmad's ideal match criteria
"""

import json
import re
from typing import Dict, List, Any, Tuple

class SweetSpiceEvaluator:
    """Evaluates assessment answers and returns match score and analysis"""
    
    # Scoring weights
    WEIGHTS = {
        'emotional_self_awareness': 20,
        'ambition_and_growth': 15,
        'submissive_by_choice': 20,
        'challenger_teaser_energy': 15,
        'warmth_and_devotion': 15,
        'coherence': 10,
        'bonus': 5
    }
    
    # Pass threshold
    PASS_THRESHOLD = 65
    STRONG_MATCH_THRESHOLD = 75
    
    # Ideal answers that indicate alignment
    IDEAL_ANSWERS = {
        'q1': ["I go after it with everything I have and I don't stop", "I make a plan and I execute it quietly until I have it"],
        'q3': ["I communicate it directly and clearly", "I become more present — I make myself impossible to ignore"],
        'q4': ["Knowing exactly what she needs and asking for it", "Choosing who gets to see her soft side"],
        'q6': ["Attracted — I like a man who holds his ground", "Both B and C — and slightly dangerous for both of us"],
        'q8': ["Choosing to let go with someone you completely trust"]
    }
    
    # Positive multi-select options
    POSITIVE_TRAITS = [
        "I need a lot of attention and I am not ashamed of it",
        "I test people to see if they can keep up",
        "I need to feel like I am the priority — not one of many",
        "I surrender fully when I trust someone completely",
        "I love deeply but I take a long time to get there"
    ]
    
    # Disqualifying traits
    DISQUALIFYING_TRAITS = [
        "I am emotionally low-maintenance, I handle myself"
    ]
    
    def __init__(self, answers: Dict[str, Any]):
        self.answers = answers
        self.breakdown = {}
        self.key_signals = []
        self.disqualify_signals = []
        
    def evaluate(self) -> Dict[str, Any]:
        """Run full evaluation and return results"""
        
        # Evaluate each dimension
        self.breakdown['emotional_self_awareness'] = self._evaluate_emotional_awareness()
        self.breakdown['ambition_and_growth'] = self._evaluate_ambition()
        self.breakdown['submissive_by_choice'] = self._evaluate_submission_energy()
        self.breakdown['challenger_teaser_energy'] = self._evaluate_challenger_energy()
        self.breakdown['warmth_and_devotion'] = self._evaluate_warmth()
        self.breakdown['coherence'] = self._evaluate_coherence()
        self.breakdown['bonus'] = self._evaluate_bonus()
        
        # Calculate total score
        total_score = sum(
            self.breakdown[key] * (self.WEIGHTS[key] / 100)
            for key in self.WEIGHTS.keys()
        )
        
        score = round(total_score)
        
        # Determine result
        passed = score >= self.PASS_THRESHOLD
        strong_match = score >= self.STRONG_MATCH_THRESHOLD
        
        # Generate summary
        if passed and strong_match:
            summary = f"Strong alignment detected (score: {score}). Her answers show depth, self-awareness, and the specific energy Ahmad described. She demonstrates the paradox — soft and fierce, devoted and wild. Worth pursuing."
        elif passed:
            summary = f"Good alignment (score: {score}). She shows several matching qualities — emotional presence, ambition, and the capacity for devotion. Worth exploring further."
        else:
            summary = f"Limited alignment (score: {score}). While she may be wonderful, the specific resonance Ahmad is looking for isn't strongly present in these answers."
            
        return {
            'score': score,
            'passed': passed,
            'strong_match': strong_match,
            'breakdown': self.breakdown,
            'key_signals_detected': self.key_signals[:3],
            'disqualify_signals_detected': self.disqualify_signals,
            'summary': summary
        }
    
    def _evaluate_emotional_awareness(self) -> float:
        """0-100 score for emotional self-awareness"""
        score = 50  # Base
        
        # Check q7 (relationship description)
        q7 = self.answers.get('q7', '')
        if len(q7.split()) >= 80:
            score += 20
        if any(word in q7.lower() for word in ['feel', 'need', 'want', 'struggle', 'emotional']):
            score += 15
        if 'vulnerability' in q7.lower() or 'open' in q7.lower():
            score += 10
            self.key_signals.append("Acknowledges emotional complexity")
            
        # Check q10 (secret desire)
        q10 = self.answers.get('q10', '')
        if len(q10.split()) > 10:
            score += 15
            self.key_signals.append("Can articulate deep desires")
        
        return min(100, score)
    
    def _evaluate_ambition(self) -> float:
        """0-100 score for ambition and growth orientation"""
        score = 40  # Base
        
        # Check q5 (good life)
        q5 = self.answers.get('q5', [])
        ambitious_options = [
            'Building something — a business, a project, a legacy',
            'Continuous learning — I never stop growing',
            'A creative life — making things, documenting things'
        ]
        for opt in ambitious_options:
            if opt in q5:
                score += 15
                
        # Check q1 (what she does when she wants something)
        q1 = self.answers.get('q1', '')
        if "I go after it with everything I have" in q1:
            score += 25
            self.key_signals.append("High drive and determination")
        elif "I make a plan and I execute it" in q1:
            score += 20
            
        # Work/career questions
        work_q = self.answers.get('work_status', '')
        if work_q in ['Building a career', 'Running my own business/project']:
            score += 10
            
        return min(100, score)
    
    def _evaluate_submission_energy(self) -> float:
        """0-100 score for submissive-by-choice energy"""
        score = 40  # Base
        
        # Check q8 (surrender meaning)
        q8 = self.answers.get('q8', '')
        if q8 == "Choosing to let go with someone you completely trust":
            score += 40
            self.key_signals.append("Understands surrender as trust, not weakness")
        elif "Something I am not comfortable with" in q8:
            score -= 30
            self.disqualify_signals.append("Uncomfortable with surrender concept")
            
        # Check q2 for surrender trait
        q2 = self.answers.get('q2', [])
        if "I surrender fully when I trust someone completely" in q2:
            score += 20
            
        # Check q9 (intimacy energy)
        q9 = self.answers.get('q9', [])
        if "Surrendered and trusting" in q9:
            score += 15
            
        return max(0, min(100, score))
    
    def _evaluate_challenger_energy(self) -> float:
        """0-100 score for challenger/teaser energy"""
        score = 40  # Base
        
        # Check q6 (how she feels when challenged)
        q6 = self.answers.get('q6', '')
        if "Both B and C — and slightly dangerous for both of us" in q6:
            score += 35
            self.key_signals.append("Thrives on intellectual challenge")
        elif "Attracted — I like a man who holds his ground" in q6:
            score += 25
            
        # Check q2 for teaser traits
        q2 = self.answers.get('q2', [])
        if "I test people to see if they can keep up" in q2:
            score += 20
            self.key_signals.append("Natural teaser/challenger")
        if "I get bored easily if there is no challenge" in q2:
            score += 15
            
        # Check q3 (attention strategy)
        q3 = self.answers.get('q3', '')
        if q3 == "I become more present — I make myself impossible to ignore":
            score += 15
            
        return min(100, score)
    
    def _evaluate_warmth(self) -> float:
        """0-100 score for warmth and devotion"""
        score = 40  # Base
        
        # Check q5 (good life options)
        q5 = self.answers.get('q5', [])
        if "A family I am deeply proud of" in q5:
            score += 20
            self.key_signals.append("Family-oriented")
        if "A home that feels like a world of its own" in q5:
            score += 15
            
        # Check q2 for neediness (positive signal)
        q2 = self.answers.get('q2', [])
        if "I need a lot of attention and I am not ashamed of it" in q2:
            score += 15
            self.key_signals.append("Emotionally present and needy in healthy way")
        if "I need to feel like I am the priority — not one of many" in q2:
            score += 15
            
        # Check for low-maintenance (negative signal)
        if "I am emotionally low-maintenance, I handle myself" in q2:
            score -= 25
            self.disqualify_signals.append("Frames independence as identity, not capacity")
            
        return max(0, min(100, score))
    
    def _evaluate_coherence(self) -> float:
        """0-100 score for coherence across answers"""
        score = 70  # Base
        
        # Check if q7 (self-description) matches q2 (traits selected)
        q7 = self.answers.get('q7', '').lower()
        q2 = self.answers.get('q2', [])
        
        coherence_signals = 0
        for trait in q2:
            trait_key = trait.lower().split()[0]
            if trait_key in q7:
                coherence_signals += 1
                
        if coherence_signals >= 2:
            score += 20
        elif coherence_signals == 0:
            score -= 20
            self.disqualify_signals.append("Answers seem disconnected from self-description")
            
        return max(0, min(100, score))
    
    def _evaluate_bonus(self) -> float:
        """0-100 bonus points"""
        score = 0
        
        # Check for Minya origin
        origin = self.answers.get('origin', '').lower()
        if 'minya' in origin:
            score += 40
            self.key_signals.append("Minya origin — cultural resonance")
            
        # Check for builder/creator in work
        work_desc = self.answers.get('work_description', '').lower()
        if any(word in work_desc for word in ['build', 'create', 'design', 'make', 'project']):
            score += 30
            self.key_signals.append("Builder/creator energy")
            
        # Check q5 for family goal
        q5 = self.answers.get('q5', [])
        if "A family I am deeply proud of" in q5:
            score += 30
            
        return min(100, score)


def evaluate_assessment(answers_json: str) -> Dict[str, Any]:
    """Main entry point - takes JSON string of answers, returns evaluation"""
    answers = json.loads(answers_json)
    evaluator = SweetSpiceEvaluator(answers)
    return evaluator.evaluate()


if __name__ == "__main__":
    # Example usage
    example_answers = {
        "q1": "I go after it with everything I have and I don't stop",
        "q2": [
            "I need a lot of attention and I am not ashamed of it",
            "I test people to see if they can keep up",
            "I surrender fully when I trust someone completely"
        ],
        "q3": "I communicate it directly and clearly",
        "q4": "Choosing who gets to see her soft side",
        "q5": [
            "A home that feels like a world of its own",
            "Building something — a business, a project, a legacy",
            "A family I am deeply proud of"
        ],
        "q6": "Both B and C — and slightly dangerous for both of us",
        "q7": "I give everything when I trust. I need to feel chosen, not optional. I struggle with patience — when I want something, I want it fully and immediately. I'm soft but fierce about what matters.",
        "q8": "Choosing to let go with someone you completely trust",
        "q9": ["Surrendered and trusting", "Playful and teasing — I like the game"],
        "q10": "I want to be someone's entire world without losing myself in it. I want to be possessed and free at the same time.",
        "work_status": "Building a career",
        "work_description": "I work in product design, building experiences that matter",
        "origin": "From a small town near Minya"
    }
    
    result = evaluate_assessment(json.dumps(example_answers))
    print(json.dumps(result, indent=2))
