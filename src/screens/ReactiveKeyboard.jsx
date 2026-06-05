import { useState } from "react";
import { FaBackspace, FaArrowUp } from "react-icons/fa";

export default function ReactiveKeyboard({ value, onChange, onSubmit, themeColor = "#6B3FA0" }) {
  const [layout, setLayout] = useState("alpha"); // alpha | numeric | emoji
  const [capsLock, setCapsLock] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  // Clean, professional layout definitions
  const layouts = {
    alpha: [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["SHIFT", "z", "x", "c", "v", "b", "n", "m", "⌫"],
      ["123", "😊", "SPACE", "GO ➤"]
    ],
    numeric: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["-", "/", ":", ";", "(", ")", "$", "&", "@", '"'],
      [".", ",", "?", "!", "'", "⌫"],
      ["ABC", "😊", "SPACE", "GO ➤"]
    ],
    emoji: [
      ["😀", "😂", "🥰", "👍", "🙏", "❤️", "✨", "🐱"],
      ["👋", "🎉", "🔥", "💡", "🎙️", "👀", "🌸", "⭐"],
      ["ABC", "123", "⌫", "SPACE", "GO ➤"]
    ]
  };

  const handleKeyPress = (key) => {
    if (key === "⌫") {
      onChange(value.slice(0, -1));
    } else if (key === "SPACE") {
      onChange(value + " ");
    } else if (key === "GO ➤") {
      if (onSubmit) onSubmit();
    } else if (key === "123") {
      setLayout("numeric");
    } else if (key === "ABC") {
      setLayout("alpha");
    } else if (key === "😊") {
      setLayout("emoji");
    } else if (key === "SHIFT") {
      setCapsLock(!capsLock);
    } else {
      // Direct capitalization matching what is visible on the key
      const parsedKey = capsLock && layout === "alpha" ? key.toUpperCase() : key;
      onChange(value + parsedKey);
    }
  };

  const getKeyStyles = (key) => {
    const isPressed = activeKey === key;

    const baseButton = {
      flex: 1,
      height: 54, 
      borderRadius: 12,
      border: "none",
      fontSize: 18,
      fontWeight: "700",
      fontFamily: "system-ui, sans-serif",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: isPressed ? "scale(0.92)" : "scale(1)",
      transition: "transform 0.08s, background-color 0.1s",
      userSelect: "none",
      boxSizing: "border-box"
    };

    if (key === "GO ➤") {
      return { 
        ...baseButton, 
        background: isPressed ? "#522F7A" : "linear-gradient(135deg, #6B3FA0, #8B5CC8)", 
        color: "white", 
        flex: 1.5 
      };
    }
    if (key === "SPACE") {
      return { 
        ...baseButton, 
        background: isPressed ? "#C9BEDC" : "#E8E0F8", 
        color: "#2D1B69", 
        flex: 3 
      };
    }
    
    // 🎨 Shift Key turns dark purple when active to show it is locked ON
    if (key === "SHIFT") {
      return {
        ...baseButton,
        background: capsLock ? "#2D1B69" : (isPressed ? "#B297DA" : "#D0B8F5"),
        color: capsLock ? "white" : "#2D1B69"
      };
    }

    if (["123", "ABC", "😊", "⌫"].includes(key)) {
      return { 
        ...baseButton, 
        background: isPressed ? "#B297DA" : "#D0B8F5", 
        color: "#2D1B69" 
      };
    }
    
    return { 
      ...baseButton, 
      background: isPressed ? "#B098E0" : "white", 
      color: isPressed ? "white" : "#2D1B69", 
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)" 
    };
  };

  // 📝 Helper function to render the face text professionally
  const renderKeyLabel = (key) => {
    if (key === "⌫") return <FaBackspace />;
    if (key === "SHIFT") return <FaArrowUp style={{ transform: capsLock ? "scale(1.2)" : "scale(1)" }} />;
    
    // If Caps Lock is ON, instantly capitalize the letter labels visually
    if (capsLock && layout === "alpha" && key.length === 1) {
      return key.toUpperCase();
    }
    return key;
  };

  return (
    <div style={{
      width: "100%",
      background: "#F0EBFF",
      padding: "12px 8px 24px",
      borderTop: "2px solid #D0B8F5",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxSizing: "border-box"
    }}>
      {layouts[layout].map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: "flex", width: "100%", gap: 6 }}>
          {row.map((key, keyIdx) => (
            <button
              key={keyIdx}
              onClick={() => handleKeyPress(key)}
              onMouseDown={() => setActiveKey(key)}
              onMouseUp={() => setActiveKey(null)}
              onMouseLeave={() => setActiveKey(null)}
              onTouchStart={() => setActiveKey(key)}
              onTouchEnd={() => setActiveKey(null)}
              style={getKeyStyles(key)}
            >
              {renderKeyLabel(key)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}