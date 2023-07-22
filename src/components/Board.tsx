import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Cell from "./Cell";
import { Coordinates, gameAction } from "../store/slice/game";

export default function Board() {
  const board = useAppSelector((state) => state.game.board);
  const dispatch = useAppDispatch();
  const handleCellClick = (coordinates: Coordinates) => {
    dispatch(gameAction.openCell(coordinates));
  };
  // 게임 시작과 종료 // 승리 패배

  useEffect(() => {
    dispatch(gameAction.setGame({ width: 8, height: 8, minesCount: 10 }));
  }, []);

  return (
    <div className="bg-boom p-2">
      {board.map((row, y) => (
        <div className="flex">
          {row.map((cell, x) => (
            <Cell
              cell={cell}
              coordinates={{ x, y }}
              onClick={handleCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
