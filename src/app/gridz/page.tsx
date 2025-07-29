"use client";

import Link from "next/link";

import { TopsterProvider } from "../../contexts/topsterContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSearchParams } from "next/navigation";
import RequireAuth from "../../components/requireAuth";

import Sidebar from "../../components/sideBar"
import TopsterGrid from "../../components/topsterGrid"
import TopsterTitleEditor from "../../components/topsterTitleEditor";
import NavBar from "../../components/navBar";


import "../../css/globals.css";
import "../../css/page-layout.css";
import "../../css/topsterTitle.css"

import TopsterInitializer from "../../components/topsterInitializer"

export default function Page() {

  const searchParams = useSearchParams();
  const topsterId = searchParams.get("id");

  if (!topsterId) return <p>Error: No topster ID provided.</p>;

  return <>

    <NavBar/>

    <RequireAuth>
      
      <DndProvider backend={HTML5Backend}>
        <TopsterProvider topsterId={topsterId}>

          <TopsterInitializer topsterId={topsterId}/>

          <div className="topster-layout">
            <Sidebar />

            <div className="topster-grid-wrapper">
              <div className="topster-content">
                <TopsterTitleEditor />
                <TopsterGrid />
              </div>
            </div>
            
          </div>

        </TopsterProvider>
      </DndProvider>
    </RequireAuth>

  </>
}
