const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements, imports) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add imports
  if (imports && !content.includes(imports)) {
    content = content.replace(/import .*? from "react";\r?\n/, match => match + imports + '\n');
  }

  // Replace each pattern
  replacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
};

// 1. Groupchatscreen.jsx
replaceInFile(
  path.join(__dirname, 'src', 'screens', 'Groupchatscreen.jsx'),
  [
    [/avatar: "👩"/g, 'avatar: <FaUser />'],
    [/avatar: "👨"/g, 'avatar: <FaUser />'],
    [/avatar: "👧"/g, 'avatar: <FaUser />'],
    [/avatar: "🧑"/g, 'avatar: <FaUser />'],
    [/avatar: "👱‍♀️"/g, 'avatar: <FaUser />'],
    [/text: `Welcome to \$\{groupName\}! 🎉`/g, 'text: <>Welcome to {groupName}! <FaGlassCheers /></>'],
    [/text: "Hello everyone! So happy to be here 😊"/g, 'text: <>Hello everyone! So happy to be here <FaSmile /></>'],
    [/text: "Hi all! Looking forward to connecting with you all 🤝"/g, 'text: <>Hi all! Looking forward to connecting with you all <FaHandshake /></>'],
    [/text: "Yes! Life changing! 🙌"/g, 'text: <>Yes! Life changing! <FaHands /></>'],
    [/label: "I need help 🆘"/g, 'label: <>I need help <FaLifeRing /></>'],
    [/label: "Give me some time ⏰"/g, 'label: <>Give me some time <FaClock /></>'],
    [/label: "Thank you! 🙏"/g, 'label: <>Thank you! <FaPray /></>'],
    [/label: "That's great! 🎉"/g, 'label: <>That\'s great! <FaGlassCheers /></>'],
    [/label: "I agree 👍"/g, 'label: <>I agree <FaThumbsUp /></>'],
    [/label: "Can we talk\? 💬"/g, 'label: <>Can we talk? <FaComment /></>'],
    [/avatar = group\?\.avatar \|\| "🐱"/g, 'avatar = group?.avatar || <FaCat />'],
    [/"Thanks for sharing! 😊"/g, '<>Thanks for sharing! <FaSmile /></>'],
    [/"I feel the same way 🤝"/g, '<>I feel the same way <FaHandshake /></>'],
    [/"Great point! 👍"/g, '<>Great point! <FaThumbsUp /></>'],
    [/"So true! This community is amazing ❤️"/g, '<>So true! This community is amazing <FaHeart /></>'],
    [/alert\("❌ Voice recognition/g, 'alert("Voice recognition'],
    [/alert\("⚠️ Microphone blocked!/g, 'alert("Microphone blocked!'],
    [/>←<\/button>/g, '><FaArrowLeft /></button>'],
    [/>⚙️<\/button>/g, '><FaCog /></button>'],
    [/>\s*↩ UNDO\s*<\/button>/g, '><FaUndo /> UNDO</button>'],
    [/>🎙️<\/div>/g, '><FaMicrophone /></div>'],
    [/>💡<\/div>/g, '><FaLightbulb /></div>'],
    [/>➤<\/button>/g, '><FaPaperPlane /></button>'],
    [/>🎙️ Group Voice Input<\/span>/g, '><FaMicrophone /> Group Voice Input</span>'],
    [/\{recording \? "📡" : "✨"\}/g, '{recording ? <FaBroadcastTower /> : <FaMagic />}'],
    [/>⚠️ ANTI-ACCIDENTAL PREVIEW<\/p>/g, '><FaExclamationTriangle /> ANTI-ACCIDENTAL PREVIEW</p>'],
    [/>← Back<\/button>/g, '><FaArrowLeft /> Back</button>'],
    [/>\s*⚙️ Group Settings\s*<\/p>/g, '> <FaCog /> Group Settings </p>'],
    [/>👤<\/div>/g, '><FaUser /></div>'],
    [/>\s*🚪 Leave Group\s*<\/button>/g, '> <FaSignOutAlt /> Leave Group </button>'],
    [/>🚪<\/div>/g, '><FaSignOutAlt /></div>'],
  ],
  'import { FaUser, FaGlassCheers, FaSmile, FaHandshake, FaHands, FaLifeRing, FaClock, FaPray, FaThumbsUp, FaComment, FaCat, FaHeart, FaArrowLeft, FaCog, FaUndo, FaMicrophone, FaLightbulb, FaPaperPlane, FaBroadcastTower, FaMagic, FaExclamationTriangle, FaSignOutAlt } from "react-icons/fa";'
);

// 2. Createpostscreen.jsx
replaceInFile(
  path.join(__dirname, 'src', 'screens', 'Createpostscreen.jsx'),
  [
    [/\{ emoji: "😊", label: "Happy" \}/g, '{ emoji: <FaSmile />, label: "Happy", id: "happy" }'],
    [/\{ emoji: "💪", label: "Strong" \}/g, '{ emoji: <FaDumbbell />, label: "Strong", id: "strong" }'],
    [/\{ emoji: "🙏", label: "Grateful" \}/g, '{ emoji: <FaPray />, label: "Grateful", id: "grateful" }'],
    [/\{ emoji: "😔", label: "Down" \}/g, '{ emoji: <FaFrown />, label: "Down", id: "down" }'],
    [/\{ emoji: "❤️", label: "Loving" \}/g, '{ emoji: <FaHeart />, label: "Loving", id: "loving" }'],
    [/key=\{m\.emoji\}/g, 'key={m.id}'],
    [/mood === m\.emoji/g, 'mood === m.id'],
    [/setMood\(m\.emoji\)/g, 'setMood(m.id)'],
    [/alert\("❌ Voice recognition/g, 'alert("Voice recognition'],
    [/>←<\/button>/g, '><FaArrowLeft /></button>'],
    [/>👤<\/div>/g, '><FaUser /></div>'],
    [/>🎙️ Dictate Instead<\/p>/g, '><FaMicrophone /> Dictate Instead</p>'],
    [/>🎙️<\/button>/g, '><FaMicrophone /></button>'],
    [/>🔴 Listening\.\.\. Speak clearly/g, '><FaCircle style={{marginRight: 6}} /> Listening... Speak clearly'],
    [/>🖼️<\/div>/g, '><FaImage /></div>'],
    [/>📋<\/div>/g, '><FaClipboard /></div>'],
  ],
  'import { FaArrowLeft, FaUser, FaSmile, FaDumbbell, FaPray, FaFrown, FaHeart, FaMicrophone, FaCircle, FaImage, FaClipboard } from "react-icons/fa";'
);

// 3. Joingroupscreen.jsx
replaceInFile(
  path.join(__dirname, 'src', 'screens', 'Joingroupscreen.jsx'),
  [
    [/icon: "🤲"/g, 'icon: <FaHands />'],
    [/icon: "🐾"/g, 'icon: <FaPaw />'],
    [/icon: "☀️"/g, 'icon: <FaSun />'],
    [/icon: "💚"/g, 'icon: <FaHeart />'],
    [/icon: "📱"/g, 'icon: <FaMobileAlt />'],
    [/icon: "🎨"/g, 'icon: <FaPalette />'],
    [/>←<\/button>/g, '><FaArrowLeft /></button>'],
    [/>🔍<\/span>/g, '><FaSearch /></span>'],
    [/👥 \{group\.members\} members/g, '<FaUsers /> {group.members} members'],
    [/✅ Joined/g, '<><FaCheck /> Joined</>'],
    [/✅ Yes, Join Group/g, '<><FaCheck /> Yes, Join Group</>'],
    [/👥 \{confirmGroup\.members\} members already inside/g, '<FaUsers /> {confirmGroup.members} members already inside'],
    [/>🎉<\/div>/g, '><FaGlassCheers /></div>'],
  ],
  'import { FaHands, FaPaw, FaSun, FaHeart, FaMobileAlt, FaPalette, FaArrowLeft, FaSearch, FaUsers, FaCheck, FaGlassCheers } from "react-icons/fa";'
);

// 4. Postpreviewscreeen.jsx
replaceInFile(
  path.join(__dirname, 'src', 'screens', 'Postpreviewscreeen.jsx'),
  [
    [/>🎉<\/div>/g, '><FaGlassCheers /></div>'],
    [/>←<\/button>/g, '><FaArrowLeft /></button>'],
    [/>⚠️<\/span>/g, '><FaExclamationTriangle /></span>'],
    [/>👤<\/div>/g, '><FaUser /></div>'],
    [/"🤍 Like"/g, '<><FaHeart /> Like</>'],
    [/"💬 Comment"/g, '<><FaComment /> Comment</>'],
    [/"😊 React"/g, '<><FaSmile /> React</>'],
    [/"↗️ Share"/g, '<><FaShare /> Share</>'],
    [/>🚀 POST NOW/g, '><FaRocket /> POST NOW'],
    [/>← Edit Post/g, '><FaArrowLeft /> Edit Post']
  ],
  'import { FaGlassCheers, FaArrowLeft, FaExclamationTriangle, FaUser, FaHeart, FaComment, FaSmile, FaShare, FaRocket } from "react-icons/fa";'
);
