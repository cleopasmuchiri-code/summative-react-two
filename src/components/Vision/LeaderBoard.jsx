import { useApp } from "../../context/AppContext";
import { getUserInitials } from "../../utils/getUserInitials";
import { Flame } from "lucide-react";

const LeaderBoard = ({ leaderBoard, index }) => {
  const { users, currentUserId } = useApp();
  const initial = getUserInitials(users, leaderBoard.id);

  return (
    <div
      className={`${leaderBoard.id === currentUserId ? "bg-primary-light" : " bg-surface"} text-text p-4 flex justify-between items-center border-b border-b-text-muted/30`}
    >
      <div className="flex justify-center items-center gap-4">
        <p>{index + 1}</p>

        <div className="bg-primary/10 w-10 h-10 grid place-items-center rounded-full">
          {initial}
        </div>

        <h4 className="font-normal">
          {leaderBoard.id === currentUserId ? "You" : leaderBoard?.name}
        </h4>

        {index === 0 && <Flame className="text-accent-warm" size={24} />}
      </div>

      <div className="flex gap-4 items-center justify-center">
        <div className="font-bold">
          Ksh {leaderBoard?.total?.toLocaleString() ?? 0}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
