// load & Display category 
const allCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categoriesData = data.data;
    // console.log(categoriesData);

    // display category 
    const categoriesContainer = document.getElementById('categories-container')

    categoriesData.forEach(category => {
        // console.log(category);
        const categoriesDiv = document.createElement('div');
        categoriesDiv.innerHTML = `
        <button onclick="loadCategoryWiseData('${category.category_id}')" class="bg-[#dedede] hover:bg-[#d3d3d3] px-5 py-2 rounded-lg text-base font-semibold text-[#636363]">${category.category}</button>
        `;
        categoriesContainer.appendChild(categoriesDiv)
    });
}
allCategories();

let categoryWiseData = [];
const loadCategoryWiseData = async (categoryId) => {
    console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    categoryWiseData = data.data;
    console.log(categoryWiseData);
    updateCategoryCards();
}

const updateCategoryCards = () => {
    const categoriesCardContainer = document.getElementById('category-container');
    categoriesCardContainer.textContent = "";

    categoryWiseData.forEach(singleCardData => {
        const categoriesCardDiv = document.createElement('div');
        categoriesCardDiv.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure><img class="h-56" src=${singleCardData.thumbnail} alt="Category Info" /></figure>
                    <div class="card-body">
                        <div class="flex items-center gap-3">
                            <img class="w-10 h-10 rounded-full inline" src=${singleCardData?.authors[0]?.profile_picture} >
                            <h2 class="card-title">${singleCardData.title}</h2>
                        </div>
                        <p>${singleCardData?.authors[0].profile_name}</p>
                        <p>${singleCardData?.others?.views} views</p>
                    </div>
                </div>
                `;
        categoriesCardContainer.appendChild(categoriesCardDiv);
    });
};

// show card as per higher views to lower views
const sortByViews = () => {
    categoryWiseData.sort((a, b) => {

        const viewsA = parseFloat(a.others.views.replace(/[^\d.]/g, ''));
        const viewsB = parseFloat(b.others.views.replace(/[^\d.]/g, ''));
        return viewsB - viewsA;
    });
    updateCategoryCards();
}

// Load the All categories data initially
loadCategoryWiseData('1000');
