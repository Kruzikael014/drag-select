interface ComputerCardProps {
  computerNumber: number;
  onClickHandler?: (computerNumber: number) => void;
  onHoverHandler?: (computerNumber: number) => void;
}

export default function ComputerCard({
  computerNumber,
  onClickHandler,
  onHoverHandler,
}: ComputerCardProps) {
  return (
    <div
      data-computer-number={computerNumber}
      onClick={(e) => {
        if (onClickHandler) onClickHandler(computerNumber);
      }}
      onMouseEnter={(e) => {
        if (onHoverHandler) onHoverHandler(computerNumber);
      }}
      className="computer-card rounded-2xl select-none flex flex-col p-3 box-border items-center justify-items-center gap-y-4 bg-slate-300 w-24 h-24"
    >
      <div>💻</div>
      <div>{computerNumber}</div>
    </div>
  );
}
