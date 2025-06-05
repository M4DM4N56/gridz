"use client";

import Link from "next/link";

import "../../css/globals.css"
import "../../css/page-layout.css"

import {TopsterProvider} from "../contexts/topsterContext"
import TopsterGrid from "../../components/topsterGrid";
import SideBar from "../../components/sideBar";

export default function page(){
   
    return <>
        <html>
            <body>

                <TopsterProvider>
                    <h1>gridz</h1>
                    <Link href="/" className = "page-link">home</Link>
                    
                    <div className = "topster-layout">
                        <SideBar/>
                        <TopsterGrid/>    
                    </div>
                </TopsterProvider>
            
            </body>
        </html>
    </>
}