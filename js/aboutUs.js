//Get actually URL
let siteProt = location.protocol + '//';
let siteHost = location.host;
let jsonFile = '/api/getJson.aspx?type=home';
// let courseId = 241292; //idDoCurso;// TIRAR VALOR PARA O GRAPE, DEIXAR APENAS A VARIÁVEL CRIADA.
// let categoryId;

//Global variable
const frontUrl = siteProt + siteHost;
let menuInfo = '/api/getJson.aspx?type=menu';
let formLogo = document.querySelector('.formLogo');

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
        linkToLogo.setAttribute('href', pageLinksList[i].id);
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
        navbarLinks[e].setAttribute('href', pageLinksList[i].id);
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
    coletaLeadLogin.setAttribute('href', pageLinksList[i].id);
  }
}
//Register button
let registerNavbarBtn = document.querySelector('.registerNavbarBtn');
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Registre-se') {
    registerNavbarBtn.setAttribute('href', pageLinksList[i].id);
  }
}
// End of Navbar

//Testimonials section
function getTestimonials(json) {
  console.log(json);
  try {
    let testimoniesSection = document.querySelector('.testimonialSection');
    // let whoDo = document.querySelector('.testimonialsTitle');

    //Header section
    let institutionName = [
      ...document.querySelectorAll('[data-institute="instituteName"]'),
    ];
    institutionName.forEach((e) => {
      e.innerHTML = json.PortalEducacional || json.title;
    });
    //End of Header section

    let testimoniesBox = document.querySelector('.depoimentosSlide-list');
    let testimoniesList = document.querySelectorAll(
      '[data-slide="depoimentos-slide-item"]'
    );

    if (json.PortalEducacional)
      if (json.testimonies) {
        //   institutionName.innerHTML = json.PortalEducacional;
        let count = -1;
        for (let i = 0; i < json.testimonies.quotes.length; i++) {
          count++;
          //Eacth testimonies
          let testimoniesBoxes = document.createElement('div');
          testimoniesBoxes.classList.add('depoimentosSlide-item');
          testimoniesBoxes.dataset.slide = 'depoimentos-slide-item';
          testimoniesBoxes.dataset.indice = testimoniesList.length + count;
          testimoniesBox.appendChild(testimoniesBoxes);
          //Intern box
          let internBox = document.createElement('div');
          internBox.classList.add('internBox');
          testimoniesBoxes.appendChild(internBox);
          //Testimonies content
          let contents = document.createElement('div');
          contents.classList.add('depoimentosSlide-content');
          internBox.appendChild(contents);
          //Icon
          let icons = document.createElement('i');
          icons.classList.add('aspasDepoimentos');
          // icons.innerHTML = 'format_quote';
          icons.innerHTML = ',,';
          contents.appendChild(icons);
          //Content text box
          let contentTextBox = document.createElement('div');
          contentTextBox.classList.add('contentTextBox');
          contents.appendChild(contentTextBox);
          //Testimonies text
          let testimoniesText = document.createElement('p');
          testimoniesText.classList.add('txtDepoimentos');
          testimoniesText.innerHTML = json.testimonies.quotes[i].excerpt;
          contentTextBox.appendChild(testimoniesText);
          //footer box
          let footerBox = document.createElement('div');
          footerBox.classList.add('footerBox');
          internBox.appendChild(footerBox);
          //Author name
          let authorName = document.createElement('p');
          authorName.classList.add('nomeAutorDepoimento');
          authorName.innerHTML = json.testimonies.quotes[i].author;
          footerBox.appendChild(authorName);
          //Course
          let courseName = document.createElement('p');
          courseName.classList.add('redeScAutorDepoimento');
          courseName.innerHTML = json.testimonies.quotes[i].course;
          footerBox.appendChild(courseName);
        }
      } else if (!json.testimonies) {
        testimoniesSection.style.display = 'none';
      }
    testimonioalSlideEvents();
  } catch (e) {
    console.warn(e);
  }
}
function testimonioalSlideEvents() {
  try {
    const depoimentosSlideWrapper = document.querySelector(
      '[data-slide="depoimentosSlide-wrapper"]'
    );
    const depoimentosSlideList = document.querySelector(
      '[data-slide="depoimentos-slide-list"]'
    );
    const depoimentosPreviousBtn = document.querySelector(
      '[data-slide="depoimentos-previous-btn"]'
    );
    const depoimentosNextBtn = document.querySelector(
      '[data-slide="depoimentos-next-btn"]'
    );
    const depoimentosControlsWapper = document.querySelector(
      '[data-slide="depoimentos-slide-controls-wrapper"]'
    );
    let depoimentosSlideItems = document.querySelectorAll(
      '[data-slide="depoimentos-slide-item"]'
    );
    let depoimentosControlButtons;
    let depoimentosSlideInterval;

    const depoimentosState = {
      depoimentosStartingPoint: 0,
      depoimentosSavedPosition: 0,
      depoimentosCurrentPoint: 0,
      depoimentosMovement: 0,
      CurrentDepoimentosSlideIndex: 0,
      depoimentosAutoPlay: true,
      depoimentosTimeInterval: 0,
    };

    //Mudar slides
    function translateDepoimentosSlide({ depoimentosPosition }) {
      depoimentosState.depoimentosSavedPosition = depoimentosPosition;
      depoimentosSlideList.style.transform = `translateX(${depoimentosPosition}px)`;
    }

    function getCenterDepoimentosPosition({ indice }) {
      const depoimentosSlideItem = depoimentosSlideItems[indice];
      const depoimentosSlideWidth = depoimentosSlideItem.clientWidth;
      const windowDepoimentosWidth = document.body.clientWidth;
      const marginDepoimentos =
        (windowDepoimentosWidth - depoimentosSlideWidth) / 2;
      const depoimentosPosition =
        marginDepoimentos - indice * depoimentosSlideWidth;
      return depoimentosPosition;
    }

    function setVisibleDepoimentosSlide({ indice, animateDepoimentos }) {
      if (indice === 0 || indice === depoimentosSlideItems.length - 1) {
        indice = depoimentosState.CurrentDepoimentosSlideIndex;
      }
      const depoimentosPosition = getCenterDepoimentosPosition({ indice });
      depoimentosState.CurrentDepoimentosSlideIndex = indice;
      depoimentosSlideList.style.transition =
        animateDepoimentos === true ? 'transform 1s' : 'none';
      activeDepoimentosControlButton({ indice });
      translateDepoimentosSlide({ depoimentosPosition: depoimentosPosition });
    }

    function nextDepoimentosSlide() {
      setVisibleDepoimentosSlide({
        indice: depoimentosState.CurrentDepoimentosSlideIndex + 1,
        animateDepoimentos: true,
      });
    }

    function previousDepoimentosSlide() {
      setVisibleDepoimentosSlide({
        indice: depoimentosState.CurrentDepoimentosSlideIndex - 1,
        animateDepoimentos: true,
      });
    }

    function createDepoimentosControlButtons() {
      depoimentosSlideItems.forEach(function () {
        const depoimentosControlButton = document.createElement('button');
        depoimentosControlButton.classList.add(
          'depoimentosSlide-control-button'
        );
        depoimentosControlButton.classList.add('fas');
        depoimentosControlButton.classList.add('fa-circle');
        depoimentosControlButton.dataset.slide = 'depoimentos-control-btn';
        depoimentosControlsWapper.append(depoimentosControlButton);
      });
    }

    function activeDepoimentosControlButton({ indice }) {
      const depoimentosSlideItem = depoimentosSlideItems[indice];
      const dataIndice = Number(depoimentosSlideItem.dataset.indice);
      const depoimentosControlButton = depoimentosControlButtons[dataIndice];
      depoimentosControlButtons.forEach(function (
        depoimentosControlButtonItem
      ) {
        depoimentosControlButtonItem.classList.remove('activeDepoimentos');
      });
      if (depoimentosControlButton)
        depoimentosControlButton.classList.add('activeDepoimentos');
    }

    function createDepoimentosSlideClone() {
      const firstDepoimentosSlide = depoimentosSlideItems[0].cloneNode(true);
      firstDepoimentosSlide.classList.add('depoimentosSlide-cloned');
      firstDepoimentosSlide.dataset.indice = depoimentosSlideItems.length;

      const secundDepoimentosSlide = depoimentosSlideItems[1].cloneNode(true);
      secundDepoimentosSlide.classList.add('depoimentosSlide-cloned');
      secundDepoimentosSlide.dataset.indice = depoimentosSlideItems.length + 1;

      const lastDepoimentosSlide =
        depoimentosSlideItems[depoimentosSlideItems.length - 1].cloneNode(true);
      lastDepoimentosSlide.classList.add('depoimentosSlide-cloned');
      lastDepoimentosSlide.dataset.indice = -1;

      const penultimateDepoimentosSlide =
        depoimentosSlideItems[depoimentosSlideItems.length - 2].cloneNode(true);
      penultimateDepoimentosSlide.classList.add('depoimentosSlide-cloned');
      penultimateDepoimentosSlide.dataset.indice = -2;

      //Criar no final da lista
      depoimentosSlideList.append(firstDepoimentosSlide);
      depoimentosSlideList.append(secundDepoimentosSlide);
      //Criar no início da lista
      depoimentosSlideList.prepend(lastDepoimentosSlide);
      depoimentosSlideList.prepend(penultimateDepoimentosSlide);

      depoimentosSlideItems = document.querySelectorAll(
        '[data-slide="depoimentos-slide-item"]'
      );
    }

    //Apertar
    function onDepoimentosMouseDown(evento, indice) {
      const depoimentosSlideItem = evento.currentTarget;
      depoimentosState.depoimentosStartingPoint = evento.clientX;
      depoimentosState.depoimentosCurrentPoint =
        depoimentosState.depoimentosStartingPoint -
        depoimentosState.depoimentosSavedPosition;
      depoimentosState.diaDiaCurrentSlideindice = indice;
      depoimentosSlideList.style.transition = 'none';
      depoimentosSlideItem.addEventListener(
        'mousemove',
        onDepoimentosMouseMove
      );
    }
    //Evento de mover mouse
    function onDepoimentosMouseMove(evento, indice) {
      depoimentosState.depoimentosMovement =
        evento.clientX - depoimentosState.depoimentosStartingPoint;
      const depoimentosPosition =
        evento.clientX - depoimentosState.depoimentosCurrentPoint;
      translateDepoimentosSlide({ depoimentosPosition });
    }
    //Soltar
    function noDepoimentosMouseUp(evento) {
      const pointsToMoveDepoimentos = evento.type.includes('touch') ? 50 : 150;
      // console.log(evento.type);
      const depoimentosSlideItem = evento.currentTarget;
      if (depoimentosState.depoimentosMovement < -pointsToMoveDepoimentos) {
        nextDepoimentosSlide();
      } else if (
        depoimentosState.depoimentosMovement > pointsToMoveDepoimentos
      ) {
        previousDepoimentosSlide();
      } else {
        setVisibleDepoimentosSlide({
          indice: depoimentosState.CurrentDepoimentosSlideIndex,
          animateDepoimentos: true,
        });
      }

      depoimentosSlideItem.removeEventListener(
        'mousemove',
        onDepoimentosMouseMove
      );
    }

    function onDepoimentosTouchStart(evento, indice) {
      evento.clientX = evento.touches[0].clientX;
      onDepoimentosMouseDown(evento, indice);
      const depoimentosSlideItem = evento.currentTarget;
      depoimentosSlideItem.addEventListener(
        'touchmove',
        onDepoimentosTouchMove
      );
    }

    function onDepoimentosTouchMove(evento) {
      evento.clientX = evento.touches[0].clientX;
      onDepoimentosMouseMove(evento);
    }
    function onDepoimentosTouchEnd(evento) {
      noDepoimentosMouseUp(evento);
      const depoimentosSlideItem = evento.currentTarget;
      depoimentosSlideItem.removeEventListener(
        'touchmove',
        onDepoimentosTouchMove
      );
    }

    function onDepoimentosControlButtonClick(indice) {
      setVisibleDepoimentosSlide({
        indice: indice + 2,
        animateDepoimentos: true,
      });
    }

    function onDepoimentosSlideListTransitionEnd() {
      const depoimentosSlideItem =
        depoimentosSlideItems[depoimentosState.CurrentDepoimentosSlideIndex];

      if (
        depoimentosSlideItem.classList.contains('depoimentosSlide-cloned') &&
        Number(depoimentosSlideItem.dataset.indice) > 0
      ) {
        setVisibleDepoimentosSlide({ indice: 2, animateDepoimentos: false });
      }
      if (
        depoimentosSlideItem.classList.contains('depoimentosSlide-cloned') &&
        Number(depoimentosSlideItem.dataset.indice) < 0
      ) {
        setVisibleDepoimentosSlide({
          indice: depoimentosSlideItems.length - 3,
          animateDepoimentos: false,
        });
      }
    }

    function setDepoimentosAutoPlay() {
      if (depoimentosState.depoimentosAutoPlay) {
        depoimentosSlideInterval = setInterval(function () {
          setVisibleDepoimentosSlide({
            indice: depoimentosState.CurrentDepoimentosSlideIndex + 1,
            animateDepoimentos: true,
          });
        }, depoimentosState.depoimentosTimeInterval);
      }
    }

    function setDepoimentosListeners() {
      depoimentosControlButtons = document.querySelectorAll(
        '[data-slide="depoimentos-control-btn"]'
      );
      depoimentosSlideItems = document.querySelectorAll(
        '[data-slide="depoimentos-slide-item"]'
      );

      //Adicionar evento nos indicatons
      depoimentosControlButtons.forEach(function (
        depoimentosControlButton,
        indice
      ) {
        depoimentosControlButton.addEventListener('click', function (evento) {
          onDepoimentosControlButtonClick(indice);
        });
      });

      //Eventos do mouse
      depoimentosSlideItems.forEach(function (depoimentosSlideItem, indice) {
        //Arrastar
        depoimentosSlideItem.addEventListener('dragstart', function (evento) {
          evento.preventDefault();
        });
        //Apertar
        depoimentosSlideItem.addEventListener('mousedown', function (evento) {
          onDepoimentosMouseDown(evento, indice);
        }),
          //Soltar no mobile
          depoimentosSlideItem.addEventListener(
            'mouseup',
            noDepoimentosMouseUp
          );

        //Apertar no mobile
        depoimentosSlideItem.addEventListener('touchstart', function (evento) {
          onDepoimentosTouchStart(evento, indice);
        }),
          //Soltar
          depoimentosSlideItem.addEventListener(
            'touchend',
            onDepoimentosTouchEnd
          );
      });

      depoimentosNextBtn.addEventListener('click', nextDepoimentosSlide);
      depoimentosPreviousBtn.addEventListener(
        'click',
        previousDepoimentosSlide
      );

      //Evento para voltar o slide de forma que o usuário não perceba
      depoimentosSlideList.addEventListener(
        'transitionend',
        onDepoimentosSlideListTransitionEnd
      );
      depoimentosSlideWrapper.addEventListener('mouseenter', function () {
        clearInterval(depoimentosSlideInterval);
      });
      depoimentosSlideWrapper.addEventListener('mouseleave', function () {
        setDepoimentosAutoPlay();
      });

      //Manter posicionamento padrão
      let depoimentosResizeTimeOut;
      window.addEventListener('resize', function () {
        clearTimeout(depoimentosResizeTimeOut);
        depoimentosResizeTimeOut = setTimeout(function () {
          setVisibleDepoimentosSlide({
            indice: depoimentosState.CurrentDepoimentosSlideIndex,
            animateDepoimentos: true,
          });
        }, 500);
      });
    }

    function initDepoimentosSlider({
      startAtIndice = 0,
      depoimentosAutoPlay = true,
      depoimentosTimeInterval = 3000,
    }) {
      depoimentosState.depoimentosAutoPlay = depoimentosAutoPlay;
      depoimentosState.depoimentosTimeInterval = depoimentosTimeInterval;
      createDepoimentosControlButtons();
      createDepoimentosSlideClone();
      setDepoimentosListeners();
      setVisibleDepoimentosSlide({
        indice: startAtIndice + 2,
        animateDepoimentos: true,
      });
      setDepoimentosAutoPlay();
    }

    initDepoimentosSlider({
      depoimentosAutoPlay: true,
      startAtIndice: 0,
      depoimentosTimeInterval: 3000,
    });
  } catch (e) {
    console.warn(e);
  }
}
//End of Testimonials section

// Footer Section
const logoFooterBox = document.querySelector('.footerEnd');
const socialMediaBox = document.querySelector('.footerSocialMediaIconBox');
const footerInfoBox = document.querySelector('.footerInfoBox');

// $('.linksCreatedJs').remove();
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
    footerPolicyLinks.setAttribute('href', pageLinksList[i].id);
  }
}
footerPolicyLinks.classList.add('OurCoursesLinks');
serviceBox.appendChild(footerPolicyLinks);
//Use terms link
let footerUseTermsLink = document.createElement('a');
footerUseTermsLink.innerText = 'Termos de Uso';
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Termos de Uso') {
    footerUseTermsLink.setAttribute('href', pageLinksList[i].id);
  }
}
footerUseTermsLink.classList.add('OurCoursesLinks');
serviceBox.appendChild(footerUseTermsLink);
//navbarLinks
try {
  for (let i = 0; i < pageLinksList.length; i++) {
    for (let e = 0; e < navbarLinks.length; e++) {
      if (pageLinksList[i].page === navbarLinks[e].textContent) {
        let links = navbarLinks[e].textContent;
        let navBarCopy = document.createElement('a');
        navBarCopy.innerHTML = links;
        navBarCopy.setAttribute('href', pageLinksList[i].id);
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
        linkToLogo.setAttribute('href', pageLinksList[i].id);
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
    for (let i = 0; i <= howManySocialMedia; i++) {
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
        getTestimonials(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
// End Footer Section

//Call functions
fetchJsonNavbarLinks();
fetchMenuInfo();
// fetchCoursesDetals();
// fetchallJsonCourseCategories();
