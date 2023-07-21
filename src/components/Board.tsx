import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Cell from "./Cell";
import { gameAction } from "../store/slice/game";

export default function Board() {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const handleCellClick = (x: number, y: number) => {
    console.log(x, y);
  };

  useEffect(() => {
    dispatch(gameAction.setGame({ width: 8, height: 8}));
  }, []);

  return (
    <div className="bg-boom p-2">
      {game.board.map((row, y) => (
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
