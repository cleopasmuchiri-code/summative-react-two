import { useContext, createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { seedData } from "../data/seedData";
import { toast } from "react-hot-toast";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  // themes
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // toggle theme in HTML
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // function to toggle theme - in react
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // set user
  const [users] = useLocalStorage("users", seedData.users);

  // user id
  const [currentUserId, setCurrentUserId] = useLocalStorage(
    "currentUserId",
    "u1",
  );

  //   find current user
  const currentUser = users.find((user) => user.id === currentUserId);

  // vision
  const [visions, setVisions] = useLocalStorage("visions", seedData.visions);

  function createVision(newVision) {
    setVisions((prev) => [...prev, newVision]);

    toast.success(`"${newVision.title}" created`);
  }

  function editVision(updatedVision) {
    setVisions((prev) =>
      prev.map((v) => (v.id === updatedVision.id ? updatedVision : v)),
    );
  }

  function deleteVision(visionId) {
    const exists = visions.some((v) => v.id === visionId);
    if (!exists) {
      toast.error("Vision not found");
      return;
    }
    setVisions((prev) => prev.filter((v) => v.id !== visionId));
    setContributions((prev) => prev.filter((c) => c.visionId !== visionId));

    toast.success("Vision deleted");
  }

  // contribution
  const [contributions, setContributions] = useLocalStorage(
    "contributions",
    seedData.contributions,
  );

  function addContribution(newContribution) {
    setContributions((prev) => [...prev, newContribution]);

    toast.success(`Ksh ${newContribution.amount} added 🎉`);
  }

  function editContribution(updatedContribution) {
    setContributions((prev) =>
      prev.map((c) =>
        c.id === updatedContribution.id ? updatedContribution : c,
      ),
    );
  }

  function deleteContribution(contributionId) {
    setContributions((prev) => prev.filter((c) => c.id !== contributionId));
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        users,
        currentUser,
        currentUserId,
        setCurrentUserId,
        visions,
        createVision,
        editVision,
        deleteVision,
        contributions,
        addContribution,
        editContribution,
        deleteContribution,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used inside an AppProvider");
  }
  return context;
}
