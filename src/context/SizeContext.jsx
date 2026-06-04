import { createContext, useContext, useState } from "react";

export const sizeConfig = {
  Small:  { fontSize: 13, height: 42, borderRadius: 10, tileLabelSize: 16, tileMinHeight: 68,  tileIconSize: 42, tileIconFont: 20, tilePadding: "10px 16px", settingPadding: "10px 18px", avatarSize: 36, avatarFont: 18 },
  Medium: { fontSize: 17, height: 56, borderRadius: 16, tileLabelSize: 22, tileMinHeight: 95,  tileIconSize: 60, tileIconFont: 28, tilePadding: "20px 24px", settingPadding: "16px 22px", avatarSize: 50, avatarFont: 24 },
  Large:  { fontSize: 22, height: 72, borderRadius: 22, tileLabelSize: 30, tileMinHeight: 120, tileIconSize: 78, tileIconFont: 36, tilePadding: "28px 28px", settingPadding: "22px 22px", avatarSize: 62, avatarFont: 30 },
};

const SizeContext = createContext({
  size: "Medium",
  sz: sizeConfig.Medium,
  setSize: () => {},
});

export function SizeProvider({ children }) {
  const [size, setSize] = useState("Medium");
  return (
    <SizeContext.Provider value={{ size, sz: sizeConfig[size], setSize }}>
      {children}
    </SizeContext.Provider>
  );
}

export function useSizeContext() {
  return useContext(SizeContext);
}
