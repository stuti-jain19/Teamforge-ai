import { Timestamp } from "firebase/firestore";

export interface Team {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  memberIds: string[];
  createdAt: Timestamp;
}