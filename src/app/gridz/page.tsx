"use client";

import Link from "next/link";

import { TopsterProvider } from "../contexts/topsterContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Sidebar from "../../components/sideBar"
import TopsterGrid from "../../components/topsterGrid"

import "../../css/globals.css";
import "../../css/page-layout.css";


export default function page() {
  return (
    <html>
      <body>

        <DndProvider backend={HTML5Backend}>
          <TopsterProvider>

            <h1>gridz</h1>
            <Link href="/" className="page-link">home</Link>

            <div className="topster-layout">
              <Sidebar />
              <div className="topster-grid-wrapper">
                <TopsterGrid />
              </div>
            </div>

          </TopsterProvider>
        </DndProvider>

      </body>
    </html>
  );
}
