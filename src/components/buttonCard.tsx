"use client";

import "../css/account.css";

type ButtonCardProps = {
	title: string;
	onEdit: () => void;
	onDelete: () => void;
};

export default function ButtonCard({ title, onEdit, onDelete }: ButtonCardProps) {
	return (
		<div className="button-card">
			<button
				className="delete-button"
				onClick={(e) => {
					e.stopPropagation();
					onDelete();
				}}
				title="Delete Topster"
			>
				✖
			</button>

			<div className="button-card-content" onClick={onEdit}>
				<div className="button-card-preview" />
				<div className="button-card-title">{title}</div>
			</div>
		</div>
	);
}
