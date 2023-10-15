"use client";
import React, { useEffect, useRef, useState } from "react";
import ComputerCard from "@/components/computer_card";

interface MouseCoordinate {
  x: number;
  y: number;
}

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const startCoords = useRef<MouseCoordinate>({ x: 0, y: 0 });
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(`Selected items now: `, selectedItems);
  }, [selectedItems]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startCoords.current.x = e.clientX;
    startCoords.current.y = e.clientY;
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
      const width = Math.abs(e.clientX - startCoords.current.x);
      const height = Math.abs(e.clientY - startCoords.current.y);
      const left = Math.min(e.clientX, startCoords.current.x);
      const top = Math.min(e.clientY, startCoords.current.y);

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

    setSelectedItems(newSelectedItems);
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
    if (selectedItems.includes(computerNumber)) {
      setSelectedItems(selectedItems.filter((item) => item !== computerNumber));
    } else {
      setSelectedItems([...selectedItems, computerNumber]);
    }
  };

  return (
    <main className="w-full min-h-screen p-48">
      <div
        className="grid grid-cols-3 gap-y-36 items-center justify-items-center p-24"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <ComputerCard
          computerNumber={1}
          onClickHandler={handleComputerClicked}
        />
        <ComputerCard
          computerNumber={2}
          onClickHandler={handleComputerClicked}
        />
        <ComputerCard
          computerNumber={3}
          onClickHandler={handleComputerClicked}
        />
        <ComputerCard
          computerNumber={4}
          onClickHandler={handleComputerClicked}
        />
        <ComputerCard
          computerNumber={5}
          onClickHandler={handleComputerClicked}
        />
        <ComputerCard
          computerNumber={6}
          onClickHandler={handleComputerClicked}
        />
        <div className="drag-select-box" ref={selectBoxRef} />
      </div>
    </main>
  );
}
