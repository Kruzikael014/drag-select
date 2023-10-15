"use client";
import React, { useEffect, useRef, useState } from "react";
import ComputerCard from "@/components/computer_card";
import { PopupMenu } from "@/components/popup_menu";
import PopupMenuItem from "@/components/popup_menu_item";

interface MouseCoordinate {
  x: number;
  y: number;
}

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [rightClicked, setRightClicked] = useState(false);
  const startDragCoords = useRef<MouseCoordinate>({ x: 0, y: 0 });
  const startRightMenuCoords = useRef<MouseCoordinate>({ x: 0, y: 0 });
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(`Selected items now: `, selectedItems);
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startDragCoords.current.x = e.clientX;
    startDragCoords.current.y = e.clientY;
    if (selectBoxRef.current) {
      selectBoxRef.current.style.left = e.clientX + "px";
      selectBoxRef.current.style.top = e.clientY + "px";
      selectBoxRef.current.style.width = "0";
      selectBoxRef.current.style.height = "0";
      selectBoxRef.current.style.display = "block";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    if (selectBoxRef.current) {
      const width = Math.abs(e.clientX - startDragCoords.current.x);
      const height = Math.abs(e.clientY - startDragCoords.current.y);
      const left = Math.min(e.clientX, startDragCoords.current.x);
      const top = Math.min(e.clientY, startDragCoords.current.y);

      selectBoxRef.current.style.width = width + "px";
      selectBoxRef.current.style.height = height + "px";
      selectBoxRef.current.style.left = left + "px";
      selectBoxRef.current.style.top = top + "px";
    }

    const selectBoxRect = selectBoxRef.current?.getBoundingClientRect();

    if (!selectBoxRect) return;

    const items = document.getElementsByClassName("computer-card");
    const newSelectedItems: number[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const itemRect = item.getBoundingClientRect();

      if (
        itemRect.right > selectBoxRect.left &&
        itemRect.left < selectBoxRect.right &&
        itemRect.bottom > selectBoxRect.top &&
        itemRect.top < selectBoxRect.bottom
      ) {
        const computerNumber = parseInt(
          item.getAttribute("data-computer-number") || "0"
        );
        newSelectedItems.push(computerNumber);
      }
    }

    setSelectedItems([...newSelectedItems]);
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (selectBoxRef.current) {
      selectBoxRef.current.style.width = "0";
      selectBoxRef.current.style.height = "0";
      selectBoxRef.current.style.display = "none";
    }
  };

  const handleComputerClicked = (computerNumber: number) => {
    if (selectedItems.includes(computerNumber))
      setSelectedItems(selectedItems.filter((item) => item !== computerNumber));
    else setSelectedItems([...selectedItems, computerNumber]);
  };

  return (
    <main
      className="w-full min-h-screen p-12"
      onContextMenu={(e) => {
        e.preventDefault();
        setRightClicked(true);
        startRightMenuCoords.current.x = e.clientX;
        startRightMenuCoords.current.y = e.clientY;
      }}
    >
      <div
        className="grid grid-cols-10 gap-y-4 items-center justify-items-center p-24"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41,
        ].map((number: number) => (
          <ComputerCard
            key={number}
            computerNumber={number}
            onClickHandler={handleComputerClicked}
          />
        ))}
        <div className="drag-select-box" ref={selectBoxRef} />
      </div>
      {rightClicked && (
        <PopupMenu
          left={startRightMenuCoords.current.y}
          top={startRightMenuCoords.current.x}
        >
          {["test", "test1", "test2"].map((label, idx) => (
            <PopupMenuItem key={idx} label={label} />
          ))}
        </PopupMenu>
      )}
    </main>
  );
}
