import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import type { Team } from "../types/team";

const teamsCollection = collection(db, "teams");

export const createTeam = async (
  name: string,
  description: string,
  user: {
    uid: string;
    displayName: string | null;
    email: string | null;
  }
) => {
  const teamData = {
    name,
    description,
    ownerId: user.uid,
    ownerName: user.displayName || "User",
    ownerEmail: user.email || "",
    memberIds: [user.uid],
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(teamsCollection, teamData);

  return docRef.id;
};

export const getUserTeams = async (userId: string): Promise<Team[]> => {
  const q = query(
    teamsCollection,
    where("memberIds", "array-contains", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Team[];
};