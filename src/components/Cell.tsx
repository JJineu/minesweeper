import { MouseEvent } from "react";
import { Coordinates, Cell as CellType } from "../types/game";

type Props = {
  cell: CellType;
  onClick: (coordinates: Coordinates) => void;
  onRightClick: (e: MouseEvent<HTMLElement>, coordinates: Coordinates) => void;
};

export default function Cell({ cell, onClick, onRightClick }: Props) {
  const show = () => {
    if (cell.isOpen) {
      if (cell.isMine)
        return (
          <div className="w-full h-full bg-boom">
            <img src="/img/boom.jpg" alt="boom" />
          </div>
        );
      return (
        <div
          className={`w-full h-full bg-boom font-bold ${
            cell.nearMines === 0
              ? "text-boom"
              : cell.nearMines === 2
              ? "text-green-600"
              : cell.nearMines === 3
              ? "text-red-600"
              : cell.nearMines === 4
              ? "text-purple-600"
              : ""
          } `}
        >
          {cell.nearMines}
        </div>
      );
    } else if (cell.isFlag) {
      return (
        <div className="w-full h-full bg-boom">
          <img src="/img/flag.ico" alt="flag" />
        </div>
      );
    }
  };

  return (
    <div
      className="w-5 h-5 border text-xs text-center"
      onClick={() => onClick(cell.coordinate)}
      onContextMenu={(e) => onRightClick(e, cell.coordinate)}
    >
      {show()}
    </div>
  );
}
