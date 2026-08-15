import { useApp } from "../../context/AppContext";
import { Pencil, Trash } from "lucide-react";

const HistoryCard = ({ contribution, editContributionToggle }) => {
  const { currentUserId, users, visions, deleteContribution } = useApp();

  const vision = visions.find((v) => v.id === contribution.visionId);
  const contributor = users.find((u) => u.id === contribution.memberId);

  const isCurrentUser = contributor && contributor.id === currentUserId;
  console.log("Contributor", contributor);

  return (
    <div className="bg-surface text-text p-4 flex justify-between items-center border-b border-b-text-muted/30 ">
      <div className="">
        <h4 className="font-normal">{vision?.title || "Unknown Vision"}.</h4>

        <div className="text-xs text-text-muted flex items-center gap-1">
          <div className="history-date">{contribution.date}</div>
          <span className="contributor-tag">
            · {isCurrentUser ? "You" : contributor?.name}
          </span>
        </div>
      </div>

      <div className="flex gap-4  items-center justify-center">
        <div className="font-bold">
          Ksh {contribution.amount.toLocaleString()}
        </div>

        {isCurrentUser && editContributionToggle ? (
          <div className="flex gap-1">
            <button
              className="cursor-pointer text-text-muted"
              onClick={() => editContributionToggle(contribution)}
            >
              <Pencil size={14} />
            </button>
            <button
              className="cursor-pointer text-text-muted"
              onClick={() => deleteContribution(contribution.id)}
            >
              <Trash size={14} />
            </button>
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
