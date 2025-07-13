"use client";

import Link from "next/link";

import { TopsterProvider } from "../../contexts/topsterContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import RequireAuth from "../../components/requireAuth";

import Sidebar from "../../components/sideBar"
import TopsterGrid from "../../components/topsterGrid"

import "../../css/globals.css";
import "../../css/page-layout.css";

import TopsterInitializer from "../../components/topsterInitializer"

export default function Page() {

  return <div>

        <RequireAuth>
          <DndProvider backend={HTML5Backend}>
            <TopsterProvider>

              <TopsterInitializer />

              <h1>gridz</h1>
              <Link href="/account" className="page-link">Profile</Link>

              <div className="topster-layout">
                <Sidebar />

                <div className="topster-grid-wrapper">
                  <TopsterGrid />
                </div>
                
              </div>

            </TopsterProvider>
          </DndProvider>
        </RequireAuth>

  </div>
}
