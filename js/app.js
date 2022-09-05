// News category

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
        <a onclick="loadCategoryDetails('${category.category_id}')" class="nav-link hover2" aria-current="page" href="#">${category.category_name}</a>
      </li>
        `
        cataContainer.appendChild(cataUl);
    })
    
}




// News
const loadCategoryDetails= id => {
    toggler(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryDetails(data.data))
}

const displayCategoryDetails = ditails => {
    const detailContainer = document.getElementById('card-container');
    detailContainer.innerHTML='';


    // Display No News Start
    const noNews = document.getElementById('no-news')
    if(ditails.length === 0){
     noNews.classList.remove('d-none')
    }else{
     noNews.classList.add('d-none')
    }
    // Display No news end

    ditails.forEach(detail => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('card','mb-3')
        detailDiv.innerHTML=`
        <div class="row" >
                 <div class="col-md-4 ">
                    <img src="${detail.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <a onclick="loadNewsDetails('${detail._id}')" class="cata-title card-title" data-bs-toggle="modal" data-bs-target="#news-detail-modal">${detail.title}</a>
                        <p class="card-text text-truncate ">${detail.details}</p>
                        <div class="row mt-5">
                        <P id="no-details" class="col-6"> <small class="text-muted "><i class="fa-solid fa-user"></i> ${detail.author.name ? detail.author.name :'No Data Found'}</small></P>
                        <p class="card-text col-6"><small class="text-muted"><i class="fa-solid fa-eye"></i> ${detail.total_view ? detail.total_view :'No Data Found'}</small></p>
                        </div>
                        
                    </div>
                </div>
</div>
        `
        detailContainer.appendChild(detailDiv);

    })
    toggler(false)

}

const loadNewsDetails= (_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
}

const displayNewsDetails = news => {
          const modalLable = document.getElementById('news-detail-modalLabel')
          modalLable.innerText=`${news.title}`
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML=`
    <img src="${news.image_url}" class="img-fluid rounded-start mb-2" alt="...">
                        <p>${news.details}</p>
                        <div class="row mt-5">
                        <P class="col-6"> <i class="fa-solid fa-user"></i><span class="ms-2">${news.author.name}</span> </P>
                        <p class="card-text col-6"><small class="text-muted"><i class="fa-solid fa-eye"></i> ${news.total_view}</small></p>
                        </div>
    `
    
}

const toggler = isLoading =>{
    const loadSpin = document.getElementById('spinner')
    if(isLoading){
        loadSpin.classList.remove('d-none')
    }else{
        loadSpin.classList.add('d-none')
    }
}

loadData();
