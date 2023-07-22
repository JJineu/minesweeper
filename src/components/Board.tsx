import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import Cell from "./Cell";
import { Coordinates, gameAction } from "../store/slice/game";

export default function Board() {
  const board = useAppSelector((state) => state.game.board);
  const dispatch = useAppDispatch();
  const handleCellClick = (coordinates: Coordinates) => {
    dispatch(gameAction.openCell(coordinates));
  };
  // 시작
  // 첫 번째 칸 누르면 시작(첫 번째 칸은 폭탄이 아니다)
  
  const [gameState, setGameState] = useState('');
  // 종료
  // 패배: 폭탄이 나왔을 때
    // 모든 폭탄 보여주기
  // 승리: 폭탄 제외하고 모든 칸이 열렸을 떄


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
