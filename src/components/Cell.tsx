import { Coordinates, Cell as CellType } from "../types/game";

type Props = {
  cell: CellType;
  coordinates: Coordinates;
  onClick: (coordinates: Coordinates) => void;
};
export default function Cell({ cell, coordinates, onClick }: Props) {
  // 우클릭
  // 깃발을 표시한다. 좌클릭 막는다. 폭탄 개수를 업데이트 한다. (status: 폭탄 개수 - 깃발 개수)

  const show = () => {
    if (cell.isOpen) {
      if (cell.isMine)
        return (
          <div className="w-full h-full bg-boom">
            <img src="/img/boom.jpg" alt="boom" />
          </div>
        );
      return <div className="w-full h-full bg-boom">{cell.nearMines}</div>;
    }
  };

  return (
    <div
      className="w-5 h-5 border text-xs text-center"
      onClick={() => onClick(coordinates)}
    >
      {show()}
    </div>
  );
}
