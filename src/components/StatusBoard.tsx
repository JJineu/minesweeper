import { useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { gameAction } from "../store/slice/game";
import { GameStatus } from "../types/game";

export default function StatusBoard() {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const status = useAppSelector((state) => state.game.status);
  const time = useAppSelector((state) => state.game.time);

  useInterval(
    () => {
      dispatch(gameAction.updateTimer());
    },
    status === GameStatus.RUN ? 1000 : null
  );

  useEffect(() => {
    if (status === GameStatus.WIN) {
      alert("YOU WIN");
    }
  }, [status]);

  // 게임을 재시작 합니다.
  const restartGame = () => {
    dispatch(gameAction.setGame());
  };

  const flagCount = game.board.flat().filter((c) => c.isFlag === true).length;
  return (
    <div className="p-2 bg-red-300 flex justify-between">
      {/* 남은 폭탄 개수 */}
      <div className="font-bold text-blue-600 bg-slate-100 w-10 h-7 ml-2 text-center border rounded-sm">
        {game.boardSetting.minesCount - flagCount}
      </div>
      {/* 리셋 버튼 */}
      <button
        onClick={restartGame}
        className="bg-slate-100 w-7 h-7 border rounded-sm text-red-500"
      >
        ♥
      </button>
      {/* 타이머 */}
      <div className="font-bold text-blue-600 bg-slate-100 w-10 h-7 text-center border rounded-sm">
        {time}
      </div>
    </div>
  );
}
