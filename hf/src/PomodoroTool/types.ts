export type PomodoroToolProps = {};

export type PomodoroPhaseTypes = "Pomodoro" | "Short" | "Long";

export type pomoValuesType = { [key: string]: string };

export type SettingsMenuProps = {
  /** Is settings menu open */
  open: boolean;
  /** Handle closing menu */
  handleClose: () => void;
  /** Saved values for pomodoro settings */
  savedValue: pomoValuesType;
  /** Set saved values for pomodoro settings */
  setSavedValue: React.Dispatch<React.SetStateAction<pomoValuesType>>;
};

export type CountdownTimerProps = {
  /** Current Pomo Phase */
  currentPhase: PomodoroPhaseTypes;
  /** Time to put on clock based on phase */
  phaseTime: number;
  /** Number of pomodoros since last long rest */
  restCount: number;
};
