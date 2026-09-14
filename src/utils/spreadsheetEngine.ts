import { SpreadsheetState } from "../types";

export function colToLetter(colIndex: number): string {
  let temp = colIndex;
  let letter = "";
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}

export function letterToCol(letter: string): number {
  let col = 0;
  for (let i = 0; i < letter.length; i++) {
    col = col * 26 + (letter.charCodeAt(i) - 64);
  }
  return col - 1;
}

export function parseCellRef(ref: string): { col: number; row: number } | null {
  const match = ref.trim().toUpperCase().match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  return {
    col: letterToCol(match[1]),
    row: parseInt(match[2], 10),
  };
}

export function expandRange(rangeStr: string): string[] {
  const parts = rangeStr.trim().toUpperCase().split(":");
  if (parts.length === 1) return [parts[0]];
  if (parts.length !== 2) return [];

  const start = parseCellRef(parts[0]);
  const end = parseCellRef(parts[1]);
  if (!start || !end) return [];

  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  const cells: string[] = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      cells.push(`${colToLetter(c)}${r}`);
    }
  }
  return cells;
}

function getCellValue(cellRef: string, state: SpreadsheetState): number | string {
  const cell = state[cellRef.toUpperCase()];
  if (!cell) return 0;
  if (cell.computedValue !== undefined) {
    return cell.computedValue;
  }
  const val = cell.value;
  if (typeof val === "number") return val;
  const num = parseFloat(String(val).replace(/,/g, "."));
  return isNaN(num) ? String(val) : num;
}

function extractNumericValues(argStr: string, state: SpreadsheetState): number[] {
  // Can be a range like B2:B5 or single refs B2; B3 or raw numbers
  const tokens = argStr.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
  const numbers: number[] = [];

  for (const token of tokens) {
    if (token.includes(":")) {
      const cells = expandRange(token);
      for (const cellRef of cells) {
        const val = getCellValue(cellRef, state);
        if (typeof val === "number" && !isNaN(val)) {
          numbers.push(val);
        } else {
          const parsed = parseFloat(String(val).replace(/,/g, "."));
          if (!isNaN(parsed)) numbers.push(parsed);
        }
      }
    } else {
      const cellCoord = parseCellRef(token);
      if (cellCoord) {
        const val = getCellValue(token, state);
        if (typeof val === "number" && !isNaN(val)) {
          numbers.push(val);
        } else {
          const parsed = parseFloat(String(val).replace(/,/g, "."));
          if (!isNaN(parsed)) numbers.push(parsed);
        }
      } else {
        const directNum = parseFloat(token.replace(/,/g, "."));
        if (!isNaN(directNum)) numbers.push(directNum);
      }
    }
  }
  return numbers;
}

export function evaluateFormula(formula: string, state: SpreadsheetState): string | number {
  if (!formula || typeof formula !== "string") return "";
  const trimmed = formula.trim();
  if (!trimmed.startsWith("=")) return trimmed;

  const expression = trimmed.substring(1).trim();
  const upperExpr = expression.toUpperCase();

  try {
    // 1. TOPLA / SUM
    const sumMatch = upperExpr.match(/^(?:TOPLA|SUM)\((.*)\)$/i);
    if (sumMatch) {
      const nums = extractNumericValues(sumMatch[1], state);
      return nums.reduce((a, b) => a + b, 0);
    }

    // 2. ORTALAMA / AVERAGE
    const avgMatch = upperExpr.match(/^(?:ORTALAMA|AVERAGE)\((.*)\)$/i);
    if (avgMatch) {
      const nums = extractNumericValues(avgMatch[1], state);
      if (nums.length === 0) return "#BÖL/0!";
      const sum = nums.reduce((a, b) => a + b, 0);
      return Math.round((sum / nums.length) * 100) / 100;
    }

    // 3. MAKS / MAX
    const maxMatch = upperExpr.match(/^(?:MAKS|MAX)\((.*)\)$/i);
    if (maxMatch) {
      const nums = extractNumericValues(maxMatch[1], state);
      if (nums.length === 0) return 0;
      return Math.max(...nums);
    }

    // 4. MİN / MIN
    const minMatch = upperExpr.match(/^(?:MİN|MIN)\((.*)\)$/i);
    if (minMatch) {
      const nums = extractNumericValues(minMatch[1], state);
      if (nums.length === 0) return 0;
      return Math.min(...nums);
    }

    // 5. SAY / COUNT
    const countMatch = upperExpr.match(/^(?:SAY|COUNT)\((.*)\)$/i);
    if (countMatch) {
      const nums = extractNumericValues(countMatch[1], state);
      return nums.length;
    }

    // 6. DOLU_SAY / COUNTA
    const countaMatch = upperExpr.match(/^(?:DOLU_SAY|COUNTA)\((.*)\)$/i);
    if (countaMatch) {
      const cells = expandRange(countaMatch[1]);
      let filled = 0;
      for (const cellRef of cells) {
        const val = getCellValue(cellRef, state);
        if (val !== "" && val !== null && val !== undefined) filled++;
      }
      return filled;
    }

    // 7. EĞER / IF
    // e.g. EĞER(B2>=50; "Geçti"; "Kaldı")
    const ifMatch = upperExpr.match(/^(?:EĞER|IF)\((.*)\)$/i);
    if (ifMatch) {
      // Split by semicolon (or comma outside quotes)
      const argsRaw = ifMatch[1];
      const parts: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < argsRaw.length; i++) {
        const char = argsRaw[i];
        if (char === '"') inQuotes = !inQuotes;
        if ((char === ";" || char === ",") && !inQuotes) {
          parts.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      if (current) parts.push(current.trim());

      if (parts.length >= 2) {
        const condition = parts[0];
        const trueResult = parts[1].replace(/^"|"$/g, "");
        const falseResult = parts.length >= 3 ? parts[2].replace(/^"|"$/g, "") : "";

        // evaluate condition
        const condMatch = condition.match(/^([A-Z0-9]+)\s*(>=|<=|<>|>|<|=)\s*(.*)$/);
        if (condMatch) {
          const leftRef = condMatch[1];
          const op = condMatch[2];
          const rightTarget = condMatch[3].replace(/^"|"$/g, "");

          const leftVal = getCellValue(leftRef, state);
          const rightNum = parseFloat(rightTarget);
          const leftNum = typeof leftVal === "number" ? leftVal : parseFloat(String(leftVal));

          let isTrue = false;
          if (!isNaN(leftNum) && !isNaN(rightNum)) {
            if (op === ">=") isTrue = leftNum >= rightNum;
            else if (op === "<=") isTrue = leftNum <= rightNum;
            else if (op === ">") isTrue = leftNum > rightNum;
            else if (op === "<") isTrue = leftNum < rightNum;
            else if (op === "=") isTrue = leftNum === rightNum;
            else if (op === "<>") isTrue = leftNum !== rightNum;
          } else {
            const leftStr = String(leftVal).trim().toLowerCase();
            const rightStr = rightTarget.trim().toLowerCase();
            if (op === "=") isTrue = leftStr === rightStr;
            else if (op === "<>") isTrue = leftStr !== rightStr;
          }
          return isTrue ? trueResult : falseResult;
        }
      }
    }

    // 8. Basic arithmetic with cell references (e.g. =B2-B3, =B2*1.2, =A1+B1)
    let arithExpr = expression;
    // Replace cell references (like $C$1 or B2) with their values
    arithExpr = arithExpr.replace(/\$?([A-Z]+)\$?([0-9]+)/gi, (match) => {
      const cleanRef = match.replace(/\$/g, "").toUpperCase();
      const val = getCellValue(cleanRef, state);
      const num = typeof val === "number" ? val : parseFloat(String(val).replace(/,/g, "."));
      return isNaN(num) ? "0" : String(num);
    });

    // Clean any safe arithmetic characters only
    if (/^[0-9+\-*/().\s]+$/.test(arithExpr)) {
      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${arithExpr})`)();
      if (typeof result === "number" && !isNaN(result)) {
        return Math.round(result * 100) / 100;
      }
    }

    return "#DEĞER!";
  } catch {
    return "#HATA!";
  }
}

export function buildStateFromPreset(
  headers: string[],
  rows: (string | number)[][],
  totalCols = 8,
  totalRows = 16
): SpreadsheetState {
  const state: SpreadsheetState = {};

  // Headers in row 1
  for (let c = 0; c < headers.length; c++) {
    const ref = `${colToLetter(c)}1`;
    state[ref] = {
      value: headers[c],
      computedValue: headers[c],
      isHeader: true,
      format: "bold",
    };
  }

  // Data in rows 2+
  for (let r = 0; r < rows.length; r++) {
    const rowNum = r + 2;
    for (let c = 0; c < rows[r].length; c++) {
      const ref = `${colToLetter(c)}${rowNum}`;
      const val = rows[r][c];
      state[ref] = {
        value: val,
        computedValue: val,
        format: typeof val === "number" ? "number" : "normal",
      };
    }
  }

  // Ensure empty cells exist up to totalCols & totalRows
  for (let r = 1; r <= totalRows; r++) {
    for (let c = 0; c < totalCols; c++) {
      const ref = `${colToLetter(c)}${r}`;
      if (!state[ref]) {
        state[ref] = { value: "", computedValue: "" };
      }
    }
  }

  return state;
}
