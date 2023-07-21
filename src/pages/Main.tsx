import Board from "../components/Board";
import Header from "../components/Header";
import StatusBoard from "../components/StatusBoard";

export default function Main() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border">
        <Header />
        <StatusBoard />
        <Board />
      </div>
    </div>
  );
}
