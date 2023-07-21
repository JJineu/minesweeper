import { ChangeEvent } from "react";
import { useAppDispatch } from "../hooks/useRedux";
import { gameAction } from "../store/slice/game";

export default function Header() {
  const dispatch = useAppDispatch();
  const handleDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "Beginner":
        dispatch(gameAction.setGame({ width: 8, height: 8 }));
        break;
      case "Intermediate":
        dispatch(gameAction.setGame({ width: 16, height: 16 }));
        break;
      case "Expert":
        dispatch(gameAction.setGame({ width: 32, height: 16 }));
        break;
      case "Custom":
        let width = prompt("가로 길이를 입력하세요");
        let height = prompt("세로 길이를 입력하세요");
        let mines = prompt("지뢰 수를 입력하세요");
        dispatch(gameAction.setGame({ width, height }));
        break;
      default:
        break;
    }
    
  };
  return (
    <div className="p-3 bg-blue-300 w-full flex gap-1 text-xs">
      {/* <img src="/img/flag.ico" /> */}
      <button>New</button>
      <select name="difficulty" onChange={handleDifficulty}>
        <option value="Beginner" selected>
          Beginner
        </option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
        <option value="Custom">Custom</option>
      </select>
    </div>
  );
}
