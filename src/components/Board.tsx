import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Cell from "./Cell";
import { Board, Coordinates, GameStatus } from "../types/game";
import { gameAction } from "../store/slice/game";

export default function BoardPage() {
  const board = useAppSelector((state) => state.game.board);
  const boardSetting = useAppSelector((state) => state.game.boardSetting);
  const status = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(gameAction.setGame(boardSetting));
  }, [boardSetting, dispatch]);

  const handleCellClick = (coordinates: Coordinates) => {
    if (status === GameStatus.READY || status === GameStatus.RUN) {
      dispatch(gameAction.openCell(coordinates));
    }
  };

  return (
    <div className="bg-slate-400 border m-2">
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
