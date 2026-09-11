// Single formatter for the one currency Purple Wave uses (PEN, displayed as
// "S/"). Kept intentionally simple — matches the exact output every call site
// already produced by hand (`S/ ${x.toFixed(2)}`), not a general Intl-based
// formatter, since that would risk changing the visible output.
export function formatCurrency(amount: number): string {
  return `S/ ${amount.toFixed(2)}`
}
