export function generateRandomId(data) {
  if (data) {
    const min = 0;
    const max = data.length - 1;
    const randomIndex = [];
    const newData = [];

    while (randomIndex.length < 3) {
      const index = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!randomIndex.includes(index)) {
        randomIndex.push(index);
        newData.push(data[index]);
      }
    }

    return newData;
  }
}
