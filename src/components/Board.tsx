import { MouseEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Cell from "./Cell";
import { Coordinates, GameStatus } from "../types/game";
import { gameAction } from "../store/slice/game";
import React from "react";

export default function BoardPage() {
  const board = useAppSelector((state) => state.game.board);
  const boardSetting = useAppSelector((state) => state.game.boardSetting);
  const status = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(gameAction.setGame());
  }, [boardSetting, dispatch]);

  const handleOpenCell = (coordinates: Coordinates) => {
    if (status === GameStatus.READY || status === GameStatus.RUN) {
      dispatch(gameAction.openCell(coordinates));
    }
  };

  const handleFlagCell = (
    e: MouseEvent<HTMLElement>,
    coordinates: Coordinates
  ) => {
    e.preventDefault();
    if (status === GameStatus.READY || status === GameStatus.RUN) {
      dispatch(gameAction.flagCell(coordinates));
    }
  };

  return (
    <div className="bg-slate-400 border m-2">
      {board.map((row, y) => (
        <div className="flex" key={y}>
          {row.map((cell, x) => (
            <MemoCell
              key={`${y}-${x}`}
              cell={cell}
              onClick={handleOpenCell}
              onRightClick={handleFlagCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const MemoCell = React.memo(Cell, (prevProps, nextProps) => {
  return prevProps.cell === nextProps.cell;
});