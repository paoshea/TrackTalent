export interface InterviewSlot {
  id: string;
  time: string;
  duration: number;
}

export interface Interview {
  id: string;
  applicationId: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled";
}
