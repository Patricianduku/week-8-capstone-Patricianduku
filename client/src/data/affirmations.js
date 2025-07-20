export const affirmations = [
    "You are stronger than you think and braver than you feel.",
    "Every small step forward is progress worth celebrating.",
    "Your feelings are valid, and it's okay to not be okay sometimes.",
    "You have survived 100% of your difficult days so far.",
    "Healing isn't linear, and that's perfectly normal.",
    "You deserve compassion, especially from yourself.",
    "Your mental health matters, and taking care of it is not selfish.",
    "You are not alone in this journey.",
    "It's okay to ask for help when you need it.",
    "You are worthy of love, happiness, and peace.",
    "Your story isn't over yet - there are beautiful chapters ahead.",
    "You have the power to create positive change in your life.",
    "Rest is not a reward for work completed, but a necessity for well-being.",
    "Your progress may be invisible to others, but it's real and it matters.",
    "You are enough, exactly as you are right now.",
    "Difficult roads often lead to beautiful destinations.",
    "Your sensitivity is a strength, not a weakness.",
    "You have overcome challenges before, and you can do it again.",
    "It's okay to take things one day at a time.",
    "You are allowed to prioritize your mental health.",
    "Your journey is unique, and comparing it to others serves no purpose.",
    "You have the courage to face whatever comes your way.",
    "Self-care is not selfish - it's essential.",
    "You are making a difference, even when it doesn't feel like it.",
    "Your worth is not determined by your productivity.",
    "You are allowed to feel proud of the small victories.",
    "Growth happens outside your comfort zone, but at your own pace.",
    "You have the right to set boundaries that protect your peace.",
    "Your mental health journey is a marathon, not a sprint.",
    "You are deserving of the same kindness you show others."
  ];
  
  export const getTodaysAffirmation = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return affirmations[dayOfYear % affirmations.length];
  };