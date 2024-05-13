export interface UserOp {
  option: string;
}

export type UserOpContextType = {
  theme: UserOp["option"];
  lang: UserOp["option"];
  showFinished: UserOp["option"];
  showMain: UserOp["option"];
  toggleTheme: () => void;
  toggleLang: () => void;
  toggleShowFinished: () => void;
  toggleShowMain: () => void;
};
