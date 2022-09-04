const loadData =() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
}

const displayCatagory = catagories => {
    const cataContainer= document.getElementById('navbarNav');
    catagories.forEach(category => {
        const cataUl = document.createElement('ul');
        cataUl.classList.add('navbar-nav','mx-auto')
        cataUl.innerHTML = `
        <li class="nav-item">
        <a class="nav-link hover2" aria-current="page" href="#">${category.category_name}</a>
      </li>
        `
        cataContainer.appendChild(cataUl);
    })
}
loadData();
