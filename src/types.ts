// src/types.ts
export interface User {
    id: string;
    name: string;
    email: string;
  }
  
export interface TimeBlock {
    start: string; // start and end will shift depending on if half hour or hour times
    end: string;
    available: boolean; // is this time slot selected as available?
    selectable: boolean; // used to make original creator blocks only selectable blocks
}

export interface Day {
    date: string; // month-day (example "07-22")
    //year: string; // 4 digit year
    blocks: TimeBlock[]; //The blocks contained in this day
    // see 'TimeBlock' interface
}

export interface Meeting {
    id: string;
    title: string;
    creatorEmail: string;
    participants: Participant[];
    days: Day[];
    status: 'pending' | 'confirmed' | 'cancelled';
    participantAvailability: {
      [email: string]: Day[];
    };
}
  
  export interface Participant {
    email: string;
    status: 'pending' | 'submitted' | 'confirmed';
  }