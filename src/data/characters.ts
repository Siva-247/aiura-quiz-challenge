export interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

export const characters: Character[] = [
  {
    id: "wizard",
    name: "Code Wizard",
    avatar: "🧙‍♂️",
    description: "Master of algorithms and data structures"
  },
  {
    id: "ninja",
    name: "Debug Ninja", 
    avatar: "🥷",
    description: "Swift problem solver and bug hunter"
  },
  {
    id: "robot",
    name: "Logic Bot",
    avatar: "🤖", 
    description: "Systematic thinker and pattern recognizer"
  },
  {
    id: "detective",
    name: "Code Detective",
    avatar: "🕵️",
    description: "Investigates complex programming mysteries"
  },
  {
    id: "astronaut", 
    name: "Space Coder",
    avatar: "👩‍🚀",
    description: "Explores new programming frontiers"
  },
  {
    id: "scientist",
    name: "Mad Scientist",
    avatar: "👨‍🔬", 
    description: "Experiments with innovative solutions"
  },
  {
    id: "superhero",
    name: "Code Hero",
    avatar: "🦸‍♂️",
    description: "Saves the day with clean code"
  },
  {
    id: "pirate",
    name: "Code Pirate",
    avatar: "🏴‍☠️",
    description: "Adventures through complex codebases"
  }
];