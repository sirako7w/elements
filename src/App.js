import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TouchKeyboard from "./TouchKeyboard";

// --- データ定義 ---
const rawElements = [
  { n: 1, s: "H", name: "水素", g: "other", p: 1, gr: 1 },
  { n: 2, s: "He", name: "ヘリウム", g: "noble", p: 1, gr: 18 },
  { n: 3, s: "Li", name: "リチウム", g: "alkali", p: 2, gr: 1 },
  { n: 4, s: "Be", name: "ベリリウム", g: "alkaline_earth", p: 2, gr: 2 },
  { n: 5, s: "B", name: "ホウ素", g: "other", p: 2, gr: 13 },
  { n: 6, s: "C", name: "炭素", g: "other", p: 2, gr: 14 },
  { n: 7, s: "N", name: "窒素", g: "other", p: 2, gr: 15 },
  { n: 8, s: "O", name: "酸素", g: "other", p: 2, gr: 16 },
  { n: 9, s: "F", name: "フッ素", g: "halogen", p: 2, gr: 17 },
  { n: 10, s: "Ne", name: "ネオン", g: "noble", p: 2, gr: 18 },
  { n: 11, s: "Na", name: "ナトリウム", g: "alkali", p: 3, gr: 1 },
  { n: 12, s: "Mg", name: "マグネシウム", g: "alkaline_earth", p: 3, gr: 2 },
  { n: 13, s: "Al", name: "アルミニウム", g: "other", p: 3, gr: 13 },
  { n: 14, s: "Si", name: "ケイ素", g: "other", p: 3, gr: 14 },
  { n: 15, s: "P", name: "リン", g: "other", p: 3, gr: 15 },
  { n: 16, s: "S", name: "硫黄", g: "other", p: 3, gr: 16 },
  { n: 17, s: "Cl", name: "塩素", g: "halogen", p: 3, gr: 17 },
  { n: 18, s: "Ar", name: "アルゴン", g: "noble", p: 3, gr: 18 },
  { n: 19, s: "K", name: "カリウム", g: "alkali", p: 4, gr: 1 },
  { n: 20, s: "Ca", name: "カルシウム", g: "alkaline_earth", p: 4, gr: 2 },
  { n: 21, s: "Sc", name: "スカンジウム", g: "transition", p: 4, gr: 3 },
  { n: 22, s: "Ti", name: "チタン", g: "transition", p: 4, gr: 4 },
  { n: 23, s: "V", name: "バナジウム", g: "transition", p: 4, gr: 5 },
  { n: 24, s: "Cr", name: "クロム", g: "transition", p: 4, gr: 6 },
  { n: 25, s: "Mn", name: "マンガン", g: "transition", p: 4, gr: 7 },
  { n: 26, s: "Fe", name: "鉄", g: "transition", p: 4, gr: 8 },
  { n: 27, s: "Co", name: "コバルト", g: "transition", p: 4, gr: 9 },
  { n: 28, s: "Ni", name: "ニッケル", g: "transition", p: 4, gr: 10 },
  { n: 29, s: "Cu", name: "銅", g: "transition", p: 4, gr: 11 },
  { n: 30, s: "Zn", name: "亜鉛", g: "transition", p: 4, gr: 12 },
  { n: 31, s: "Ga", name: "ガリウム", g: "other", p: 4, gr: 13 },
  { n: 32, s: "Ge", name: "ゲルマニウム", g: "other", p: 4, gr: 14 },
  { n: 33, s: "As", name: "ヒ素", g: "other", p: 4, gr: 15 },
  { n: 34, s: "Se", name: "セレン", g: "other", p: 4, gr: 16 },
  { n: 35, s: "Br", name: "臭素", g: "halogen", p: 4, gr: 17 },
  { n: 36, s: "Kr", name: "クリプトン", g: "noble", p: 4, gr: 18 },
  { n: 37, s: "Rb", name: "ルビジウム", g: "alkali", p: 5, gr: 1 },
  { n: 38, s: "Sr", name: "ストロンチウム", g: "alkaline_earth", p: 5, gr: 2 },
  { n: 39, s: "Y", name: "イットリウム", g: "transition", p: 5, gr: 3 },
  { n: 40, s: "Zr", name: "ジルコニウム", g: "transition", p: 5, gr: 4 },
  { n: 41, s: "Nb", name: "ニオブ", g: "transition", p: 5, gr: 5 },
  { n: 42, s: "Mo", name: "モリブデン", g: "transition", p: 5, gr: 6 },
  { n: 43, s: "Tc", name: "テクネチウム", g: "transition", p: 5, gr: 7 },
  { n: 44, s: "Ru", name: "ルテニウム", g: "transition", p: 5, gr: 8 },
  { n: 45, s: "Rh", name: "ロジウム", g: "transition", p: 5, gr: 9 },
  { n: 46, s: "Pd", name: "パラジウム", g: "transition", p: 5, gr: 10 },
  { n: 47, s: "Ag", name: "銀", g: "transition", p: 5, gr: 11 },
  { n: 48, s: "Cd", name: "カドミウム", g: "transition", p: 5, gr: 12 },
  { n: 49, s: "In", name: "インジウム", g: "other", p: 5, gr: 13 },
  { n: 50, s: "Sn", name: "スズ", g: "other", p: 5, gr: 14 },
  { n: 51, s: "Sb", name: "アンチモン", g: "other", p: 5, gr: 15 },
  { n: 52, s: "Te", name: "テルル", g: "other", p: 5, gr: 16 },
  { n: 53, s: "I", name: "ヨウ素", g: "halogen", p: 5, gr: 17 },
  { n: 54, s: "Xe", name: "キセノン", g: "noble", p: 5, gr: 18 },
  { n: 55, s: "Cs", name: "セシウム", g: "alkali", p: 6, gr: 1 },
  { n: 56, s: "Ba", name: "バリウム", g: "alkaline_earth", p: 6, gr: 2 },
  {
    isPlaceholder: true,
    targetGroup: "lanthanoid",
    s: "Ln",
    name: "ランタノイド",
    label: "57-71",
    g: "lanthanoid",
    p: 6,
    gr: 3,
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    n: 57 + i,
    g: "lanthanoid",
    p: 8,
    gr: 4 + i,
    realP: 6,
  })),
  { n: 72, s: "Hf", name: "ハフニウム", g: "transition", p: 6, gr: 4 },
  { n: 73, s: "Ta", name: "タンタル", g: "transition", p: 6, gr: 5 },
  { n: 74, s: "W", name: "タングステン", g: "transition", p: 6, gr: 6 },
  { n: 75, s: "Re", name: "レニウム", g: "transition", p: 6, gr: 7 },
  { n: 76, s: "Os", name: "オスミウム", g: "transition", p: 6, gr: 8 },
  { n: 77, s: "Ir", name: "イリジウム", g: "transition", p: 6, gr: 9 },
  { n: 78, s: "Pt", name: "白金", g: "transition", p: 6, gr: 10 },
  { n: 79, s: "Au", name: "金", g: "transition", p: 6, gr: 11 },
  { n: 80, s: "Hg", name: "水銀", g: "transition", p: 6, gr: 12 },
  { n: 81, s: "Tl", name: "タリウム", g: "other", p: 6, gr: 13 },
  { n: 82, s: "Pb", name: "鉛", g: "other", p: 6, gr: 14 },
  { n: 83, s: "Bi", name: "ビスマス", g: "other", p: 6, gr: 15 },
  { n: 84, s: "Po", name: "ポロニウム", g: "other", p: 6, gr: 16 },
  { n: 85, s: "At", name: "アスタチン", g: "halogen", p: 6, gr: 17 },
  { n: 86, s: "Rn", name: "ラドン", g: "noble", p: 6, gr: 18 },
  { n: 87, s: "Fr", name: "フランシウム", g: "alkali", p: 7, gr: 1 },
  { n: 88, s: "Ra", name: "ラジウム", g: "alkaline_earth", p: 7, gr: 2 },
  {
    isPlaceholder: true,
    targetGroup: "actinoid",
    s: "An",
    name: "アクチノイド",
    label: "89-103",
    g: "actinoid",
    p: 7,
    gr: 3,
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    n: 89 + i,
    g: "actinoid",
    p: 9,
    gr: 4 + i,
    realP: 7,
  })),
  { n: 104, s: "Rf", name: "ラザホージウム", g: "super_actinoid", p: 7, gr: 4 },
  { n: 105, s: "Db", name: "ドブニウム", g: "super_actinoid", p: 7, gr: 5 },
  { n: 106, s: "Sg", name: "シーボーギウム", g: "super_actinoid", p: 7, gr: 6 },
  { n: 107, s: "Bh", name: "ボーリウム", g: "super_actinoid", p: 7, gr: 7 },
  { n: 108, s: "Hs", name: "ハッシウム", g: "super_actinoid", p: 7, gr: 8 },
  { n: 109, s: "Mt", name: "マイトネリウム", g: "super_actinoid", p: 7, gr: 9 },
  {
    n: 110,
    s: "Ds",
    name: "ダームスタチウム",
    g: "super_actinoid",
    p: 7,
    gr: 10,
  },
  {
    n: 111,
    s: "Rg",
    name: "レントゲニウム",
    g: "super_actinoid",
    p: 7,
    gr: 11,
  },
  {
    n: 112,
    s: "Cn",
    name: "コペルニシウム",
    g: "super_actinoid",
    p: 7,
    gr: 12,
  },
  { n: 113, s: "Nh", name: "ニホニウム", g: "super_actinoid", p: 7, gr: 13 },
  { n: 114, s: "Fl", name: "フレロビウム", g: "super_actinoid", p: 7, gr: 14 },
  { n: 115, s: "Mc", name: "モスコビウム", g: "super_actinoid", p: 7, gr: 15 },
  { n: 116, s: "Lv", name: "リバモリウム", g: "super_actinoid", p: 7, gr: 16 },
  { n: 117, s: "Ts", name: "テネシン", g: "super_actinoid", p: 7, gr: 17 },
  { n: 118, s: "Og", name: "オガネソン", g: "super_actinoid", p: 7, gr: 18 },
];

const lnNames = [
  "ランタン",
  "セリウム",
  "プラセオジム",
  "ネオジム",
  "プロメチウム",
  "サマリウム",
  "ユウロピウム",
  "ガドリニウム",
  "テルビウム",
  "ジスプロシウム",
  "ホルミウム",
  "エルビウム",
  "ツリウム",
  "イッテルビウム",
  "ルテチウム",
];
const lnSyms = [
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
];
const acNames = [
  "アクチニウム",
  "トリウム",
  "プロトアクチニウム",
  "ウラン",
  "ネプツニウム",
  "プルトニウム",
  "アメリシウム",
  "キュリウム",
  "バークリウム",
  "カリホルニウム",
  "アインスタイニウム",
  "フェルミウム",
  "メンデレビウム",
  "ノーベリウム",
  "ローレンシウム",
];
const acSyms = [
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
];

const elementsData = rawElements.map((e) => {
  if (e.isPlaceholder)
    return {
      ...e,
      number: e.label,
      symbol: e.s,
      group: e.g,
      displayPeriod: e.p,
      displayGroup: e.gr,
    };
  let name = e.name;
  let symbol = e.s;
  if (e.g === "lanthanoid" && !name) {
    const idx = e.n - 57;
    name = lnNames[idx];
    symbol = lnSyms[idx];
  }
  if (e.g === "actinoid" && !name) {
    const idx = e.n - 89;
    name = acNames[idx];
    symbol = acSyms[idx];
  }
  return {
    number: e.n,
    name,
    symbol,
    group: e.g,
    displayPeriod: e.p,
    chemicalPeriod: e.realP || e.p,
    displayGroup: e.gr,
  };
});

const SERIES_LEGEND = [
  { id: "alkali", label: "アルカリ金属", color: "#ffadad" },
  { id: "alkaline_earth", label: "アルカリ土類", color: "#ffd6a5" },
  { id: "transition", label: "遷移元素", color: "#fdffb6" },
  { id: "halogen", label: "ハロゲン", color: "#caffbf" },
  { id: "noble", label: "希ガス", color: "#9bf6ff" },
  { id: "lanthanoid", label: "ランタノイド", color: "#a0c4ff" },
  { id: "actinoid", label: "アクチノイド", color: "#bdb2ff" },
  { id: "other", label: "その他", color: "#e0e0e0" },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// ヘルパー
const getStyleLabel = (style) =>
  style === "infinite" ? "エンドレスモード" : "クラシックモード";
const getModeLabel = (mode) => {
  if (mode === "nameToNum") return "名前→番号";
  if (mode === "numToSym") return "番号→記号";
  if (mode === "shuffle") return "シャッフル";
  return mode;
};

const getSymbolByNumber = (num) => {
  const found = elementsData.find((e) => e.number === num);
  return found ? found.symbol : "?";
};

const getSettingsKey = (numbers, mode, style) => {
  const sortedNums = [...numbers].sort((a, b) => a - b).join(",");
  return `${style}_${mode}_[${sortedNums}]`;
};

// --- Top Level Functions ---
const addRange = (start, end, setSelectedNumbers) => {
  const s = Math.max(1, start);
  const e = Math.min(118, end);
  if (s > e) return;
  const range = [];
  for (let i = s; i <= e; i++) range.push(i);
  setSelectedNumbers((prev) => Array.from(new Set([...prev, ...range])));
};
const removeRange = (start, end, setSelectedNumbers) => {
  const s = Math.max(1, start);
  const e = Math.min(118, end);
  if (s > e) return;
  const range = [];
  for (let i = s; i <= e; i++) range.push(i);
  setSelectedNumbers((prev) => prev.filter((n) => !range.includes(n)));
};
const selectAll = (setSelectedNumbers) =>
  setSelectedNumbers(
    elementsData.filter((e) => !e.isPlaceholder).map((e) => e.number)
  );
const clearAll = (setSelectedNumbers) => setSelectedNumbers([]);
const getElementColor = (element) => {
  if (element.group === "super_actinoid") return "#ffffff";
  const series = SERIES_LEGEND.find((s) => s.id === element.group);
  return series ? series.color : "#fff";
};

function App() {
  const [gameState, setGameState] = useState("menu");
  const [gameMode, setGameMode] = useState("nameToNum");
  const [menuTab, setMenuTab] = useState("series");
  const [playStyle, setPlayStyle] = useState("standard");
  const [menuPage, setMenuPage] = useState("settings");
  // Mobile optimization: settings toggle (default hidden on mobile, logical default false)
  const [showSettings, setShowSettings] = useState(false);

  const [historySort, setHistorySort] = useState("date");
  const [historyFilterStyle, setHistoryFilterStyle] = useState("all");
  const [historyFilterMode, setHistoryFilterMode] = useState("all");

  const [selectedNumbers, setSelectedNumbers] = useState(
    Array.from({ length: 20 }, (_, i) => i + 1)
  );
  const [manualRangeStart, setManualRangeStart] = useState(1);
  const [manualRangeEnd, setManualRangeEnd] = useState(20);
  const [customGroups, setCustomGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [isEditingInput, setIsEditingInput] = useState(false);

  const [notification, setNotification] = useState(null);
  const notificationTimerRef = useRef(null);

  const [quizQueue, setQuizQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [emptyEnterCount, setEmptyEnterCount] = useState(0);
  const emptyEnterTimerRef = useRef(null);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [missStreak, setMissStreak] = useState(0);
  const [scoreFeedback, setScoreFeedback] = useState(null);
  const [bestResult, setBestResult] = useState(null);
  const [allBestScores, setAllBestScores] = useState({});
  const [currentSettingsBest, setCurrentSettingsBest] = useState(null);
  const [newRecordFlags, setNewRecordFlags] = useState({
    score: false,
    time: false,
  });

  const [isComboBreaking, setIsComboBreaking] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [viewingHistory, setViewingHistory] = useState(null);

  const [showRetireConfirm, setShowRetireConfirm] = useState(false);
  const [modalSelection, setModalSelection] = useState("cancel");
  const [resultSelection, setResultSelection] = useState("retry");
  const [startTime, setStartTime] = useState(0);
  const [lastAnswerTime, setLastAnswerTime] = useState(0);
  const [currentTimer, setCurrentTimer] = useState("0.0");
  const [questionTimer, setQuestionTimer] = useState("0.0");
  const [wrongItems, setWrongItems] = useState([]);
  const [history, setHistory] = useState([]);

  const inputRef = useRef(null);

  const styleRefs = useRef([]);
  const modeRefs = useRef([]);
  const rangeRefs = useRef([]);
  const bulkRefs = useRef([]);
  const tabRefs = useRef([]);
  const seriesRefs = useRef([]);
  const saveRefs = useRef([]);
  const customRefs = useRef([]);
  const startBtnRef = useRef(null);
  const pageNavRefs = useRef([]);
  const historySortRefs = useRef([]);
  const historyFilterStyleRefs = useRef([]);
  const historyFilterModeRefs = useRef([]);
  const historyRowRefs = useRef([]);

  modeRefs.current = [];
  rangeRefs.current = [];
  bulkRefs.current = [];
  tabRefs.current = [];
  seriesRefs.current = [];
  saveRefs.current = [];
  customRefs.current = [];
  pageNavRefs.current = [];
  historySortRefs.current = [];
  historyFilterStyleRefs.current = [];
  historyFilterModeRefs.current = [];
  historyRowRefs.current = [];

  const addToRefs = (el, refArray, index) => {
    if (el) {
      refArray.current[index] = el;
    }
  };

  const addToRefsPush = (el, refArray) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  };

  const showToast = (message) => {
    if (notificationTimerRef.current)
      clearTimeout(notificationTimerRef.current);
    setNotification(message);
    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const triggerScoreFeedback = (val, type) => {
    setScoreFeedback({ val: (val > 0 ? "+" : "") + val, type });
    setTimeout(() => setScoreFeedback(null), 800);
  };

  const breakCombo = () => {
    if (combo > 0) {
      setIsComboBreaking(true);
      setTimeout(() => setIsComboBreaking(false), 500);
    }
    setCombo(0);
  };

  // --- Wrappers ---
  const handleAddRange = () =>
    addRange(manualRangeStart, manualRangeEnd, setSelectedNumbers);
  const handleRemoveRange = () =>
    removeRange(manualRangeStart, manualRangeEnd, setSelectedNumbers);
  const handleSelectAll = () => selectAll(setSelectedNumbers);
  const handleClearAll = () => clearAll(setSelectedNumbers);
  const handleButtonClick = (action) => (e) => {
    e.currentTarget.focus();
    action(e);
  };

  const saveCustomGroup = () => {
    if (!newGroupName.trim()) {
      showToast("グループ名はどうするの？");
      return;
    }
    if (selectedNumbers.length === 0) {
      showToast("元素が選ばれてないよ？");
      return;
    }
    const newGroup = {
      id: Date.now(),
      label: newGroupName,
      numbers: [...selectedNumbers],
    };
    setCustomGroups([...customGroups, newGroup]);
    setNewGroupName("");
    showToast(`「${newGroup.label}」を保存しました`);
    setTimeout(() => {
      const len = customRefs.current.length;
      if (len > 0) {
        customRefs.current[len - 1]?.focus();
      }
    }, 100);
  };
  const deleteCustomGroup = (id, e) => {
    e.stopPropagation();
    setCustomGroups(customGroups.filter((g) => g.id !== id));
  };
  const toggleCustomGroup = (group) => {
    const targetElements = group.numbers;
    const allSelected = targetElements.every((n) =>
      selectedNumbers.includes(n)
    );
    if (allSelected)
      setSelectedNumbers(
        selectedNumbers.filter((n) => !targetElements.includes(n))
      );
    else
      setSelectedNumbers(
        Array.from(new Set([...selectedNumbers, ...targetElements]))
      );
  };

  const toggleElement = (el) => {
    if (el.isPlaceholder) {
      const targetSeries = el.targetGroup;
      const targetElements = elementsData
        .filter((e) => e.group === targetSeries && !e.isPlaceholder)
        .map((e) => e.number);
      const allSelected = targetElements.every((n) =>
        selectedNumbers.includes(n)
      );
      if (allSelected)
        setSelectedNumbers(
          selectedNumbers.filter((n) => !targetElements.includes(n))
        );
      else
        setSelectedNumbers(
          Array.from(new Set([...selectedNumbers, ...targetElements]))
        );
      return;
    }
    if (selectedNumbers.includes(el.number))
      setSelectedNumbers(selectedNumbers.filter((n) => n !== el.number));
    else setSelectedNumbers([...selectedNumbers, el.number]);
  };

  const toggleSeries = (seriesId) => {
    const targetElements = elementsData
      .filter((e) => {
        if (e.isPlaceholder) return false;
        if (e.group === seriesId) return true;
        if (e.group === "super_actinoid") {
          if (
            seriesId === "transition" &&
            e.displayGroup >= 3 &&
            e.displayGroup <= 12
          )
            return true;
          if (seriesId === "halogen" && e.displayGroup === 17) return true;
          if (seriesId === "noble" && e.displayGroup === 18) return true;
          if (
            seriesId === "other" &&
            e.displayGroup >= 13 &&
            e.displayGroup <= 16
          )
            return true;
        }
        return false;
      })
      .map((e) => e.number);
    const allSelected = targetElements.every((n) =>
      selectedNumbers.includes(n)
    );
    if (allSelected)
      setSelectedNumbers(
        selectedNumbers.filter((n) => !targetElements.includes(n))
      );
    else
      setSelectedNumbers(
        Array.from(new Set([...selectedNumbers, ...targetElements]))
      );
  };

  const toggleGroupColumn = (gr) => {
    let targetElements = elementsData
      .filter((e) => e.displayGroup === gr && !e.isPlaceholder)
      .filter((e) => {
        if (["lanthanoid", "actinoid"].includes(e.group) && gr !== 3)
          return false;
        return true;
      })
      .map((e) => e.number);
    if (gr === 3) {
      const ln = elementsData
        .filter((e) => e.group === "lanthanoid" && !e.isPlaceholder)
        .map((e) => e.number);
      const an = elementsData
        .filter((e) => e.group === "actinoid" && !e.isPlaceholder)
        .map((e) => e.number);
      targetElements = [...targetElements, ...ln, ...an];
    }
    const allSelected = targetElements.every((n) =>
      selectedNumbers.includes(n)
    );
    if (allSelected)
      setSelectedNumbers(
        selectedNumbers.filter((n) => !targetElements.includes(n))
      );
    else
      setSelectedNumbers(
        Array.from(new Set([...selectedNumbers, ...targetElements]))
      );
  };

  const togglePeriod = (p) => {
    const targetElements = elementsData
      .filter((e) => e.chemicalPeriod === p && !e.isPlaceholder)
      .map((e) => e.number);
    const allSelected = targetElements.every((n) =>
      selectedNumbers.includes(n)
    );
    if (allSelected)
      setSelectedNumbers(
        selectedNumbers.filter((n) => !targetElements.includes(n))
      );
    else
      setSelectedNumbers(
        Array.from(new Set([...selectedNumbers, ...targetElements]))
      );
  };

  // --- Game Control ---
  const finishGame = (finalScore, finalMaxCombo, finalTime, isRetired) => {
    const timeNum = parseFloat(finalTime);
    const settingsKey = getSettingsKey(selectedNumbers, gameMode, playStyle);

    const newRecord = {
      date: new Date().toLocaleString(),
      mode: gameMode,
      style: playStyle,
      score: finalScore,
      maxCombo: finalMaxCombo,
      time: finalTime,
      isRetired: isRetired,
      selectedNumbers: [...selectedNumbers],
    };
    const newHistoryList = [newRecord, ...gameHistory].slice(0, 50);
    setGameHistory(newHistoryList);
    localStorage.setItem(
      "periodic_game_history",
      JSON.stringify(newHistoryList)
    );

    setNewRecordFlags({ score: false, time: false });

    if (!isRetired) {
      const prevBest = allBestScores[settingsKey];
      let newFlags = { score: false, time: false };
      let shouldUpdate = false;

      if (!prevBest) {
        newFlags = { score: true, time: true };
        shouldUpdate = true;
      } else {
        const bestT = parseFloat(prevBest.time || "99999");
        if (finalScore > prevBest.score) {
          newFlags.score = true;
          shouldUpdate = true;
        }
        if (finalScore >= prevBest.score && timeNum < bestT) {
          newFlags.time = true;
          shouldUpdate = true;
        }
      }

      if (shouldUpdate) {
        const recordToSave = {
          score: finalScore,
          maxCombo: finalMaxCombo,
          time: finalTime,
        };
        const updatedBests = { ...allBestScores, [settingsKey]: recordToSave };

        setAllBestScores(updatedBests);
        setCurrentSettingsBest(recordToSave);
        setNewRecordFlags(newFlags);
        localStorage.setItem(
          "periodic_best_scores_v2",
          JSON.stringify(updatedBests)
        );
      } else {
        setCurrentSettingsBest(prevBest);
      }
    }
  };

  const startGame = () => {
    if (selectedNumbers.length === 0) {
      showToast("なんの元素も選ばれてないよ！");
      return;
    }

    const settingsKey = getSettingsKey(selectedNumbers, gameMode, playStyle);
    setCurrentSettingsBest(allBestScores[settingsKey] || null);
    setNewRecordFlags({ score: false, time: false });

    // Queue generation logic
    const filtered = elementsData.filter(
      (el) => !el.isPlaceholder && selectedNumbers.includes(el.number)
    );
    let initialQueue = [];
    if (playStyle === "infinite") {
      const firstQ = filtered[Math.floor(Math.random() * filtered.length)];
      initialQueue = [firstQ];
    } else {
      initialQueue = shuffleArray(filtered);
    }
    const queueWithTypes = initialQueue.map((el) => ({
      ...el,
      questionType:
        gameMode === "shuffle"
          ? Math.random() > 0.5
            ? "nameToNum"
            : "numToSym"
          : gameMode,
    }));
    setQuizQueue(queueWithTypes);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setMissStreak(0);
    setCurrentIndex(0);
    setUserGuess("");
    setIsError(false);
    setIsSkipping(false);
    setEmptyEnterCount(0);
    setWrongItems([]);
    setHistory([]);
    setShowRetireConfirm(false);
    setCurrentTimer("0.0");

    // Direct start with loading screen
    setGameState("loading");
    setTimeout(() => {
      startRealGame();
    }, 1000);
  };

  const startRealGame = () => {
    const now = Date.now();
    setStartTime(now);
    setLastAnswerTime(now);
    setGameState("playing");
  };

  const moveToNextQuestion = () => {
    setEmptyEnterCount(0);
    if (emptyEnterTimerRef.current) clearTimeout(emptyEnterTimerRef.current);
    if (playStyle === "infinite") {
      const candidates = elementsData.filter(
        (el) => !el.isPlaceholder && selectedNumbers.includes(el.number)
      );
      const currentElement = quizQueue[currentIndex];
      let nextElement;
      if (candidates.length > 1) {
        const filteredCandidates = candidates.filter(
          (c) => c.number !== currentElement.number
        );
        nextElement =
          filteredCandidates[
          Math.floor(Math.random() * filteredCandidates.length)
          ];
      } else {
        nextElement = candidates[0];
      }
      const nextQType =
        gameMode === "shuffle"
          ? Math.random() > 0.5
            ? "nameToNum"
            : "numToSym"
          : gameMode;
      const nextItem = { ...nextElement, questionType: nextQType };
      setQuizQueue((prev) => [...prev, nextItem]);
      setCurrentIndex(currentIndex + 1);
      setUserGuess("");
      setIsError(false);
      setIsSkipping(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 0);
      return;
    }
    if (currentIndex + 1 < quizQueue.length) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess("");
      setIsError(false);
      setIsSkipping(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 0);
    } else {
      setGameState("finished");
      finishGame(score, maxCombo, currentTimer, false);
    }
  };

  const resetGame = () => {
    setGameState("menu");
    setResultSelection("retry");
  };
  const handleRetireClick = () => {
    setModalSelection("cancel");
    setShowRetireConfirm(true);
  };
  const cancelRetire = () => {
    setShowRetireConfirm(false);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };
  const confirmRetire = () => {
    finishGame(score, maxCombo, currentTimer, true);
    setShowRetireConfirm(false);
    setGameState("finished");
    setResultSelection("retry");
  };
  const retryFromResult = () => {
    startGame();
  };
  const retryFromModal = () => {
    setShowRetireConfirm(false);
    startGame();
  };

  const handleSkip = () => {
    if (isSkipping) return;
    if (emptyEnterTimerRef.current) clearTimeout(emptyEnterTimerRef.current);
    setEmptyEnterCount(0);
    const currentElement = quizQueue[currentIndex];
    const now = Date.now();
    const lapTime = (now - lastAnswerTime) / 1000;
    breakCombo();
    setMissStreak(0);
    setHistory((prev) => [
      ...prev,
      {
        element: currentElement,
        timeTaken: lapTime,
        isSkipped: true,
        scoreDelta: 0,
      },
    ]);
    if (!wrongItems.some((item) => item.number === currentElement.number))
      setWrongItems([...wrongItems, currentElement]);
    setIsSkipping(true);
    const qType = currentElement.questionType || gameMode;
    const correctVal =
      qType === "nameToNum" ? currentElement.number : currentElement.symbol;
    setUserGuess(correctVal);
    setLastAnswerTime(now);
    setTimeout(() => {
      moveToNextQuestion();
      setLastAnswerTime(Date.now());
    }, 1500);
  };

  const handleKeyboardInput = (char) => {
    if (isSkipping || showRetireConfirm) return;

    // Auto-formatting for symbol input (numToSym)
    // Logic: 1st char Upper, rest Lower
    const currentElement = quizQueue[currentIndex];
    const qType = currentElement ? (currentElement.questionType || gameMode) : gameMode;

    if (qType === "numToSym") {
      setUserGuess((prev) => {
        const next = prev + char;
        if (next.length === 1) return next.toUpperCase();
        // If prev was empty, char becomes Upper. 
        // But here we are appending. So if prev is empty, it means this is 1st char.
        // If prev is not empty, it is 2nd+ char.
        return prev + char.toLowerCase();
      });
    } else {
      setUserGuess((prev) => prev + char);
    }
  };

  const handleKeyboardDelete = () => {
    if (isSkipping || showRetireConfirm) return;
    setUserGuess((prev) => prev.slice(0, -1));
  };

  const handleKeyboardEnter = (e) => {
    if (isSkipping || showRetireConfirm) return;
    handleCheck(e || { preventDefault: () => { } });
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (isSkipping || showRetireConfirm) return;
    if (userGuess.trim() === "") {
      if (emptyEnterTimerRef.current) clearTimeout(emptyEnterTimerRef.current);
      const newCount = emptyEnterCount + 1;
      setEmptyEnterCount(newCount);
      if (newCount >= 3) {
        handleSkip();
      } else {
        emptyEnterTimerRef.current = setTimeout(() => {
          setEmptyEnterCount(0);
        }, 1000);
      }
      return;
    }
    setEmptyEnterCount(0);
    if (emptyEnterTimerRef.current) clearTimeout(emptyEnterTimerRef.current);
    const currentElement = quizQueue[currentIndex];
    const qType = currentElement.questionType || gameMode;
    let isCorrect = false;
    if (qType === "nameToNum") {
      const guessNum = parseInt(userGuess, 10);
      isCorrect = guessNum === currentElement.number;
    } else {
      const cleanGuess = userGuess.trim().toLowerCase();
      const cleanSymbol = currentElement.symbol.toLowerCase();
      isCorrect = cleanGuess === cleanSymbol;
    }
    if (isCorrect) {
      const now = Date.now();
      const lapTime = (now - lastAnswerTime) / 1000;
      let newCombo = combo;
      if (lapTime > 3.0) {
        breakCombo();
        newCombo = 1;
      } else {
        newCombo += 1;
      }
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setMissStreak(0);
      const baseScore = 60;
      let timeBonus = 0;
      if (lapTime < 4.0) {
        const ratio = 1 - lapTime / 4.0;
        timeBonus = Math.floor(36 * ratio * ratio);
      }
      const cleanBonus = !isError ? 20 : 0;
      const comboMultiplier = 1 + newCombo * 0.1;
      const gain = Math.floor(
        (baseScore + timeBonus + cleanBonus) * comboMultiplier
      );
      const nextScore = score + gain;
      setScore(nextScore);
      triggerScoreFeedback(gain, "gain");
      setHistory((prev) => [
        ...prev,
        {
          element: currentElement,
          timeTaken: lapTime,
          isSkipped: false,
          scoreDelta: gain,
        },
      ]);
      setLastAnswerTime(now);
      if (playStyle !== "infinite" && currentIndex + 1 >= quizQueue.length) {
        setGameState("finished");
        const totalTimeFinish = ((now - startTime) / 1000).toFixed(1);
        finishGame(nextScore, maxCombo, totalTimeFinish, false);
      } else {
        moveToNextQuestion();
      }
    } else {
      setIsError(true);
      setUserGuess("");
      if (!wrongItems.some((item) => item.number === currentElement.number))
        setWrongItems([...wrongItems, currentElement]);
      const nextMissStreak = missStreak + 1;
      setMissStreak(nextMissStreak);
      breakCombo();
      const penalty = Math.floor(60 * Math.pow(1.3, nextMissStreak - 1));
      setScore((s) => Math.max(0, s - penalty));
      triggerScoreFeedback(-penalty, "loss");
    }
  };

  // --- Effects ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem("periodic_custom_groups");
      const superActinoid = {
        id: "default_super",
        label: "超アクチノイド",
        numbers: Array.from({ length: 15 }, (_, i) => 104 + i),
      };
      if (saved) {
        let parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) parsed = [];
        if (!parsed.some((g) => g.id === "default_super"))
          parsed = [superActinoid, ...parsed];
        setCustomGroups(parsed);
      } else {
        setCustomGroups([superActinoid]);
      }
      const savedBestsV2 = localStorage.getItem("periodic_best_scores_v2");
      if (savedBestsV2) setAllBestScores(JSON.parse(savedBestsV2));

      const savedHistory = localStorage.getItem("periodic_game_history");
      if (savedHistory) setGameHistory(JSON.parse(savedHistory));
    } catch (e) {
      setCustomGroups([
        {
          id: "default_super",
          label: "超アクチノイド",
          numbers: Array.from({ length: 15 }, (_, i) => 104 + i),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "periodic_custom_groups",
        JSON.stringify(customGroups)
      );
    } catch (e) { }
  }, [customGroups]);

  useEffect(() => {
    let interval;
    if (gameState === "playing" && !isSkipping) {
      interval = setInterval(() => {
        const now = Date.now();
        const totalElapsed = ((now - startTime) / 1000).toFixed(1);
        const qElapsed = ((now - lastAnswerTime) / 1000).toFixed(1);
        setCurrentTimer(totalElapsed);
        setQuestionTimer(qElapsed);

        if (parseFloat(qElapsed) > 3.0) {
          setCombo((prev) => (prev > 0 ? 0 : prev));
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime, lastAnswerTime, isSkipping]);

  useEffect(() => {
    if (gameState === "menu") {
      if (menuPage === "settings") {
        pageNavRefs.current[0]?.focus();
      } else {
        pageNavRefs.current[1]?.focus(); // Index fixed
      }
    }
  }, [menuPage, gameState]);

  useEffect(() => {
    const handleModalKey = (e) => {
      if (viewingHistory) {
        if (e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          setViewingHistory(null);
        }
      }
    };
    window.addEventListener("keydown", handleModalKey, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleModalKey, { capture: true });
  }, [viewingHistory]);

  const handleMenuKeyDown = (e) => {
    if (gameState !== "menu") return;
    if (viewingHistory) return;

    const active = document.activeElement;
    if (!active) return;

    const allGroups = [
      pageNavRefs.current, // 0
      styleRefs.current, // 1
      modeRefs.current, // 2
      rangeRefs.current, // 3
      bulkRefs.current, // 4
      tabRefs.current, // 5
      seriesRefs.current, // 6
      saveRefs.current, // 7
      customRefs.current, // 8
      [startBtnRef.current], // 9
      historyFilterStyleRefs.current, // 10
      historyFilterModeRefs.current, // 11
      historySortRefs.current, // 12
      historyRowRefs.current, // 13
    ];

    let activeGroupIndices = [0];
    if (menuPage === "settings") {
      activeGroupIndices.push(1, 2, 3, 4, 5);
      if (menuTab === "series") activeGroupIndices.push(6);
      else activeGroupIndices.push(7, 8);
      activeGroupIndices.push(9);
    } else {
      activeGroupIndices.push(10, 11, 12);
      if (gameHistory.length > 0) activeGroupIndices.push(13);
    }

    activeGroupIndices = activeGroupIndices.filter(
      (idx) => allGroups[idx] && allGroups[idx].length > 0 && allGroups[idx][0]
    );

    let currentGroupIndex = -1;
    let currentItemIndex = -1;
    for (let i = 0; i < allGroups.length; i++) {
      if (allGroups[i].includes(active)) {
        currentGroupIndex = i;
        currentItemIndex = allGroups[i].indexOf(active);
        break;
      }
    }

    if (currentGroupIndex === -1) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        pageNavRefs.current[0]?.focus();
      }
      return;
    }

    // --- Esc Key: Return to Start Button ---
    if (e.key === "Escape") {
      e.preventDefault();
      if (active.tagName === "INPUT") {
        setIsEditingInput(false);
        active.select();
        return;
      }
      if (menuPage === "settings") {
        startBtnRef.current?.focus();
      } else {
        setMenuPage("settings");
        // Wait for slide/render, but focus is possible as DOM exists
        setTimeout(() => startBtnRef.current?.focus(), 50);
      }
      return;
    }

    if (currentGroupIndex === 0) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setMenuPage((prev) => (prev === "settings" ? "history" : "settings"));
        return;
      }
    }

    // Select Box Focus Logic
    if (currentGroupIndex === 10) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        allGroups[11][0]?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        allGroups[12][0]?.focus();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        pageNavRefs.current[1]?.focus();
        return;
      }
      if (e.key === "ArrowLeft") return;
    }
    if (currentGroupIndex === 11) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        allGroups[10][0]?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        allGroups[12][2]?.focus();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        pageNavRefs.current[1]?.focus();
        return;
      }
      if (e.key === "ArrowRight") return;
    }

    // Sort Tabs
    if (currentGroupIndex === 12) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : 2;
        const nextIndex = (currentItemIndex + dir) % 3;
        allGroups[12][nextIndex]?.focus();
        setHistorySort(
          nextIndex === 0 ? "date" : nextIndex === 1 ? "score" : "efficiency"
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentItemIndex === 0) allGroups[10][0]?.focus();
        else allGroups[11][0]?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (gameHistory.length > 0) allGroups[13][0]?.focus();
        return;
      }
    }

    // History Rows
    if (currentGroupIndex === 13) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(currentItemIndex + 1, allGroups[13].length - 1);
        allGroups[13][next]?.focus();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentItemIndex === 0) {
          allGroups[12][0]?.focus();
        } else {
          allGroups[13][currentItemIndex - 1]?.focus();
        }
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        setViewingHistory(gameHistory[currentItemIndex]);
        return;
      }
      return;
    }

    // Default Settings Page Logic
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (active.tagName === "INPUT") return;
      e.preventDefault();

      if (currentGroupIndex === 1) {
        const nextIndex = (currentItemIndex + 1) % 2;
        allGroups[1][nextIndex]?.focus();
        // Manual selection
        return;
      }
      if (currentGroupIndex === 2) {
        const dir = e.key === "ArrowRight" ? 1 : 2;
        const nextIndex = (currentItemIndex + dir) % 3;
        allGroups[2][nextIndex]?.focus();
        return;
      }
      if (currentGroupIndex === 5) {
        const nextIndex = (currentItemIndex + 1) % 2;
        allGroups[5][nextIndex]?.focus();
        return;
      }

      const group = allGroups[currentGroupIndex];
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (currentItemIndex + dir + group.length) % group.length;
      group[next]?.focus();
      return;
    }

    const currentLogicalIndex = activeGroupIndices.indexOf(currentGroupIndex);

    if (e.key === "ArrowDown") {
      if (active.tagName === "INPUT") return;
      e.preventDefault();

      if (currentGroupIndex === 10 || currentGroupIndex === 11) return;

      if (currentLogicalIndex < activeGroupIndices.length - 1) {
        const nextGroupIndex = activeGroupIndices[currentLogicalIndex + 1];

        // Focus targeting
        if (nextGroupIndex === 1) {
          const target =
            playStyle === "standard" ? allGroups[1][0] : allGroups[1][1];
          target?.focus();
        } else if (nextGroupIndex === 2) {
          let idx = 0;
          if (gameMode === "numToSym") idx = 1;
          if (gameMode === "shuffle") idx = 2;
          allGroups[2][idx]?.focus();
        } else if (nextGroupIndex === 5) {
          const target =
            menuTab === "series" ? allGroups[5][0] : allGroups[5][1];
          target?.focus();
        } else if (currentGroupIndex === 2 && nextGroupIndex === 3) {
          allGroups[3][2]?.focus();
        } else if (currentGroupIndex === 5 && nextGroupIndex === 7) {
          allGroups[7][1]?.focus();
        } else {
          allGroups[nextGroupIndex][0]?.focus();
        }
      } else {
        const firstGroupIndex = activeGroupIndices[0];
        allGroups[firstGroupIndex][0]?.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (active.tagName === "INPUT") return;
      e.preventDefault();

      if (currentLogicalIndex > 0) {
        const prevGroupIndex = activeGroupIndices[currentLogicalIndex - 1];

        if (prevGroupIndex === 0) {
          if (menuPage === "settings") pageNavRefs.current[0]?.focus();
          else pageNavRefs.current[1]?.focus();
          return;
        }

        if (prevGroupIndex === 1) {
          const targetBtn =
            playStyle === "standard" ? allGroups[1][0] : allGroups[1][1];
          targetBtn?.focus();
          return;
        }
        if (prevGroupIndex === 2) {
          let idx = 0;
          if (gameMode === "numToSym") idx = 1;
          if (gameMode === "shuffle") idx = 2;
          allGroups[2][idx]?.focus();
          return;
        }
        if (prevGroupIndex === 5) {
          const targetBtn =
            menuTab === "series" ? allGroups[5][0] : allGroups[5][1];
          targetBtn?.focus();
          return;
        }

        const targetGroup = allGroups[prevGroupIndex];
        targetGroup[targetGroup.length - 1]?.focus();
      } else {
        const lastGroupIndex =
          activeGroupIndices[activeGroupIndices.length - 1];
        allGroups[lastGroupIndex][0]?.focus();
      }
    }

    if (e.key === "Enter") {
      if (active.tagName === "INPUT") {
        e.preventDefault();
        if (currentGroupIndex === 3) {
          if (currentItemIndex === 0) {
            allGroups[3][1]?.focus();
          } else if (currentItemIndex === 1) {
            allGroups[3][2]?.focus();
          } else active.click();
        } else if (currentGroupIndex === 7) {
          saveCustomGroup();
        }
        setIsEditingInput(false);
      } else if (active.tagName !== "SELECT" && active.tagName !== "TR") {
        e.preventDefault();

        if (currentGroupIndex === 1) {
          setPlayStyle(currentItemIndex === 0 ? "standard" : "infinite");
        } else if (currentGroupIndex === 2) {
          setGameMode(
            currentItemIndex === 0
              ? "nameToNum"
              : currentItemIndex === 1
                ? "numToSym"
                : "shuffle"
          );
        } else if (currentGroupIndex === 5) {
          setMenuTab(currentItemIndex === 0 ? "series" : "custom");
        } else {
          active.click();
        }
      }
    }
  };

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (showRetireConfirm) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          if (e.key === "ArrowDown") {
            if (modalSelection === "cancel") setModalSelection("retry");
            else if (modalSelection === "retry") setModalSelection("confirm");
            else setModalSelection("cancel");
          } else {
            if (modalSelection === "confirm") setModalSelection("retry");
            else if (modalSelection === "retry") setModalSelection("cancel");
            else setModalSelection("confirm");
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (modalSelection === "confirm") confirmRetire();
          else if (modalSelection === "retry") retryFromModal();
          else cancelRetire();
        } else if (e.key === "Escape") cancelRetire();
        else if (e.key.toLowerCase() === "r") retryFromModal();
        return;
      }

      if (gameState === "menu") {
        handleMenuKeyDown(e);
        return;
      }
      if (gameState === "playing") {
        if (e.key === "Escape") handleRetireClick();
      }
      if (gameState === "finished") {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          setResultSelection((prev) => (prev === "retry" ? "menu" : "retry"));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (resultSelection === "retry") startGame();
          else resetGame();
        }
      }

      if (gameState === "ready") {
        if (e.key === "Enter") startRealGame();
        if (e.key === "Escape") setGameState("menu");
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [
    gameState,
    showRetireConfirm,
    modalSelection,
    resultSelection,
    isEditingInput,
    manualRangeStart,
    manualRangeEnd,
    selectedNumbers,
    gameMode,
    newGroupName,
    menuTab,
    playStyle,
    menuPage,
    historySort,
    historyFilterStyle,
    historyFilterMode,
    viewingHistory,
  ]);

  const getSortedHistory = () => {
    let filtered = gameHistory.filter((rec) => {
      if (historyFilterStyle !== "all" && rec.style !== historyFilterStyle)
        return false;
      if (historyFilterMode !== "all" && rec.mode !== historyFilterMode)
        return false;
      return true;
    });

    if (historySort === "date") return filtered.slice(0, 20);
    if (historySort === "score")
      return filtered
        .filter((r) => !r.isRetired)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
    if (historySort === "efficiency") {
      return filtered
        .filter((r) => !r.isRetired)
        .sort((a, b) => {
          const effA = a.score / Math.max(1, parseFloat(a.time));
          const effB = b.score / Math.max(1, parseFloat(b.time));
          return effB - effA;
        })
        .slice(0, 20);
    }
    return filtered.slice(0, 20);
  };

  const currentElement =
    gameState === "playing" && quizQueue.length > 0
      ? quizQueue[currentIndex]
      : null;
  const currentQType = currentElement
    ? currentElement.questionType || gameMode
    : gameMode;

  if (gameState === "menu") {
    const displayHistory = getSortedHistory();
    historyRowRefs.current = [];

    return (
      <div className="app-container large-container">
        <h1>ガチエレメント</h1>
        {notification && (
          <div className="notification-toast">{notification}</div>
        )}
        <div className="menu-wrapper">
          <div className="page-nav">
            <button
              ref={(el) => addToRefs(el, pageNavRefs, 0)}
              className="nav-arrow"
              onClick={() => setMenuPage("settings")}
            >
              ◀ 設定
            </button>
            <span className="nav-divider">|</span>
            <button
              ref={(el) => addToRefs(el, pageNavRefs, 1)}
              className="nav-arrow"
              onClick={() => setMenuPage("history")}
            >
              履歴 ▶
            </button>
          </div>

          <div
            className="menu-slider"
            style={{
              transform: `translateX(${menuPage === "settings" ? "0%" : "-50%"
                })`,
            }}
          >
            <div className="menu-slide">
              <div className="card menu-card">
                <div className="mode-select">
                  <p>出題設定</p>
                  <div
                    className="mode-buttons"
                    style={{ marginBottom: "10px" }}
                  >
                    <button
                      ref={(el) => addToRefs(el, styleRefs, 0)}
                      className={playStyle === "standard" ? "active" : ""}
                      onClick={handleButtonClick(() =>
                        setPlayStyle("standard")
                      )}
                    >
                      クラシックモード
                    </button>
                    <button
                      ref={(el) => addToRefs(el, styleRefs, 1)}
                      className={playStyle === "infinite" ? "active" : ""}
                      onClick={handleButtonClick(() =>
                        setPlayStyle("infinite")
                      )}
                    >
                      エンドレスモード
                    </button>
                  </div>
                  <div className="mode-buttons">
                    <button
                      ref={(el) => addToRefs(el, modeRefs, 0)}
                      className={gameMode === "nameToNum" ? "active" : ""}
                      onClick={handleButtonClick(() =>
                        setGameMode("nameToNum")
                      )}
                    >
                      名前 → 番号
                    </button>
                    <button
                      ref={(el) => addToRefs(el, modeRefs, 1)}
                      className={gameMode === "numToSym" ? "active" : ""}
                      onClick={handleButtonClick(() => setGameMode("numToSym"))}
                    >
                      番号 → 記号
                    </button>
                    <button
                      ref={(el) => addToRefs(el, modeRefs, 2)}
                      className={gameMode === "shuffle" ? "active" : ""}
                      onClick={handleButtonClick(() => setGameMode("shuffle"))}
                    >
                      シャッフル
                    </button>
                  </div>
                </div>

                {/* Mobile Settings Toggle */}
                <button
                  className="settings-toggle-btn"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {showSettings ? "設定を隠す ▲" : "設定を表示 ▼"}
                </button>

                <div className={`table-selection-section ${showSettings ? "open" : "closed"}`}>
                  <div className="range-content">
                    <div className="manual-range-input">
                      <span>番号範囲:</span>
                      <input
                        ref={(el) => addToRefs(el, rangeRefs, 0)}
                        type="number"
                        min="1"
                        max="118"
                        value={manualRangeStart}
                        onChange={(e) =>
                          setManualRangeStart(Number(e.target.value))
                        }
                        onFocus={(e) => {
                          e.target.select();
                          setIsEditingInput(false);
                        }}
                        onBlur={() => setIsEditingInput(false)}
                      />
                      <span> 〜 </span>
                      <input
                        ref={(el) => addToRefs(el, rangeRefs, 1)}
                        type="number"
                        min="1"
                        max="118"
                        value={manualRangeEnd}
                        onChange={(e) =>
                          setManualRangeEnd(Number(e.target.value))
                        }
                        onFocus={(e) => {
                          e.target.select();
                          setIsEditingInput(false);
                        }}
                        onBlur={() => setIsEditingInput(false)}
                      />
                      <button
                        ref={(el) => addToRefs(el, rangeRefs, 2)}
                        onClick={handleButtonClick(handleAddRange)}
                        className="sm-btn add-btn"
                      >
                        追加
                      </button>
                      <button
                        ref={(el) => addToRefs(el, rangeRefs, 3)}
                        onClick={handleButtonClick(handleRemoveRange)}
                        className="sm-btn remove-btn"
                      >
                        除外
                      </button>
                    </div>
                    <div className="bulk-actions">
                      <button
                        ref={(el) => addToRefs(el, bulkRefs, 0)}
                        onClick={handleButtonClick(handleSelectAll)}
                        className="sm-btn"
                      >
                        全選択
                      </button>
                      <button
                        ref={(el) => addToRefs(el, bulkRefs, 1)}
                        onClick={handleButtonClick(handleClearAll)}
                        className="sm-btn"
                      >
                        全解除
                      </button>
                    </div>
                  </div>
                  <div className="menu-tabs">
                    <button
                      ref={(el) => addToRefs(el, tabRefs, 0)}
                      className={menuTab === "series" ? "tab-active" : ""}
                      onClick={handleButtonClick(() => setMenuTab("series"))}
                    >
                      系列から選ぶ
                    </button>
                    <button
                      ref={(el) => addToRefs(el, tabRefs, 1)}
                      className={menuTab === "custom" ? "tab-active" : ""}
                      onClick={handleButtonClick(() => setMenuTab("custom"))}
                    >
                      ユーザー定義範囲
                    </button>
                  </div>
                  <div className="slide-wrapper">
                    <div
                      className={`slide-container ${menuTab === "custom" ? "slide-left" : ""
                        }`}
                    >
                      <div className="slide-page">
                        <div className="series-legend">
                          {SERIES_LEGEND.map((s) => (
                            <button
                              key={s.id}
                              ref={(el) => addToRefsPush(el, seriesRefs)}
                              className="legend-btn"
                              style={{ backgroundColor: s.color }}
                              onClick={handleButtonClick(() =>
                                toggleSeries(s.id)
                              )}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="slide-page">
                        <div className="save-group-section">
                          <input
                            ref={(el) => addToRefs(el, saveRefs, 0)}
                            type="text"
                            placeholder="名前をつけて保存"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            className="save-input"
                            onFocus={() => setIsEditingInput(false)}
                            onBlur={() => setIsEditingInput(false)}
                          />
                          <button
                            ref={(el) => addToRefs(el, saveRefs, 1)}
                            onClick={handleButtonClick(saveCustomGroup)}
                            className="sm-btn save-btn"
                          >
                            保存
                          </button>
                        </div>
                        <div className="custom-groups-list">
                          {customGroups.map((g) => (
                            <div key={g.id} className="custom-group-item">
                              <button
                                ref={(el) => addToRefsPush(el, customRefs)}
                                className="legend-btn custom-btn"
                                onClick={handleButtonClick(() =>
                                  toggleCustomGroup(g)
                                )}
                              >
                                {g.label} ({g.numbers.length})
                              </button>
                              <span
                                className="delete-icon"
                                onClick={(e) => deleteCustomGroup(g.id, e)}
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="periodic-table-wrapper">
                    <div className="periodic-table-grid">
                      {Array.from({ length: 18 }, (_, i) => i + 1).map((g) => (
                        <div
                          key={`g-${g}`}
                          className="group-header"
                          style={{ gridColumn: g + 1, gridRow: 1 }}
                          onClick={() => toggleGroupColumn(g)}
                        >
                          {g}
                        </div>
                      ))}
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((p) => (
                        <div
                          key={`p-${p}`}
                          className="period-header"
                          style={{ gridColumn: 1, gridRow: p + 1 }}
                          onClick={() => togglePeriod(p)}
                        >
                          {p}
                        </div>
                      ))}
                      {elementsData.map((el) => {
                        let isSelected = false;
                        if (el.isPlaceholder) {
                          const targetSeries = el.targetGroup;
                          const targetElements = elementsData
                            .filter(
                              (e) =>
                                e.group === targetSeries && !e.isPlaceholder
                            )
                            .map((e) => e.number);
                          isSelected = targetElements.every((n) =>
                            selectedNumbers.includes(n)
                          );
                        } else {
                          isSelected = selectedNumbers.includes(el.number);
                        }
                        return (
                          <div
                            key={el.number || el.label}
                            className={`element-cell ${isSelected ? "selected" : ""
                              }`}
                            style={{
                              gridColumn: el.displayGroup + 1,
                              gridRow: el.displayPeriod + 1,
                              backgroundColor: isSelected
                                ? getElementColor(el)
                                : "#f0f0f0",
                              opacity: isSelected ? 1 : 0.4,
                            }}
                            onClick={() => toggleElement(el)}
                            title={el.name}
                          >
                            <div className="cell-num">{el.number}</div>
                            <div className="cell-sym">{el.symbol}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  ref={startBtnRef}
                  onClick={handleButtonClick(startGame)}
                  className="start-btn"
                >
                  スタート
                </button>
              </div>
            </div>

            <div className="menu-slide">
              <div className="card menu-card history-card">
                <h2 style={{ marginBottom: "15px" }}>クリア履歴</h2>
                <div className="filter-controls">
                  <div className="filter-group">
                    <label>モード:</label>
                    <select
                      ref={(el) => addToRefs(el, historyFilterStyleRefs, 0)}
                      value={historyFilterStyle}
                      onChange={(e) => setHistoryFilterStyle(e.target.value)}
                    >
                      <option value="all">すべて</option>
                      <option value="standard">クラシック</option>
                      <option value="infinite">エンドレス</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>形式:</label>
                    <select
                      ref={(el) => addToRefs(el, historyFilterModeRefs, 0)}
                      value={historyFilterMode}
                      onChange={(e) => setHistoryFilterMode(e.target.value)}
                    >
                      <option value="all">すべて</option>
                      <option value="nameToNum">名前→番号</option>
                      <option value="numToSym">番号→記号</option>
                      <option value="shuffle">シャッフル</option>
                    </select>
                  </div>
                </div>

                <div className="sort-tabs">
                  <button
                    ref={(el) => addToRefs(el, historySortRefs, 0)}
                    className={historySort === "date" ? "sort-active" : ""}
                    onClick={handleButtonClick(() => setHistorySort("date"))}
                  >
                    日付順
                  </button>
                  <button
                    ref={(el) => addToRefs(el, historySortRefs, 1)}
                    className={historySort === "score" ? "sort-active" : ""}
                    onClick={handleButtonClick(() => setHistorySort("score"))}
                  >
                    スコア順
                  </button>
                  <button
                    ref={(el) => addToRefs(el, historySortRefs, 2)}
                    className={
                      historySort === "efficiency" ? "sort-active" : ""
                    }
                    onClick={handleButtonClick(() =>
                      setHistorySort("efficiency")
                    )}
                  >
                    効率順
                  </button>
                </div>

                <div className="history-list-wrapper">
                  <table className="record-table">
                    <thead>
                      <tr>
                        <th>日時</th>
                        <th>設定</th>
                        <th>スコア</th>
                        <th>効率</th>
                        <th>タイム</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayHistory.length === 0 && (
                        <tr>
                          <td colSpan="5" className="no-data">
                            履歴がありません
                          </td>
                        </tr>
                      )}
                      {displayHistory.map((rec, i) => (
                        <tr
                          key={i}
                          ref={(el) => addToRefsPush(el, historyRowRefs)}
                          tabIndex="0"
                          className={rec.isRetired ? "row-retired" : ""}
                          onClick={() => setViewingHistory(rec)}
                          style={{ cursor: "pointer" }}
                        >
                          <td className="rec-date">
                            {rec.date.split(" ")[0]}
                            <br />
                            {rec.date.split(" ")[1]}
                          </td>
                          <td className="rec-mode">
                            <span className="mode-badge">
                              {getStyleLabel(rec.style)}
                            </span>
                            <br />
                            <span className="type-badge">
                              {getModeLabel(rec.mode)}
                            </span>
                          </td>
                          <td className="rec-score">{rec.score}</td>
                          <td className="rec-pps">
                            {Math.floor(
                              rec.score / Math.max(1, parseFloat(rec.time))
                            )}{" "}
                            <span style={{ fontSize: "0.7em" }}>points/s</span>
                          </td>
                          <td className="rec-time">{rec.time}s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>



          {
            viewingHistory && (
              <div
                className="modal-overlay"
                onClick={() => setViewingHistory(null)}
              >
                <div
                  className="modal-content history-detail-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3>プレイ詳細</h3>
                  {viewingHistory.isRetired && (
                    <div className="retired-badge">RETIRED</div>
                  )}
                  <div className="detail-row">
                    <span>日時:</span> <strong>{viewingHistory.date}</strong>
                  </div>
                  <div className="detail-row">
                    <span>モード:</span>{" "}
                    <strong>
                      {getStyleLabel(viewingHistory.style)} /{" "}
                      {getModeLabel(viewingHistory.mode)}
                    </strong>
                  </div>
                  <div className="detail-row">
                    <span>スコア:</span>{" "}
                    <strong style={{ color: "#007bff" }}>
                      {viewingHistory.score}
                    </strong>
                  </div>
                  <div className="detail-row">
                    <span>コンボ:</span> <strong>{viewingHistory.maxCombo}</strong>
                  </div>
                  <div className="detail-row">
                    <span>タイム:</span> <strong>{viewingHistory.time}s</strong>
                  </div>
                  <hr />
                  <h4>
                    出題範囲 (
                    {viewingHistory.selectedNumbers
                      ? viewingHistory.selectedNumbers.length
                      : 0}
                    )
                  </h4>
                  <div className="symbol-list">
                    {viewingHistory.selectedNumbers &&
                      viewingHistory.selectedNumbers.map((num) => (
                        <span key={num} className="symbol-tag">
                          {getSymbolByNumber(num)}
                          <span className="sub-num">{num}</span>
                        </span>
                      ))}
                    {(!viewingHistory.selectedNumbers ||
                      viewingHistory.selectedNumbers.length === 0) && (
                        <p className="no-data">範囲データなし</p>
                      )}
                  </div>
                  <div className="modal-buttons" style={{ marginTop: "20px" }}>
                    <button
                      onClick={() => setViewingHistory(null)}
                      className="modal-no-btn"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }

  if (gameState === "loading") {
    return (
      <div className="app-container">
        <div className="card loading-card">
          <h2>Loading...</h2>
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  // Fallback for ready state removal
  if (gameState === "ready") return null;

  if (gameState === "playing") {
    if (!currentElement)
      return (
        <div className="app-container">
          <h1>Loading...</h1>
        </div>
      );
    return (
      <div className="app-container">
        {" "}
        <div className="header-info">
          {" "}
          <div style={{ textAlign: "left" }}>
            <span className="total-timer">{currentTimer}s</span>
            <span className="question-timer"> ({questionTimer}s)</span>
          </div>{" "}
          <div className="header-right">
            {" "}
            {playStyle === "infinite" ? (
              <span
                className={`question-count ${combo > 1 ? "combo-active" : ""}`}
              >
                Score: {score}{" "}
                <span
                  className={`combo-badge ${isComboBreaking ? "combo-break" : ""
                    }`}
                >
                  {combo} COMBO!
                </span>
              </span>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {combo > 1 && (
                  <span
                    className={`combo-badge fade-in ${isComboBreaking ? "combo-break" : ""
                      }`}
                  >
                    {combo} COMBO!
                  </span>
                )}
                <span className="question-count">
                  残り: {quizQueue.length - currentIndex}問
                </span>
              </div>
            )}{" "}
            <button onClick={handleRetireClick} className="retire-text-btn">
              {playStyle === "infinite" ? "終了する" : "やめる"}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="card" style={{ position: "relative" }}>
          {" "}
          {scoreFeedback && (
            <div
              className={`score-feedback ${scoreFeedback.type === "gain" ? "fb-gain" : "fb-loss"
                }`}
            >
              {scoreFeedback.val}
            </div>
          )}{" "}
          <p className="question-label">
            {isSkipping ? (
              <span className="answer-label">正解は...</span>
            ) : currentQType === "nameToNum" ? (
              "原子番号は？"
            ) : (
              "元素記号は？"
            )}
          </p>{" "}
          <div className="element-display">
            {currentQType === "nameToNum" ? (
              <>
                <h2>{currentElement.name}</h2>
                <p className="element-symbol">({currentElement.symbol})</p>
              </>
            ) : (
              <>
                <h2>{currentElement.number}</h2>
                <p className="element-symbol">(原子番号)</p>
              </>
            )}
          </div>{" "}
          <form onSubmit={handleCheck} className="quiz-form">
            {" "}
            <div className="input-group">
              <input
                ref={inputRef}
                type={currentQType === "nameToNum" ? "number" : "text"}
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder={currentQType === "nameToNum" ? "番号" : "記号"}
                autoFocus
                className={`number-input ${isSkipping ? "input-reveal" : ""}`}
                autoComplete="off"
                disabled={isSkipping || showRetireConfirm}
              />
            </div>{" "}
            <div className="hint-area">
              {emptyEnterCount > 0 && !isSkipping && (
                <p key={emptyEnterCount} className="skip-hint">
                  Enterあと {3 - emptyEnterCount} 回でスキップ
                </p>
              )}
            </div>{" "}
            <div className="button-group">
              <button
                type="submit"
                className="check-btn"
                disabled={isSkipping || showRetireConfirm}
              >
                回答
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="skip-btn"
                disabled={isSkipping || showRetireConfirm}
              >
                わからない
              </button>
            </div>{" "}
          </form>{" "}
          {isError && !isSkipping && <p className="message error">不正解！</p>}{" "}
          <TouchKeyboard
            mode={currentQType === "nameToNum" ? "number" : "text"}
            onInput={handleKeyboardInput}
            onDelete={handleKeyboardDelete}
            onEnter={handleKeyboardEnter}
            disabled={isSkipping || showRetireConfirm}
          />
        </div>{" "}
        {showRetireConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>終了しますか？</h3>
              <p>ここまでの成績で結果を表示します。</p>
              <div className="modal-buttons">
                <button
                  onClick={cancelRetire}
                  className={`modal-no-btn ${modalSelection === "cancel" ? "focused" : ""
                    }`}
                >
                  続ける
                </button>
                <button
                  onClick={retryFromModal}
                  className={`modal-retry-btn ${modalSelection === "retry" ? "focused" : ""
                    }`}
                >
                  最初から
                </button>
                <button
                  onClick={confirmRetire}
                  className={`modal-yes-btn ${modalSelection === "confirm" ? "focused" : ""
                    }`}
                >
                  終了する
                </button>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
  if (gameState === "finished") {
    const totalTimeNum = history.reduce((acc, cur) => acc + cur.timeTaken, 0);
    const avgNum = history.length > 0 ? totalTimeNum / history.length : 0;
    const scoreText = history.length > 0 ? "RESULT" : "NO DATA";
    const MAX_DIFF_SCALE = 3.0;
    const pps = (score / Math.max(1, totalTimeNum)).toFixed(2);
    return (
      <div className="app-container">
        {" "}
        <h1>結果発表</h1>{" "}
        <div className="card result-card">
          {" "}
          <h2 className="success-text">{scoreText}</h2>{" "}
          {newRecordFlags.score && (
            <div
              style={{
                color: "gold",
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              ★ New High Score! ★
            </div>
          )}{" "}
          {newRecordFlags.time && !newRecordFlags.score && (
            <div
              style={{
                color: "gold",
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              ★ New Best Time! ★
            </div>
          )}{" "}
          <div className="score-summary">
            {" "}
            <div
              className={`score-group-column ${newRecordFlags.score ? "popHighlight" : ""
                }`}
            >
              <div className="score-label-main">Score Info</div>
              <div className="score-row">
                <div className="score-item">
                  <span className="label">Score</span>
                  <span className="value">{score}</span>
                </div>
                <div className="score-item">
                  <span className="label">Max Combo</span>
                  <span className="value">{maxCombo}</span>
                </div>
                <div className="score-item">
                  <span className="label">Points/s</span>
                  <span className="value">{pps}</span>
                </div>
              </div>
            </div>{" "}
            <div className="score-divider"></div>{" "}
            <div
              className={`score-group-column ${newRecordFlags.time ? "popHighlight" : ""
                }`}
            >
              <div className="score-label-main">Time Info</div>
              <div className="score-row">
                <div className="score-item">
                  <span className="label">Total Time</span>
                  <span className="value">{totalTimeNum.toFixed(1)}s</span>
                </div>
                <div className="score-item">
                  <span className="label">Avg Time</span>
                  <span className="value">{avgNum.toFixed(2)}s</span>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
          {currentSettingsBest && (
            <div className="best-score-container">
              <div className="best-label">Best Record</div>
              <div className="best-values">
                <span>
                  Score: <strong>{currentSettingsBest.score}</strong>
                </span>
                <span>
                  Combo: <strong>{currentSettingsBest.maxCombo}</strong>
                </span>
                <span>
                  Time: <strong>{currentSettingsBest.time || "-"}s</strong>
                </span>
              </div>
            </div>
          )}{" "}
          <div className="result-actions">
            <button
              onClick={retryFromResult}
              className={`retry-btn ${resultSelection === "retry" ? "focused" : ""
                }`}
            >
              同じ設定で再挑戦
            </button>
            <button
              onClick={resetGame}
              className={`back-btn ${resultSelection === "menu" ? "focused" : ""
                }`}
            >
              設定に戻る
            </button>
          </div>{" "}
          <div className="history-section">
            <h3>回答履歴 ({history.length}問)</h3>
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th className="th-problem">問題と正解</th>
                    <th className="th-time">タイム/スコア</th>
                    <th className="th-chart">平均との差</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => {
                    const diff = item.timeTaken - avgNum;
                    const absDiff = Math.abs(diff);
                    const barWidth = (absDiff / MAX_DIFF_SCALE) * 50;
                    let diffClass = "diff-normal";
                    let barColorClass = "bar-normal";
                    if (item.isSkipped) {
                      diffClass = "diff-skipped";
                      barColorClass = "bar-skipped";
                    } else if (diff > 0) {
                      diffClass = "diff-slower";
                      barColorClass = "bar-slower";
                    } else {
                      diffClass = "diff-faster";
                      barColorClass = "bar-faster";
                    }
                    const qType = item.element.questionType || "nameToNum";
                    let qText, aMain;
                    if (qType === "nameToNum") {
                      qText = item.element.name;
                      aMain = item.element.number;
                    } else {
                      qText = item.element.number;
                      aMain = item.element.name;
                    }
                    const scoreDisplay =
                      item.scoreDelta > 0
                        ? `+${item.scoreDelta}`
                        : item.scoreDelta;
                    return (
                      <tr
                        key={index}
                        className={
                          item.isSkipped
                            ? "row-skipped"
                            : wrongItems.some(
                              (w) => w.number === item.element.number
                            )
                              ? "row-wrong"
                              : ""
                        }
                      >
                        {" "}
                        <td className="col-name">
                          {" "}
                          <div className="history-flex-row">
                            {" "}
                            <span className="history-q">{qText}</span>{" "}
                            <span className="history-arrow">→</span>{" "}
                            <span className="history-a">
                              {" "}
                              <span className="history-a-main">
                                {aMain}
                              </span>{" "}
                              <span className="history-a-sub">
                                ({item.element.symbol})
                              </span>{" "}
                            </span>{" "}
                            <div className="history-badges">
                              {" "}
                              {item.isSkipped && (
                                <span className="badge-skip">SKIP</span>
                              )}{" "}
                              {!item.isSkipped &&
                                wrongItems.some(
                                  (w) => w.number === item.element.number
                                ) && (
                                  <span className="badge-wrong">MISS</span>
                                )}{" "}
                            </div>{" "}
                          </div>{" "}
                        </td>{" "}
                        <td className="col-time">
                          {" "}
                          <div>{item.timeTaken.toFixed(2)}s</div>{" "}
                          <div
                            className={`history-score ${item.scoreDelta > 0 ? "score-plus" : "score-zero"
                              }`}
                          >
                            {scoreDisplay}
                          </div>{" "}
                        </td>{" "}
                        <td className="col-chart">
                          {" "}
                          <div className="chart-wrapper">
                            {" "}
                            <div className="chart-center-line"></div>{" "}
                            <div
                              className={`chart-bar ${barColorClass}`}
                              style={{
                                width: `${barWidth}%`,
                                left:
                                  diff < 0 ? `calc(50% - ${barWidth}%)` : "50%",
                              }}
                            ></div>{" "}
                            <span
                              className={`chart-label ${diff < 0 ? "label-left" : "label-right"
                                } ${diffClass}`}
                            >
                              {" "}
                              {diff > 0 ? "+" : ""}
                              {diff.toFixed(2)}{" "}
                            </span>{" "}
                          </div>{" "}
                        </td>{" "}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
