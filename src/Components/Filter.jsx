import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { byName, byPrice, clearFilters } from "../redux/Slices/FilterSlice";

/**
 * Filter component — inline styles only, dark-mode safe.
 * Logic unchanged: uses same Redux actions/selectors as before.
 */
const Filter = () => {
  const filterState = useSelector((state) => state.filter);
  const { sortName, sortPrice } = filterState;
  const dispatch = useDispatch();
  const isFilterApplied = Boolean(sortName || sortPrice);

  // Track dark mode reliably and update when body.classList changes
  const [isDark, setIsDark] = React.useState(
    typeof document !== "undefined" && document.body.classList.contains("dark")
  );

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () => setIsDark(document.body.classList.contains("dark"));

    // Observe changes to body.class attribute (so toggling 'dark' will update UI)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") {
          update();
          break;
        }
      }
    });
    mo.observe(document.body, { attributes: true });

    // safety: also update once
    update();
    return () => mo.disconnect();
  }, []);

  const theme = React.useMemo(() => {
    if (isDark) {
      return {
        cardBg: "#0f1724", // outer card
        innerBg: "#0b1220", // inner panel bg
        text: "#e6eef8", // main text
        textMuted: "#9aa6bf",
        accent: "#7c8cff",
        danger: "#ff7878",
        shadow: "0 10px 30px rgba(0,0,0,0.6)",
        inputBg: "#0b1220",
        border: "rgba(255,255,255,0.04)"
      };
    } else {
      return {
        cardBg: "#f6f7fb",
        innerBg: "#ffffff",
        text: "#0b1220",
        textMuted: "#6b7280",
        accent: "#3741b0",
        danger: "#ff4d4d",
        shadow: "0 12px 30px rgba(8,20,40,0.06)",
        inputBg: "#ffffff",
        border: "rgba(0,0,0,0.04)"
      };
    }
  }, [isDark]);

  // Inline styles
  const wrapper = {
    position: "sticky",
    top: "9rem",
    background: theme.cardBg,
    padding: "22px",
    borderRadius: 18,
    boxShadow: theme.shadow,
    width: "100%",
    maxWidth: 260,
    boxSizing: "border-box",
    transition: "background 180ms ease, color 180ms ease, box-shadow 180ms ease",
  };

  const inner = {
    background: theme.innerBg,
    color: theme.text,
    borderRadius: 12,
    padding: "20px",
    boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.02)" : "0 6px 30px rgba(8,20,40,0.04)",
    border: `1px solid ${theme.border}`,
  };

  const title = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 20,
    fontWeight: 800,
    margin: 0,
    color: theme.text,
  };

  const section = { marginTop: 18, marginBottom: 6 };
  const sectionTitle = {
    fontWeight: 700,
    marginBottom: 12,
    color: theme.text,
    fontSize: 16,
  };

  const radioRow = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  };

  const inputStyle = {
    width: 18,
    height: 18,
    cursor: "pointer",
    accentColor: theme.accent,
    background: theme.inputBg,
    borderRadius: "50%",
    border: `1px solid ${theme.border}`,
  };

  const labelStyle = {
    color: theme.text,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  };

  const clearBtnEnabled = {
    width: "100%",
    padding: "10px",
    borderRadius: 10,
    border: "none",
    background: theme.danger,
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 6,
  };

  const clearBtnDisabled = {
    ...clearBtnEnabled,
    background: "transparent",
    color: theme.textMuted,
    border: `1px solid ${theme.border}`,
    cursor: "not-allowed",
    opacity: 0.7,
  };

  const handleClear = () => dispatch(clearFilters());

  return (
    <div style={wrapper}>
      <div style={inner}>
        <h3 style={title}>
          <i
            className="fa-solid fa-filter"
            aria-hidden
            style={{ color: theme.textMuted, fontSize: 18 }}
          />
          <span style={{ marginLeft: 2 }}>Filters</span>
        </h3>

        {/* By Name */}
        <div style={section}>
          <p style={sectionTitle}>By Name</p>

          <div style={radioRow}>
            <input
              id="name-asc"
              type="radio"
              name="sort-name"
              value="ascending-name"
              onChange={() => dispatch(byName("lowToHigh"))}
              checked={sortName === "lowToHigh"}
              style={inputStyle}
            />
            <label htmlFor="name-asc" style={labelStyle}>
              Ascending
            </label>
          </div>

          <div style={radioRow}>
            <input
              id="name-desc"
              type="radio"
              name="sort-name"
              value="descending-name"
              onChange={() => dispatch(byName("highToLow"))}
              checked={sortName === "highToLow"}
              style={inputStyle}
            />
            <label htmlFor="name-desc" style={labelStyle}>
              Descending
            </label>
          </div>
        </div>

        {/* By Price */}
        <div style={section}>
          <p style={sectionTitle}>By Price</p>

          <div style={radioRow}>
            <input
              id="price-asc"
              type="radio"
              name="sort-price"
              value="ascending-price"
              onChange={() => dispatch(byPrice("lowToHigh"))}
              checked={sortPrice === "lowToHigh"}
              style={inputStyle}
            />
            <label htmlFor="price-asc" style={labelStyle}>
              Ascending
            </label>
          </div>

          <div style={radioRow}>
            <input
              id="price-desc"
              type="radio"
              name="sort-price"
              value="descending-price"
              onChange={() => dispatch(byPrice("highToLow"))}
              checked={sortPrice === "highToLow"}
              style={inputStyle}
            />
            <label htmlFor="price-desc" style={labelStyle}>
              Descending
            </label>
          </div>
        </div>

        <button
          onClick={handleClear}
          disabled={!isFilterApplied}
          aria-disabled={!isFilterApplied}
          style={isFilterApplied ? clearBtnEnabled : clearBtnDisabled}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
