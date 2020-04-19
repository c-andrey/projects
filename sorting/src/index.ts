import { NumbersCollection } from './Classes/NumbersCollection';
import { StringCollection } from './Classes/StringCollection';
import { LinkedList } from './Classes/LinkedList';

const numbersColletion = new NumbersCollection([-2, 2, -5, 10]);
const stringCollection = new StringCollection('alksjdDJSKAL');
const linkedList = new LinkedList();
linkedList.add(32);
linkedList.add(432);
linkedList.add(54);
linkedList.add(78);
linkedList.add(0);
linkedList.add(-2);

numbersColletion.sort();
stringCollection.sort();
linkedList.sort();

console.log(numbersColletion.data);
console.log(stringCollection.data);
linkedList.print();
