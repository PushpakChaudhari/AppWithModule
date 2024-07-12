export interface Todo {
    sno: number ;
    title: string ;
    desc: string ;
    startTime: string; // Use string for datetime
    estimatedHours: number | null;
    active: boolean ;
   
  }