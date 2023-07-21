import { Cell as CellType } from "../store/slice/game";

type Props = {
  cell: CellType;
  coordinates: { x: number; y: number };
  onClick: (x: number, y: number) => void;
};
export default function Cell({ cell, coordinates, onClick }: Props) {
  //   console.log(coordinates);
  return (
    <div
      className="bg-white w-5 h-5 border text-xs text-center"
      onClick={() => onClick(coordinates.x, coordinates.y)}
    >
      {/* ㅎ */}
    </div>
  );
}
