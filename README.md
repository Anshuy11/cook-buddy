## 🍽️ CookBuddy – Smart Meal Recommendation App (https://cook-buddy.vercel.app/)

CookBuddy is a smart meal planning application that suggests healthy recipes based on user-provided ingredients. It uses Firebase Anonymous Authentication to track users without sign-up friction and fetches nutritional information and meal ideas from the Spoonacular API.


## ⚙️ Tech Stack
- Framework: Next.js, React

- Styling: Tailwind CSS

- State Management: Context API

- Authentication: Firebase (Anonymous Auth)

- Data Source: Spoonacular API (for meals & nutrition)

- Deployment: Vercel

- Performance: Lazy Loading


## 🚀 Features
- 🔐 Anonymous Auth – Save data per user session without requiring login.

- 🍲 Ingredient-Based Recipes – Get meals based on available ingredients.

- 📊 Nutritional Info – View calories and other nutrient breakdowns.

- 🌓 Theme toggle with Context API

- 📱 Fully responsive and performance-optimized

- 🧾 Recently viewed & bookmarked recipes

- ⚡ Fast & Responsive UI – Built with Next.js and Tailwind for performance.

## 🧑‍🍳 How It Works
- User enters available ingredients.

- CookBuddy queries Spoonacular API for relevant meals.

- Meals are displayed with images, calories, and macronutrients.

- Firebase stores recipe history anonymously for future sessions.

📂 Project Structure

cook-buddy/
├── components/               # Reusable UI components
│   ├── TrackableLink.js      # to track links which user click to view recipe
│   ├── RecipeModal.js        # show missing ingredients
│   ├── RecipeCard.js         # recipe card
│   ├── Loader.js
│   ├── Layout.js
│   ├── IngredientMultiSelect.js   # multiple select ingredients
│   ├── IngredientList.js     # jsaon for ingredients
│   ├── Footer.js
│   └── Header.js
│
├── context/                  # Context API for theming
│   └── ThemeContext.js
│
├── firebase/                 # Firebase config and initialization
│   └── firebase.js
│
├── hooks/                    # Custom React hooks
│   └── useAnonAuth.js        # Hook for Firebase anonymous auth
│
├── lib/                      # Utility functions for tracking
│   ├── saveClick.js
│   ├── getClicks.js
│   ├── saveBookmark.js
│   └── getBookmarks.js
│
├── pages/                    # Next.js pages
│   ├── index.js              # Home page with recipe search
│   ├── bookmark.js           # User’s bookmarked recipes
│   ├── _app.js               # App wrapper with global config
│   ├── api/                  # Server-side API routes (Next.js API)
│         ├── SuggestedDish.js
│   └── recipe/               # Dynamic page for individual recipe details
│         ├── [id].js 
├── public/                   # Static assets (images, icons, etc.)
│
├── styles/                   # Tailwind and global CSS
│   └── globals.css
│
├── .env.local                # Environment variables
├── tailwind.config.js
├── postcss.config.mjs
├── next.config.mjs
└── README.md


🛠️ Getting Started Locally

- git clone [https://github.com/Anshuy11/cook-buddy.git](https://github.com/Anshuy11/cook-buddy)
- cd cook-buddy
- npm install
## Add environment variables
SPOONACULAR_API_KEY=your_spoonacular_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_SPOONACULAR_API_KEY=your_spoonacular_key
  


👤 Author
-      Anshu Yadav
- 🔗 [Portfolio](https://portfolios-dusky.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/anshu-yadav-62444a1a0/)
- 🧑‍💻 [GitHub](https://github.com/Anshuy11)


