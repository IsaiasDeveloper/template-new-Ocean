//Global variable
let siteProt = location.protocol + '//';
let siteHost = location.host;
const frontUrl = siteProt + siteHost;
let jsonFile = '/api/getJson.aspx?type=home';
let menuInfo = '/api/getJson.aspx?type=menu';
let jsonCategories = '/api/getJson.aspx?type=tutors_app_new';
let jsonSpecificCategory =
  '/api/getJson.aspx?type=courses_list_app&page_total=12&page=1&tutor_id=';

// let initUrl = frontUrl;  //No Grape devo descomentar essa variável

// let initUrl = 'https://euestudo.com.vc'; //No Grape devo Comentar essa variável //https://espg.com.br/
// let initUrl = 'https://catalogo.drmeducacao.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://espg.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://faculdadesucesso.edu.br'; //Tem 3 emphasis
let initUrl = 'https://uniflor.edu.br'; //Tem 9 emphasis
// let initUrl = 'http://facigma.edu.br'; // SÓ ESSE ESTÁ DANDO ERRO! //
// let initUrl = 'https://reboucasdigital.com.br'; // SÓ ESSE ESTÁ DANDO ERRO! //

const pageLinksList = [
  { page: 'Home', id: '408098' },
  { page: 'Nossos Cursos', id: '408816' },
  { page: 'Quem Somos', id: '408817' },
  { page: 'Como Funciona', id: '408818' },
  { page: 'FAQ', id: '408819' },
  { page: 'Seja Parceiro', id: '408820' },
  { page: 'Contato', id: '408821' },
  { page: 'Curso', id: '408822' },
  { page: 'Política de Privacidade', id: '408823' },
  { page: 'Termos de Uso', id: '408824' },
  { page: 'Registre-se', id: '408825' },
  { page: 'Login', id: '408826' },
];

// Navbar
//Create all menu informations
function fetchJsonNavbarLinks() {
  try {
    fetch(`${initUrl}${menuInfo}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        createNavBarInfo(json);
        getFooterInfo(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
function createNavBarInfo(json) {
  try {
    let navbarImgBox = document.querySelector('.navbarImg');
    //Logo image
    let logoSite = json.logo;
    let linkToLogo = document.createElement('a');
    for (let i = 0; i < pageLinksList.length; i++) {
      if (pageLinksList[i].page === 'Home') {
        let homePageId = pageLinksList[i].id;
        linkToLogo.setAttribute('href', `${initUrl}/pages/${homePageId}/Home`);
      }
    }
    navbarImgBox.appendChild(linkToLogo);
    let logoImg = document.createElement('img');
    logoImg.setAttribute('src', `${initUrl + logoSite}`);
    logoImg.setAttribute('alt', 'Logo image');
    linkToLogo.appendChild(logoImg);
  } catch (e) {
    console.warn(e);
  }
}
//End create all menu informations

// Mobile menu
try {
  const mobileMenu = document.querySelector('.menuMobileBtn');
  const barsMenuList = Array.prototype.slice.call(
    document.querySelectorAll('.menuMobileBars')
  );
  const navbarMenuMobile = document.querySelector('.navbarMenu');
  let clickOnMenu = true;

  mobileMenu.addEventListener('click', () => {
    if (clickOnMenu) {
      navbarMenuMobile.style.display = 'flex';
      barsMenuList.forEach((bar, idx) => {
        if (idx === 0) {
          bar.style.cssText =
            'transform: rotate(-50deg); margin-top: 0px;transition: 0.6s;width: 130%;';
        } else if (idx === 1) {
          bar.style.display = 'none';
        } else if (idx === 2) {
          bar.style.cssText =
            'transform: rotate(50deg); margin-top: -10px;transition: 0.6s;width: 130%;';
        }
      });
      setTimeout(() => (clickOnMenu = false), 600);
    } else {
      navbarMenuMobile.style.display = 'none';
      barsMenuList.forEach((bar, idx) => {
        if (idx === 0) {
          bar.style.cssText =
            'transform: rotate(0deg); transition: 0.6s; width: 100%;';
        } else if (idx === 1) {
          setTimeout(() => (bar.style.display = 'block'), 350);
        } else if (idx === 2) {
          bar.style.cssText =
            'transform: rotate(0deg); transition: 0.6s;width: 100%;';
        }
      });
      setTimeout(() => (clickOnMenu = true), 600);
    }
  });
} catch (er) {
  console.warn(er);
}
//Create navbar link
const navbarLinks = Array.prototype.slice.call(
  document.querySelectorAll('.itemsMenuNavbar a')
);
try {
  for (let i = 0; i < pageLinksList.length; i++) {
    for (let e = 0; e < navbarLinks.length; e++) {
      if (pageLinksList[i].page === navbarLinks[e].textContent) {
        let pageId = pageLinksList[i].id;
        let links = navbarLinks[e].textContent.replace(' ', '-');
        navbarLinks[e].setAttribute(
          'href',
          `${initUrl}/pages/${pageId}/${links}`
        );
      }
    }
  }
} catch (e) {
  console.warn(e);
}
//Login button
let coletaLeadLogin = document.querySelector('.coletaLeadLogin');
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Login') {
    coletaLeadLogin.setAttribute(
      'href',
      `${initUrl}/pages/${pageLinksList[i].id}/Login`
    );
  }
}
//Register button
let registerNavbarBtn = document.querySelector('.registerNavbarBtn');
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Registre-se') {
    registerNavbarBtn.setAttribute(
      'href',
      `${initUrl}/pages/${pageLinksList[i].id}/Registre-se`
    );
  }
}
// End of Navbar

// Course categories
const categoriesBox = document.querySelector('.categoryNamesBox');
const categoriesCourseCardsBox = document.querySelector(
  '.coursesCategoriesCardsBox'
);
let categoryList = [];
let courseSpecificList = [];
let coursesCategoriesTitle = document.querySelector('.coursesCategoriesTitle');
let showMoreCourseBtn = document.querySelector('.showMoreCourses');

function fetchJsonProductCategoryList() {
  try {
    const reqCategory = `${initUrl}${jsonCategories}`;
    fetch(reqCategory)
      .then((answer) => answer.json())
      .then((json) => {
        getCourseCategoriesName(json);
        getCourseCategoriesCards(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

function getCourseCategoriesName(json) {
  try {
    // console.log(json);
    // console.log(json.tutorsList.length);
    if (json.tutorsList) {
      for (let item = 0; item < json.tutorsList.length; item++) {
        let categoryId = json.tutorsList[item].id;
        let categoryName = json.tutorsList[item].name;

        //Create category names in the categories box
        let names = document.createElement('p');
        names.classList.add('categoryName');
        names.id = categoryId;
        names.innerHTML = categoryName;
        categoriesBox.appendChild(names);
      }
    }
    getCategoryNames();
  } catch (e) {
    console.warn(e);
  }
}

function getCourseCategoriesCards(json) {
  try {
    // console.log(json);
    // console.log(json.tutorsList);
    if (json.tutorsList) {
      for (let item = 0; item < json.tutorsList.length; item++) {
        let categoryId = json.tutorsList[item].id;
        let categoryName = json.tutorsList[item].name;
        let categoryImg = json.tutorsList[item].img;

        //Create categories cards
        let categoryCard = document.createElement('div');
        categoryCard.classList.add('coursesCategoriesCard');
        categoryCard.id = categoryId;
        categoriesCourseCardsBox.appendChild(categoryCard);

        //Create category card image box
        let imgBox = document.createElement('div');
        imgBox.classList.add('coursesCategoriesCardImg');
        categoryCard.appendChild(imgBox);

        //Create card image
        let cardImg = document.createElement('img');
        cardImg.classList.add('categoryCardImg');
        cardImg.setAttribute('src', `${initUrl}${categoryImg}`);
        cardImg.setAttribute('alt', 'Image');
        imgBox.appendChild(cardImg);

        //Create category card content
        let contentBox = document.createElement('div');
        contentBox.classList.add('coursesCategoriesCardContent');
        categoryCard.appendChild(contentBox);

        //Get category name
        let title = document.createElement('p');
        title.classList.add('coursesCategoriesCardTitle');
        title.innerHTML = categoryName;
        contentBox.appendChild(title);

        //Get category link
        let categoryLink = document.createElement('a');
        categoryLink.classList.add('coursesCategoriesCardsLink');
        categoryLink.innerHTML = 'Saiba mais →';
        // Aqui coloco o direcionamento
        categoryLink.addEventListener('click', () => {
          getCategoryNames();
        });
        contentBox.appendChild(categoryLink);

        categoryList.push(categoryCard);
        // console.log(categoryList.length);
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

//Get all category names
function getCategoryNames() {
  const categoryNamesList = document.querySelectorAll('.categoryName');
  categoryNamesList[0].classList.add('activedCategory');
  categoryNamesList.forEach((e) =>
    e.addEventListener('click', () => {
      categoriesCourseCardsBox.innerHTML = '';
      let categoryName = e.innerText;
      let categoryId = e.id;
      console.log(`Nome da Categoria: ${categoryName} e id: ${categoryId}`);
      if (categoryId === '00000') {
        location.reload();
      } else {
        categoryNamesList[0].classList.remove('activedCategory');
        document.addEventListener('click', (e) => {
          const elCkd = e.target;

          categoryNamesList.forEach((e) => {
            if (elCkd.id === e.id) {
              e.classList.add('activedCategory');
              coursesCategoriesTitle.innerHTML = categoryName;

              // courseSpecificList.length = 0;
              // console.log(courseSpecificList.length);
              // console.log(courseSpecificList);

              // Object.keys(courseSpecificList).forEach((key) => {
              //   allList[key].length = 0;
              // });
              showSizeList(categoryId);
            } else {
              e.classList.remove('activedCategory');
            }
          });
        });
      }
    })
  );
  // console.log(categoryNamesList[3].id);
  // console.log(categoryNamesList.length);
}

function fetchSpecificCategory(categoryId) {
  try {
    let urlSearch = initUrl + jsonSpecificCategory + categoryId;
    fetch(urlSearch)
      .then((answer) => answer.json())
      .then((json) => {
        getSpecificCategory(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

function getSpecificCategory(json) {
  try {
    // console.log(json);
    // console.log(json.coursesList.course.length);
    if (json.coursesList.course.length) {
      for (let cl = 0; cl < json.coursesList.course.length; cl++) {
        let curseId = json.coursesList.course[cl].id;
        let curseImg = json.coursesList.course[cl].img;
        let courseName = json.coursesList.course[cl].title;
        let curseCategoryName = json.coursesList.course[cl].categoria.name;
        let curseCategoryId = json.coursesList.course[cl].categoria.id;
        let ysnPacote = json.coursesList.course[cl].ysnPacote;

        //Get course card
        let courseCard = document.createElement('div');
        courseCard.id = curseId;
        courseCard.classList.add('coursesCategoriesCard');
        categoriesCourseCardsBox.appendChild(courseCard);

        //Get course card image box
        let courseImgBox = document.createElement('div');
        courseImgBox.classList.add('coursesCategoriesCardImg');
        courseCard.appendChild(courseImgBox);

        //Get course image
        let courseImg = document.createElement('img');
        courseImg.classList.add('categoryCardImg');
        courseImg.setAttribute('src', `${initUrl}${curseImg}`);
        courseImg.setAttribute('alt', 'Image');
        courseImgBox.appendChild(courseImg);

        //Get course detail content
        let courseDetailBox = document.createElement('div');
        courseDetailBox.classList.add('coursesCategoriesCardContent');
        courseCard.appendChild(courseDetailBox);

        //Get course name
        let cardCourseName = document.createElement('p');
        cardCourseName.classList.add('coursesCategoriesCardTitle');
        cardCourseName.innerHTML = courseName;
        courseDetailBox.appendChild(cardCourseName);

        //Get course category
        let cardCourseCategory = document.createElement('p');
        cardCourseCategory.classList.add('coursesCategoriesCardCategory');
        cardCourseCategory.id = curseCategoryId;
        cardCourseCategory.innerHTML = curseCategoryName;
        courseDetailBox.appendChild(cardCourseCategory);

        //Create more course detail button
        let showMoreBtn = document.createElement('a');
        showMoreBtn.classList.add('coursesCategoriesCardsLink');
        showMoreBtn.innerHTML = 'Saiba mais →';
        courseDetailBox.appendChild(showMoreBtn);

        courseSpecificList.push(courseCard);
        // console.log(courseSpecificList.length);
      }
    } else {
      let curseId = json.coursesList.course.id;
      let curseImg = json.coursesList.course.img;
      let courseName = json.coursesList.course.title;
      let curseCategoryName = json.coursesList.course.categoria.name;
      let curseCategoryId = json.coursesList.course.categoria.id;
      let ysnPacote = json.coursesList.course.ysnPacote;

      //Get course card
      let courseCard = document.createElement('div');
      courseCard.id = curseId;
      courseCard.classList.add('coursesCategoriesCard');
      categoriesCourseCardsBox.appendChild(courseCard);

      //Get course card image box
      let courseImgBox = document.createElement('div');
      courseImgBox.classList.add('coursesCategoriesCardImg');
      courseCard.appendChild(courseImgBox);

      //Get course image
      let courseImg = document.createElement('img');
      courseImg.classList.add('categoryCardImg');
      courseImg.setAttribute('src', `${initUrl}${curseImg}`);
      courseImg.setAttribute('alt', 'Image');
      courseImgBox.appendChild(courseImg);

      //Get course detail content
      let courseDetailBox = document.createElement('div');
      courseDetailBox.classList.add('coursesCategoriesCardContent');
      courseCard.appendChild(courseDetailBox);

      //Get course name
      let cardCourseName = document.createElement('p');
      cardCourseName.classList.add('coursesCategoriesCardTitle');
      cardCourseName.innerHTML = courseName;
      courseDetailBox.appendChild(cardCourseName);

      //Get course category
      let cardCourseCategory = document.createElement('p');
      cardCourseCategory.classList.add('coursesCategoriesCardCategory');
      cardCourseCategory.id = curseCategoryId;
      cardCourseCategory.innerHTML = curseCategoryName;
      courseDetailBox.appendChild(cardCourseCategory);

      //Create more course detail button
      let showMoreBtn = document.createElement('a');
      showMoreBtn.classList.add('coursesCategoriesCardsLink');
      showMoreBtn.innerHTML = 'Saiba mais →';
      courseDetailBox.appendChild(showMoreBtn);

      courseSpecificList.push(courseCard);
      // console.log(courseSpecificList.length);
    }
  } catch (e) {
    console.warn(e);
  }
}
function showSizeList(categoryId) {
  // courseSpecificList.length = 0;
  courseSpecificList.splice(0, courseSpecificList.length);
  console.log(courseSpecificList);

  fetchSpecificCategory(categoryId);
}
// End of Course categories

// Footer Section
const logoFooterBox = document.querySelector('.footerEnd');
const socialMediaBox = document.querySelector('.footerSocialMediaIconBox');
const footerInfoBox = document.querySelector('.footerInfoBox');

let footerLinkBox = document.createElement('div');
footerLinkBox.classList.add('linksCreatedJs');
footerInfoBox.appendChild(footerLinkBox);
let infoBoxLeftFooter = document.createElement('div');
infoBoxLeftFooter.classList.add('infoBoxLeftFooter');
footerLinkBox.appendChild(infoBoxLeftFooter);

serviceBox = document.createElement('div');
serviceBox.classList.add('serviceBox');
footerLinkBox.appendChild(serviceBox);
//Politic link
let footerPolicyLinks = document.createElement('a');
footerPolicyLinks.innerText = 'Política e Privacidade';
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Política de Privacidade') {
    footerPolicyLinks.setAttribute(
      'href',
      `${initUrl}/pages/${pageLinksList[i].id}/Política de Privacidade`
    );
  }
}
footerPolicyLinks.classList.add('OurCoursesLinks');
serviceBox.appendChild(footerPolicyLinks);
//Use terms link
let footerUseTermsLink = document.createElement('a');
footerUseTermsLink.innerText = 'Termos de Uso';
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Termos de Uso') {
    footerUseTermsLink.setAttribute(
      'href',
      `${initUrl}/pages/${pageLinksList[i].id}/Termos de Uso`
    );
  }
}
footerUseTermsLink.classList.add('OurCoursesLinks');
serviceBox.appendChild(footerUseTermsLink);
//navbarLinks
try {
  for (let i = 0; i < pageLinksList.length; i++) {
    for (let e = 0; e < navbarLinks.length; e++) {
      if (pageLinksList[i].page === navbarLinks[e].textContent) {
        let pageId = pageLinksList[i].id;
        let links = navbarLinks[e].textContent;
        let modifiedLink = links.replace(' ', '-');
        let navBarCopy = document.createElement('a');
        navBarCopy.innerHTML = links;
        navBarCopy.setAttribute(
          'href',
          `${initUrl}/pages/${pageId}/${modifiedLink}`
        );
        infoBoxLeftFooter.appendChild(navBarCopy);
      }
    }
  }
} catch (e) {
  console.warn(e);
}

//Footer logo
function getFooterInfo(json) {
  try {
    let logoSite = json.logo;
    let linkToLogo = document.createElement('a');
    for (let i = 0; i < pageLinksList.length; i++) {
      if (pageLinksList[i].page === 'Home') {
        let homePageId = pageLinksList[i].id;
        linkToLogo.setAttribute('href', `${initUrl}/pages/${homePageId}/Home`);
      }
    }
    logoFooterBox.prepend(linkToLogo);
    let logoImg = document.createElement('img');
    logoImg.setAttribute('src', `${initUrl + logoSite}`);
    logoImg.setAttribute('alt', 'Logo image');
    linkToLogo.appendChild(logoImg);
  } catch (e) {
    console.warn(e);
  }
}

function getSocialMediaFooter(json) {
  try {
    let howManySocialMedia = json.socialMedias.links.length;
    for (let i = 0; i < howManySocialMedia; i++) {
      let socailMediaName = json.socialMedias.links[i].icon;
      let socialMediaLink = document.createElement('a');
      socialMediaLink.setAttribute('href', json.socialMedias.links[i].href);
      socialMediaLink.setAttribute('target', '_blank');
      let socialMediaIcon = document.createElement('i');
      socialMediaIcon.classList.add('fa-brands');
      socialMediaIcon.classList.add(`fa-${socailMediaName}`);
      socialMediaLink.appendChild(socialMediaIcon);
      socialMediaBox.appendChild(socialMediaLink);
    }
  } catch (e) {
    console.warn(e);
  }
}
function fetchMenuInfo() {
  try {
    fetch(`${initUrl}${jsonFile}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getSocialMediaFooter(json);
      });
  } catch (e) {
    null;
  }
}
// End Footer Section

//Call functions
fetchJsonNavbarLinks();
fetchMenuInfo();
fetchJsonProductCategoryList();
