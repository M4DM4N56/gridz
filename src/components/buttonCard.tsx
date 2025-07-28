"use client";

import "../css/account.css";

type ButtonCardProps = {
	title: string;
	thumbnail?: string;
	onEdit: () => void;
	onDelete: () => void;
};

export default function ButtonCard({ title, thumbnail, onEdit, onDelete }: ButtonCardProps) {
	return <>
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
				<div className="button-card-preview"> 
					{thumbnail ? (
						<img src={thumbnail} alt={title} className="topster-preview-image" />
					) : (
						<div className="topster-preview-placeholder" />
					)}
				</div>
				<div className="button-card-title">{title}</div>
			</div>
		</div>
	</>
}
