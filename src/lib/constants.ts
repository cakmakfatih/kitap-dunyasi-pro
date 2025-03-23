interface OpenLibraryCategory {
	category: string;
	values: string[];
}

export const OPEN_LIBRARY_CATEGORIES: OpenLibraryCategory[] = [
	{
		category: "Art",
		values: [
			"Architecture",
			"Art Instruction",
			"Art History",
			"Dance",
			"Design",
			"Fashion",
			"Film",
			"Graphic Design",
			"Music",
			"Music Theory",
			"Painting",
			"Photography",
		],
	},
	{
		category: "Animals",
		values: ["Bears", "Cats", "Kittens", "Dogs", "Puppies"],
	},
	{
		category: "Fiction",
		values: [
			"Fantasy",
			"Historical Fiction",
			"Horror",
			"Humor",
			"Literature",
			"Magic",
			"Mystery and detective stories",
			"Plays",
			"Poetry",
			"Romance",
			"Science Fiction",
			"Short Stories",
			"Thriller",
			"Young Adult",
		],
	},
	{
		category: "Science & Mathematics",
		values: ["Biology", "Chemistry", "Mathematics", "Physics", "Programming"],
	},
	{
		category: "Business & Finance",
		values: [
			"Management",
			"Entrepreneurship",
			"Business Economics",
			"Business Success",
			"Finance",
		],
	},
	{
		category: "Children's",
		values: [
			"Kids Books",
			"Stories in Rhyme",
			"Baby Books",
			"Bedtime Books",
			"Picture Books",
		],
	},
	{
		category: "History",
		values: [
			"Ancient Civilization",
			"Archaeology",
			"Anthropology",
			"World War II",
			"Social Life and Customs",
		],
	},
	{
		category: "Health & Wellness",
		values: [
			"Cooking",
			"Cookbooks",
			"Mental Health",
			"Exercise",
			"Nutrition",
			"Self-help",
		],
	},
	{
		category: "Biography",
		values: [
			"Autobiographies",
			"History",
			"Politics and Government",
			"World War II",
			"Women",
			"Kings and Rulers",
			"Composers",
			"Artists",
			"Anthropology",
			"Religion",
			"Political Science",
			"Psychology",
		],
	},
	{
		category: "Places",
		values: ["Brazil", "India", "Indonesia", "United States"],
	},
	{
		category: "Textbooks",
		values: [
			"History",
			"Mathematics",
			"Geography",
			"Psychology",
			"Algebra",
			"Education",
			"Business & Economics",
			"Science",
			"Chemistry",
			"English Language",
			"Physics",
			"Computer Science",
		],
	},
];
