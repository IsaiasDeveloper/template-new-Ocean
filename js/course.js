//Simular um link de curso para página de detalhe
let pageUrl = '/page/397428/Agente Ambiental?courseId=242178&ysnPacote=1';

//Get actually URL
let siteProt = location.protocol + '//';
let siteHost = location.host;
let jsonFile = '/api/getJson.aspx?type=home';
let courseId = 241292; //idDoCurso;// TIRAR VALOR PARA O GRAPE, DEIXAR APENAS A VARIÁVEL CRIADA.
let categoryId;

//65075 → maquiagem-completa (false topic.resume)

//258556 → Gestão Inovação
//246873 → Asst. Infermagem //VERIFICAR PALAVRA CÂNCER

//241988 → Aux. Almoxerif. com combo

//64995 → assistente-administrativo (carga hor)
//65052 → operador-de-caixa  ( carga hor)

//101301 → especializacao-em-contabili.- FORM ON END (no carga Hor/false topic)
//334739 → Esp.Téc. Enferm.(no carga Hor/false topic)
//174635 → EJA - FORM ON END (no carga Hor/false topic)

//84843 → Inglês (no topic)
//244644 → retencao-de-talentos (no topic)
//106808 → 365 dias (no topic)
//242178 → Agente ambiental(no topic)

//84828 → perito-contabil  (no topic / NÃO SEI ONDE ESTA O CONTÉUDO)
//84846 → filosofoa (no topic / NÃO SEI ONDE ESTA O CONTÉUDO)
//242001 → A lmoxarife (no topic / NÃO SEI ONDE ESTA O CONTÉUDO)
//242019 → Web-designer (no topic / NÃO SEI ONDE ESTA O CONTÉUDO)
//241997 → Auxiliar Contabil (no topic / NÃO SEI ONDE ESTA O CONTÉUDO)

//100615 → grad. adm (no topic / no carga Hor)

// const frontUrl = siteProt + siteHost;

// let initUrl = frontUrl;  //No Grape devo descomentar essa variável

//Global variable
const frontUrl = siteProt + siteHost;
let menuInfo = '/api/getJson.aspx?type=menu';

// let initUrl = frontUrl;  //No Grape devo descomentar essa variável

let initUrl = 'https://euestudo.com.vc'; //No Grape devo Comentar essa variável //https://espg.com.br/
// let initUrl = 'https://catalogo.drmeducacao.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://espg.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://faculdadesucesso.edu.br'; //Tem 3 emphasis
// let initUrl = 'https://uniflor.edu.br'; //Tem 9 emphasis
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

//Get type of fetch
//NO GRAPE EXCLUIR A PRÓXIMA LINHA ↓
let urlParams = new URL(
  `${initUrl}?courseId=244661&ysnPacote=0&categoryId=215485&novapap=454048`
).search
  .substring(1)
  .split('&');

// let urlParams = window.location.search.substring(1).split('&');
let urlParamArray = {};
for (let i = 0; i < urlParams.length; i++) {
  let param = urlParams[i].split('=');
  urlParamArray[param[0]] = param[1];
  novapap = urlParamArray['novapap'];
  courseId = urlParamArray['courseId'];
  categoryId = urlParamArray['categoryId'];
  boaBolsaUserId = urlParamArray['boaBolsaUserId'];
  ysnPacote = urlParamArray['ysnPacote'];
}

//courseId=242178&ysnPacote=1
// console.log(urlParamArray['ysnPacote']);
// console.log(urlParamArray);

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

//Header section
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
// End of Header section

//Get parameters from Current URL
function getCurrentUrl() {
  let middleGetUrl;
  if (urlParamArray['ysnPacote']) {
    if (urlParamArray['ysnPacote'] === 0) {
      middleGetUrl = '/api/getJson.aspx?type=course_details&courseId=';
    } else {
      middleGetUrl = '/api/getJson.aspx?type=combo_details&comboId=';
    }
  }
  let detalNewPage = `${initUrl}${middleGetUrl}${courseId}`;

  return detalNewPage;
}
let detailsData = getCurrentUrl();
//End of get parameters from Current URL

// Header section
function fetchCoursesDetals() {
  //tbm trás o video
  try {
    fetch(detailsData)
      .then((answer) => answer.json())
      .then((json) => {
        getCoursesHeader(json);
        // getCourseDetails(json);
        getCoursesPrice(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

let headerSecton = document.querySelector('.headerSection');
let headerTitle = document.querySelector('.headerTitle');
let workload = document.querySelector('.workload');

function getCoursesHeader(json) {
  try {
    console.log(json);
    let headerImg = document.createElement('div');
    headerImg.style.backgroundImage = `url(${initUrl}${json.intro.background})`;
    headerImg.classList.add('headerImg');
    headerSecton.appendChild(headerImg);

    headerTitle.innerHTML = json.intro.title;
    workload.innerHTML = json.intro.specs.workload;

    if (json.intro.embed) {
      videoBtn.style.display = 'flex';
      videoBtn.addEventListener('click', () => {
        videoWindow.style.display = 'flex';
        fetchApiVideo();
      });
    } else {
      videoBtn.style.display = 'none';
    }
  } catch (e) {
    console.warn(e);
  }
}
// End of Header section

//Video popup
let videoBtn = document.querySelector('[data-show-video="show-video"]');
let videoWindow = document.querySelector('.videoWindow');
let videoClosedIcon = document.querySelector('.videoClosedBtnBox div');
let closedBtnTitleVideo = document.querySelector('.videoClosedBtnBox');
let popupVideo = document.querySelector('.contentVideoWindow');

function fetchApiVideo() {
  try {
    fetch(detailsData)
      .then((answer) => answer.json())
      .then((json) => {
        createVideoComponet(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

videoClosedIcon.addEventListener('click', () => {
  document.querySelector('.courseVideoTitle').innerHTML = '';
  videoWindow.style.display = 'none';
  popupVideo.innerHTML = '';
  let video = document.querySelector('.video');
  video.parentNode.removeChild(video);
});

function createVideoComponet(json) {
  try {
    //Video box
    //To not show the videos on the page
    let APIVideo = json.intro.embed;
    //Title
    let courseVideoTitle = document.createElement('p');
    courseVideoTitle.classList.add('courseVideoTitle');
    courseVideoTitle.innerHTML = 'Faça uma aula demonstrativa';
    closedBtnTitleVideo.prepend(courseVideoTitle);
    //Video div
    let videoBox = document.createElement('div');
    videoBox.classList.add('videoBox');
    popupVideo.appendChild(videoBox);
    //Video
    let video = document.createElement('embed');
    video.setAttribute('src', APIVideo);
    video.setAttribute('allowfullscreen', 'true');
    video.classList.add('video');
    videoBox.appendChild(video);

    console.log('foi...');
  } catch (e) {
    console.warn(e);
  }
}
// End of Video popup

// Boa Bolsa popup
//Get Html elements
let boaBolsaWindow = document.querySelector('.boaBolsaSection');
let userName = document.querySelector('.nameUser');
let userImage = document.querySelector('.boaBolsaHeaderUserImgBox');

if (urlParamArray['novapap']) {
  let novapap = urlParamArray['novapap'];
  fetchInfoBoaBolsaPopup(novapap);
}

function fetchInfoBoaBolsaPopup(novapap) {
  try {
    fetch(
      `${initUrl}/online/cs/html5/ConectorSQL.aspx?IdObj=51&idNegocio=1&request=7&IdSQL=906&type=2&Param=${novapap}`
    )
      .then((resposta) => resposta.text())
      .then((str) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, 'text/xml');
        createBoaBolsaPopup(xmlDoc);
      });
  } catch (e) {
    console.warn(e);
  }
}

function createBoaBolsaPopup(xmlDoc) {
  try {
    // acessando os elementos do XML
    const nome = xmlDoc.getElementsByTagName('strNome')[0].textContent;
    const foto = xmlDoc.getElementsByTagName('urlFoto')[0].textContent;

    boaBolsaWindow.style.display = 'block';
    userImage.style.backgroundImage = `url(${foto})`;
    userName.innerHTML = nome;
    closedBoaBolsaWindow(boaBolsaWindow);
    if (boaBolsaWindow.style.display === 'block') {
      setTimeout(timeForClosed, 8000);
    }
  } catch (e) {
    console.warn(e);
  }
}

function closedBoaBolsaWindow(boaBolsaWindow) {
  boaBolsaWindow.addEventListener('click', () => {
    boaBolsaWindow.style.display = 'none';
  });
}
function timeForClosed() {
  boaBolsaWindow.style.display = 'none';
}
// End of Boa Bolsa popup

// End of Price section
const priceSection = document.querySelector('.priceSection');
const oldPriceValues = document.querySelector('.oldPrice');
let priceLink = document.querySelector('.priceLink');
let parceals = document.querySelectorAll('[data-parcels="parcels"]');
let oldPriceInt = document.querySelector('.oldPriceDec');
let oldPriceDec = document.querySelector('.oldPriceCent');
let correntPriceInt = document.querySelector('.correntPriceDec');
let correntPriceDec = document.querySelector('.correntPriceCent');
console.log(parceals);
function getCoursesPrice(json) {
  try {
    if (json.intro.price) {
      priceLink.innerHTML = json.intro.titleIcon4;
      parceals.forEach((e) => (e.innerHTML = json.intro.price.parcials));
      correntPriceInt.innerHTML = json.intro.price.now.int;
      correntPriceDec.innerHTML = `,${json.intro.price.now.dec}`;
      if (json.intro.price.old) {
        oldPriceInt.innerHTML = json.intro.price.old.int;
        oldPriceDec.innerHTML = `,${json.intro.price.old.dec}`;
      } else {
        oldPriceValues.style.display = 'none';
      }
    } else {
      priceSection.style.display = 'none';
    }
  } catch (e) {
    console.warn(e);
  }
}

// Price section

//Testimonials section
function getTestimonials(json) {
  try {
    let testimoniesSection = document.querySelector('.testimonialSection');
    // let whoDo = document.querySelector('.testimonialsTitle');
    let institutionName = document.querySelector('.instituteName');

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
// End Footer Section

//Call functions
fetchJsonNavbarLinks();
fetchMenuInfo();
fetchCoursesDetals();
// fetchallJsonCourseCategories();
