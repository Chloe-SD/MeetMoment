export interface User {
    name: string;
    email: string;
    //documents: Document[];  // TODO: Will need to carry a list of docs tied to their profile
}
  

// OBJECT INTERFACES FOR SCHEDULES
export interface TimeBlock {
    start: string; // start and end will shift depending on if half hour or hour times
    end: string;
    available: boolean; // is this time slot selected as available?
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
}
  
  export interface Participant {
    email: string;
    status: 'pending' | 'submitted' | 'confirmed';
  }