import { useInterval } from "../hooks/useInterval";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { gameAction } from "../store/slice/game";
import { GameStatus } from "../types/game";

export default function StatusBoard() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.game.status);
  const time = useAppSelector((state) => state.game.time);

  useInterval(
    () => {
      dispatch(gameAction.updateTimer());
    },
    state === GameStatus.RUN ? 1000 : null
  );

  return (
    <div className="p-5 bg-red-300">
      {/* 남은 폭탄 개수 */}
      {/* 리셋 버튼 */}
      {/* 타이머 */}
      <div className="font-bold text-blue-600 bg-slate-100 w-11 h-6 text-right px-1">
        {time}
      </div>
    </div>
  );
}
