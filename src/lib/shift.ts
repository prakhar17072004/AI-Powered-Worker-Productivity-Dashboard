export function getShiftRange(shift: string) {
    if (shift === "morning") return ["06:00:00", "14:00:00"];
    if (shift === "evening") return ["14:00:00", "22:00:00"];
    return ["00:00:00", "23:59:59"];
  }