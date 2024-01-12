import Day from './day';
import Day1 from './day1';
import Day2 from './day2';
import Day3 from './day3';
import Day4 from './day4';
import Day5 from './day5';
import Day6 from './day6';
import Day7 from './day7';
import Day8 from './day8';

const days: Day[] = [Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8];

async function runDay(dayId: number) {
  const resultPart1 = await days[dayId].partOne();
  console.log('Part 1 result:\n');
  console.log(resultPart1);

  console.log('\n');

  const resultPart2 = await days[dayId].partTwo();
  console.log('Part 2 result:\n');
  console.log(resultPart2);
}

console.log('\n\n\n   ADVENT OF CODE \n\n');
const params = process.argv.splice(2);
if (params.length) {
  runDay(parseInt(params[0], 10) - 1);
} else {
  console.log(`Usage: yarn start [day]`);
  console.log(`Available days: [ ${days.map((x) => x.id).join(', ')} ]`);
}
