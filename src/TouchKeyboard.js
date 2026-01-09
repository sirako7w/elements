import React from "react";

const TouchKeyboard = ({ mode, onInput, onDelete, onEnter, disabled }) => {
    const handleTouch = (e, action) => {
        e.preventDefault(); // タッチ時のダブルタップ拡大などを防ぐ
        action();
    };

    const renderKey = (label, onClick, className = "") => (
        <button
            key={label}
            className={`kb-key ${className}`}
            onClick={onClick}
            // サポートしていればonTouchStartで反応を良くするなどの工夫も可能だが一旦onClickで
            type="button"
            disabled={disabled}
        >
            {label}
        </button>
    );

    if (mode === "number") {
        return (
            <div className="touch-keyboard numeric">
                <div className="kb-row">
                    {[1, 2, 3].map((n) =>
                        renderKey(n, () => onInput(n.toString()))
                    )}
                </div>
                <div className="kb-row">
                    {[4, 5, 6].map((n) =>
                        renderKey(n, () => onInput(n.toString()))
                    )}
                </div>
                <div className="kb-row">
                    {[7, 8, 9].map((n) =>
                        renderKey(n, () => onInput(n.toString()))
                    )}
                </div>
                <div className="kb-row">
                    {renderKey("C", onDelete, "kb-special")}
                    {renderKey(0, () => onInput("0"))}
                    {renderKey("Enter", onEnter, "kb-enter")}
                </div>
            </div>
        );
    }

    // Alphabet (QWERTY)
    const rows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    return (
        <div className="touch-keyboard qwerty">
            {rows.map((row, i) => (
                <div className="kb-row" key={i}>
                    {row.map((char) =>
                        renderKey(char, () => onInput(char))
                    )}
                </div>
            ))}
            <div className="kb-row kb-bottom">
                {renderKey("a/A", () => { }, "kb-special placeholder")} {/* Shift的な機能は一旦保留、CSSで非表示等 */}
                {renderKey("BS", onDelete, "kb-backspace")}
                {renderKey("Enter", onEnter, "kb-enter")}
            </div>
        </div>
    );
};

export default TouchKeyboard;
