"use client";

import "../../css/globals.css"
import "../../css/account.css"

import {deleteDoc, doc } from "firebase/firestore"
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { User } from "firebase/auth";
import RequireAuth from "../../components/requireAuth";
import ButtonCard from "../../components/buttonCard";
import NavBar from "../../components/navBar";

import { useUser } from "../../contexts/userContext"

type TopsterMeta = {
	id: string;
	title: string;
	thumbnail?: string;
};

export default function Page() {
	const { userId, user } = useUser()
	const router = useRouter();

  	const [topsters, setTopsters] = useState<TopsterMeta[]>([]);

  	// get user + their topsters
  	useEffect(() => {
		const getTopsters = async () => {
			if (!userId) return

			// get user's topsters
			const snapshot = await getDocs(collection(db, "users", userId, "topsters"));
			const topsterList: TopsterMeta[] = snapshot.docs.map((doc) => {
				const data = doc.data();
				const firstTile = data.tiles?.[0];
				const thumbnail = firstTile?.album?.imageUrl || null;
				
				return {
					id: doc.id,
					title: data.title,
					thumbnail,
				};
			});
			setTopsters(topsterList)
		}
		getTopsters();
	}, [userId]);


	const handleCreateTopster = async () => {
		if (!userId || !user) return;

		// get snapshot of topsters
		const snapshot = await getDocs(collection(db, "users", userId, "topsters"));
		// given snapshot and userId, create a new topster ID and push user to ID page
		const newId = await createNewTopster(user, userId, snapshot.size);
		handleEditTopster(newId)
	};

	// bring user to topster page
	const handleEditTopster = (id: string) => {
		router.push(`/gridz?id=${id}`);
	};

	const handleDeleteTopster = async (id: string) => {
		if (!userId) return;
		const confirmed = confirm("Are you sure you want to delete this topster?");
		if (!confirmed) return;

		await deleteTopster(userId, id);
		setTopsters((prev) => prev.filter((t) => t.id !== id));
	};


	return <>
		<RequireAuth>
			
			<NavBar />

			<div className="account-container">
				{user?.displayName && (
					<h1 className="welcome-text">  Welcome, {user.displayName}! </h1>
				)}

				<h2>Your Topsters</h2>

				{topsters.length === 0 ? (
					<p>No topsters yet!</p>
				) : (
					<div className="button-grid">
						{topsters.map((topster) => (
							<ButtonCard
								key = {topster.id}
								title = {topster.title}
								thumbnail = {topster.thumbnail}
								onEdit = {() => handleEditTopster(topster.id)}
								onDelete = {() => handleDeleteTopster(topster.id)}
							/>
						))}
					</div>
				)}

				<button 
					className="create-button" 
					onClick={handleCreateTopster}
				>
					Create New Topster
				</button>

			</div>
		</RequireAuth>
	</>
}

export const createNewTopster = async (user: User, userId: string, existingCount: number) => {

	// create title using topster count, create reference to path
	const title = `${user?.displayName}'s Topster #${existingCount + 1}`;
	const topstersRef = collection(db, "users", userId, "topsters");

	// create topster with default settings (5x5, max 100)
	const newDoc = await addDoc(topstersRef, {
	title,
	rows: 5,
	cols: 5,
	tiles: Array.from({ length: 100 }, (_, i) => ({
		id: `tile-${i}`,
		album: null,
	})),
	updatedAt: new Date().toISOString(),
	});

	// return firebase-generated id
	return newDoc.id;
};


export const deleteTopster = async (userId: string, topsterId: string) => {
	const ref = doc(db, "users", userId, "topsters", topsterId);
	await deleteDoc(ref);
};