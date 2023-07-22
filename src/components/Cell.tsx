import { Cell as CellType, Coordinates } from "../store/slice/game";

type Props = {
  cell: CellType;
  coordinates: Coordinates;
  onClick: (coordinates: Coordinates) => void;
};
export default function Cell({ cell, coordinates, onClick }: Props) {
  //   console.log(coordinates);

  // 클릭
  // 폭탄일 경우, 게임 종료한다. -> 모든 폭탄 오픈한다. (timer: 게임 시작과 종료와 관련)
  if (cell.isMine) return <>B</>;
  // 폭탄이 아닐 경우, 셀을 오픈한다. 주변 폭탄 개수 표시
  if (cell.isOpen) {
    return <div>{cell.nearMines}</div>;
  }
  // 우클릭
  // 깃발을 표시한다. 좌클릭 막는다. 폭탄 개수를 업데이트 한다. (status: 폭탄 개수 - 깃발 개수)

  return (
    <div
      className="bg-white w-5 h-5 border text-xs text-center"
      onClick={() => onClick(coordinates)}
    >
      {/* ㅎ */}
    </div>
  );
}
