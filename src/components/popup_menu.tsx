interface PopupMenu {
  children: React.ReactNode;
  top: number;
  left: number;
}

export function PopupMenu({ children, left, top }: PopupMenu) {
  return (
    <div
      style={{
        position: "absolute",
        width: "200px",
        backgroundColor: "#383838",
        borderRadius: "5px",
        boxSizing: "border-box",
        top: `${left}px`,
        left: `${top}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}
