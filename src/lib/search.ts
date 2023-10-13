import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { SearchEngine} from "clientside-search";
//@ts-ignore
import en from "clientside-search/en"

const engine = new SearchEngine(en)

export async function initializeEngine() {
    const peopleCollection = collection(firestore, "students");
    const querySnapshot = await getDocs(peopleCollection);

    querySnapshot.forEach((doc) => {
        engine.addDocument(doc.data().name, { id: doc.id, name: nameFormatter(doc.data().name) });
    });
    console.log("Successfully initialized search engine.");
}

export function searchForPerson(query: string, limit: number): Array<result> {
    const response = engine.search(query, limit);
    return response.map((res) => {
        return res.metadata
    })
}

export function nameFormatter(name: string): string {
  // Split the name into words
  const words = name.split(" ");

  // Capitalize the first character of each word
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the formatted words back into a single string
  const formattedName = formattedWords.join(" ");

  return formattedName;
}

export interface result { id: string, name: string }