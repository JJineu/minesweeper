import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../hooks/useRedux";
import { gameAction } from "../store/slice/game";

export default function Header() {
  const dispatch = useAppDispatch();
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  // 난이도에 따라 게임 초기 설정을 합니다.
  const handleDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
    switch (e.target.value) {
      case "Beginner":
        dispatch(gameAction.setBoard({ width: 8, height: 8, minesCount: 10 }));
        break;
      case "Intermediate":
        dispatch(
          gameAction.setBoard({ width: 16, height: 16, minesCount: 40 })
        );
        break;
      case "Expert":
        dispatch(
          gameAction.setBoard({ width: 32, height: 16, minesCount: 99 })
        );
        break;
      case "Custom":
        let width;
        do {
          width = Number(prompt("가로 길이를 입력하세요(8~50)"));
        } while ((width < 8 || width > 50) && width);
        let height;
        do {
          height = Number(prompt("세로 길이를 입력하세요(8~50)"));
        } while ((height < 8 || height > 50) && height);
        let minesCount;
        do {
          minesCount = Number(prompt("지뢰 수를 입력하세요(10~)"));
        } while (
          (10 > minesCount || minesCount > width * height - 1) &&
          minesCount
        );
        if (!width || !height || !minesCount) {
          setSelectedDifficulty("Beginner");
          dispatch(
            gameAction.setBoard({ width: 8, height: 8, minesCount: 10 })
          );
        } else {
          dispatch(gameAction.setBoard({ width, height, minesCount }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-3 bg-blue-300 w-full flex gap-1 text-xs">
      <select
        name="difficulty"
        onChange={handleDifficulty}
        value={selectedDifficulty}
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
        <option value="Custom">Custom</option>
      </select>
    </div>
  );
}
