// const date = [
//     {"seconds": 1711929600, "nanoseconds": 0}, // Monday, April 1, 2024
//     {"seconds": 1712016000, "nanoseconds": 0}, // Tuesday, April 2, 2024
//     {"seconds": 1712102400, "nanoseconds": 0}, // Wednesday, April 3, 2024
//     {"seconds": 1712188800, "nanoseconds": 0}, // Thursday, April 4, 2024
//     {"seconds": 1712275200, "nanoseconds": 0}, // Friday, April 5, 2024
//     {"seconds": 1712361600, "nanoseconds": 0},  // Saturday, April 6, 2024
//     {"seconds": 1711929600, "nanoseconds": 0}, // Monday, April 1, 2024
//     {"seconds": 1712016000, "nanoseconds": 0}, // Tuesday, April 2, 2024
//     {"seconds": 1712102400, "nanoseconds": 0}, // Wednesday, April 3, 2024
//     {"seconds": 1712188800, "nanoseconds": 0}, // Thursday, April 4, 2024
//     {"seconds": 1712275200, "nanoseconds": 0}, // Friday, April 5, 2024
//     {"seconds": 1711929600, "nanoseconds": 0}, // Monday, April 1, 2024
//     {"seconds": 1712016000, "nanoseconds": 0}, // Tuesday, April 2, 2024
//     {"seconds": 1712102400, "nanoseconds": 0}, // Wednesday, April 3, 2024
//     {"seconds": 1712188800, "nanoseconds": 0}, // Thursday, April 4, 2024
//     {"seconds": 1712275200, "nanoseconds": 0}, // Friday, April 5, 2024
//     {"seconds": 1712361600, "nanoseconds": 0},  // Saturday, April 6, 2024
// ]
//
// const entries = Array.from({length: date.length}).map((day, index) => ({
//      author: "bani",
//     date: date[index],// Each day is 1 day apart
//      description: `Entry for ${(new Date(date[index].seconds * 1000).toLocaleDateString('en-US', {
//          weekday: "long",
//      }))}`,
//      hours: (Math.random() * (10 - 5) + 5).toFixed(1), // Random hours between 5 and 10
//      id: `CptRiGVdRsECKW3k1fx5_${index + 1}`,
//      images: [
//          'https://urlimage.dyipspot.com/uploads/1741590181_85f3f926-c521-4e29-bc43-c6ebc1b632a4.jpg',
//          'https://urlimage.dyipspot.com/uploads/1741565587_a0266d0b-fa59-4236-946b-1717c650ee66.jpg',
//          'https://urlimage.dyipspot.com/uploads/1741565587_816cea20-0682-4f3b-8f11-cee6496fd2cf.jpg'
//      ]
// }));
// const group = (list) => {
//     if (!list || list.length === 0) return [];
//
//     const result = [];
//     let tempGroup = [];
//
//     for (let i = 0; i < list.length; i++) {
//         const entry = list[i];
//         const weekday = new Date(entry.date.seconds * 1000).toLocaleDateString('en-US', { weekday: "long" });
//
//         tempGroup.push(entry); // Add the current entry to the tempGroup
//
//         if (weekday === "Friday") {
//             // Check if the next day is Saturday and include it
//             if (list[i + 1]) {
//                 const nextWeekday = new Date(list[i + 1].date.seconds * 1000).toLocaleDateString('en-US', { weekday: "long" });
//                 if (nextWeekday === "Saturday") {
//                     tempGroup.push(list[i + 1]); // Include Saturday
//                     i++; // Skip Saturday in the next loop
//                 }
//             }
//             result.push([...tempGroup]); // Push the complete Monday-Saturday group
//             tempGroup = []; // Reset for the next batch
//         }
//     }
//
//     // If there are leftover entries (e.g., a Saturday that wasn't included)
//     if (tempGroup.length > 0) {
//         result.push([...tempGroup]);
//     }
//
//     return result;
// };
//
// // Run the function and log results
// console.table(group(entries));
//
