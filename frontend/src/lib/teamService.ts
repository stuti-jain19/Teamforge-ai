import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  serverTimestamp,
  updateDoc,
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

export const getTeamMembers = async (memberIds: string[]) => {
  const members = await Promise.all(
    memberIds.map(async (uid) => {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        return null;
      }

      return {
        uid,
        ...userSnapshot.data(),
      };
    })
  );

  return members.filter(Boolean);
};

export const addMemberToTeam = async (
  teamId: string,
  userId: string
) => {
  const teamRef = doc(db, "teams", teamId);

  const teamSnapshot = await getDoc(teamRef);

  if (!teamSnapshot.exists()) {
    throw new Error("Team not found.");
  }

  const teamData = teamSnapshot.data();
  const memberIds: string[] = teamData.memberIds || [];

  if (memberIds.includes(userId)) {
    throw new Error("User is already a member of this team.");
  }

  await updateDoc(teamRef, {
    memberIds: [...memberIds, userId],
  });
};

export const joinTeam = async (
  teamId: string,
  userId: string
) => {
  const teamRef = doc(db, "teams", teamId);

  const teamSnapshot = await getDoc(teamRef);

  if (!teamSnapshot.exists()) {
    throw new Error("Team not found.");
  }

  const teamData = teamSnapshot.data();
  const memberIds: string[] = teamData.memberIds || [];

  if (memberIds.includes(userId)) {
    throw new Error("You are already a member of this team.");
  }

  await updateDoc(teamRef, {
    memberIds: [...memberIds, userId],
  });
};