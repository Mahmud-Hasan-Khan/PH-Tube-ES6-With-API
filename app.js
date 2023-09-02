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
    // console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    categoryWiseData = data.data;
    console.log(categoryWiseData);
    updateCategoryCards();
}

const updateCategoryCards = () => {
    // get card container
    const categoriesCardContainer = document.getElementById('category-container');
    // clear card container before show another categories data 
    categoriesCardContainer.textContent = "";

    // get card container when categoryWiseData.length is 0
    const errorCardContainer = document.getElementById('error-category-container');
    errorCardContainer.textContent = '';

    // convert "posted_date" value seconds to Hour and Minutes
    function convertSecondsToHoursAndMinutes(totalSeconds) {
        const totalMinutes = Math.floor(totalSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours > 0 || minutes > 0) {
            return `${hours}hrs ${minutes} min ago`;
        } else {
            return '';
        }
    }

    if (categoryWiseData.length === 0) {
        const emptyDataDiv = document.createElement('div');
        emptyDataDiv.innerHTML = `
            <div class="card w-96 items-center">
                <img src="./image/Icon.png" alt="error Image">
                <div class="card-body">
                    <p class="text-3xl font-bold text-center">Oops!! Sorry, There is no content here</p>
                </div>
            </div>
        `;
        errorCardContainer.appendChild(emptyDataDiv);
    } else {
        categoryWiseData.forEach(singleCardData => {
            const categoriesCardDiv = document.createElement('div');
            categoriesCardDiv.innerHTML = `
                    <div class="card card-compact bg-base-100 shadow-xl relative">
                        <figure><img class="h-56 w-full" src=${singleCardData.thumbnail} alt="Category Info" /></figure>
                        <div class="card-body">
                            <div class="flex gap-3">
                                <img class="w-10 h-10 rounded-full inline" src=${singleCardData?.authors[0]?.profile_picture} >
                                <div>
                                    <h2 class="card-title">${singleCardData.title}</h2>
                                    <div class="flex gap-1">
                                        <p class="flex-grow-0 text-[#595959]">${singleCardData?.authors[0].profile_name}</p>
                                        <p>${singleCardData?.authors[0].verified == true ? '<img src="./image/isVerified.png" alt="Verified Image">' : ''}</p>
                                    </div>                      
                                    <p class="absolute bottom-28 right-4 p-2 rounded text-white" style="background-color: ${convertSecondsToHoursAndMinutes(singleCardData.others.posted_date ? singleCardData.others.posted_date : '') === '' ? '' : 'black'}">
                                    ${convertSecondsToHoursAndMinutes(singleCardData.others.posted_date ? singleCardData.others.posted_date : '')}
                                    </p>
                                    <p class="text-[#595959]">${singleCardData?.others?.views} views</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    `;
            categoriesCardContainer.appendChild(categoriesCardDiv);
        });
    }

};

const extractAndConvertToNumber = (value) => {
    // Split the input string into an array of characters
    const chars = value.split('');
    console.log(chars);
    // Filter the array to keep only numeric characters and periods
    const filteredChars = chars.filter(char => !isNaN(char) || char === '.');
    console.log(filteredChars);
    // Join the filtered characters back into a string
    const numericString = filteredChars.join('');
    console.log(numericString);
    // Convert the string to a floating-point number
    return parseFloat(numericString);
};

// show card as per higher views to lower views
const sortByViews = () => {
    categoryWiseData.sort((a, b) => {
        const viewsA = extractAndConvertToNumber(a.others.views);
        const viewsB = extractAndConvertToNumber(b.others.views);
        return viewsB - viewsA;
    });
    updateCategoryCards();
}

// Load the All categories data initially
loadCategoryWiseData('1000');
