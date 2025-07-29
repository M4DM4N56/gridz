"use client";

import "../css/navBar.css";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";


export default function NavBar(){

    const router = useRouter();

    const handleMyAccount = () => {
        router.push("/account");
    }

    const handleSearchUsers = () => {
        alert("not implemented yet :)");
    }

    const handleLogOut = async () => {
        await signOut(auth);
        router.push("/");
    }


    return <nav className = "navbar">

        <div className="navbar-section" onClick={handleMyAccount}>
            <button> My Account </button>
        </div>
        
        <div className="navbar-section" onClick={handleSearchUsers}>
            <button> Seach Users </button>
        </div>

        <div className="navbar-section" onClick={handleLogOut}>
            <button> Log Out </button>
        </div>
        
    </ nav>
}