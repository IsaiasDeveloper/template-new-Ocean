//Global variable
let siteProt = location.protocol + '//';
let siteHost = location.host;
const frontUrl = siteProt + siteHost;
let jsonFile = '/api/getJson.aspx?type=home';
let menuInfo = '/api/getJson.aspx?type=menu';

// let initUrl = frontUrl;  //No Grape devo descomentar essa variável

// let initUrl = 'https://euestudo.com.vc'; //No Grape devo Comentar essa variável //https://espg.com.br/
let initUrl = 'https://catalogo.drmeducacao.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://espg.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://faculdadesucesso.edu.br'; //Tem 3 emphasis
// let initUrl = 'https://uniflor.edu.br'; //Tem 9 emphasis
// let initUrl = 'http://facigma.edu.br'; // SÓ ESSE ESTÁ DANDO ERRO! //
// let initUrl = 'https://reboucasdigital.com.br'; // SÓ ESSE ESTÁ DANDO ERRO! //

const pageLinksList = [
  { page: 'Home', id: '111111' },
  { page: 'Nossos Cursos', id: '222222' },
  { page: 'Quem Somos', id: '333333' },
  { page: 'Como Funciona', id: '44444' },
  { page: 'Contato', id: '55555' },
  { page: 'Curso', id: '66666' },
  { page: 'Política de Privacidade', id: '777777' },
  { page: 'Termos de Uso', id: '88888' },
  { page: 'Registre-se', id: '99999' },
  { page: 'Login', id: '101010' },
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

//Header section
function fetchMenuInfo() {
  try {
    fetch(`${initUrl}${jsonFile}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getHeaderSlide(json);
        getSocialMediaFooter(json);
        getTestimonials(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

function getHeaderSlide(json) {
  try {
    const headerSection = document.querySelector('header');
    const headerSlideBox = document.querySelector('.slide-list-header');
    const headerSlideItemList = document.querySelectorAll(
      '[data-slide="item-header"]'
    );
    const headerQuotaIcons = document.querySelectorAll(
      '.slide-nav-button-header'
    );

    if (json.topBanners) {
      if (json.topBanners.length <= 1 || json.topBanners.length === undefined) {
        const headerSliderBoxes = document.createElement('div');
        headerSliderBoxes.classList.add('slide-item-header');
        headerSlideBox.appendChild(headerSliderBoxes);

        const contents = document.createElement('div');
        contents.classList.add('slide-content-header');
        headerSliderBoxes.appendChild(contents);

        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${initUrl}${json.topBanners.banner.url}`);
        headerSliderBoxes.appendChild(imgLink);

        const deskTopImage = document.createElement('img');
        deskTopImage.classList.add(
          'slide-image-header',
          'desktop-image-header'
        );
        deskTopImage.setAttribute(
          'src',
          `${initUrl}${json.topBanners.banner.desktopImg}`
        );
        deskTopImage.setAttribute('alt', 'Desktop header banner');
        imgLink.appendChild(deskTopImage);

        const mobileImage = document.createElement('img');
        mobileImage.classList.add('slide-image-header', 'mobile-image-header');
        mobileImage.setAttribute(
          'src',
          `${initUrl}${json.topBanners.banner.mobileImg}`
        );
        mobileImage.setAttribute('alt', 'Mobile header banner');
        imgLink.appendChild(mobileImage);

        headerQuotaIcons.forEach((e) => (e.style.display = 'none'));
      } else {
        for (let i = 0; i < json.topBanners.length; i++) {
          const headerSliderBoxes = document.createElement('div');
          headerSliderBoxes.classList.add('slide-item-header');
          headerSliderBoxes.dataset.slide = 'item-header';
          headerSliderBoxes.dataset.idxheader = headerSlideItemList.length + i;
          headerSlideBox.appendChild(headerSliderBoxes);

          const contents = document.createElement('div');
          contents.classList.add('slide-content-header');
          headerSliderBoxes.appendChild(contents);

          const imgLink = document.createElement('a');
          imgLink.setAttribute('href', `${initUrl}${json.topBanners[i].url}`);
          headerSliderBoxes.appendChild(imgLink);

          const deskTopImage = document.createElement('img');
          deskTopImage.classList.add(
            'slide-image-header',
            'desktop-image-header'
          );
          deskTopImage.setAttribute(
            'src',
            `${initUrl}${json.topBanners[i].desktopImg}`
          );
          deskTopImage.setAttribute('alt', 'Desktop header banner');
          imgLink.appendChild(deskTopImage);

          const mobileImage = document.createElement('img');
          mobileImage.classList.add(
            'slide-image-header',
            'mobile-image-header'
          );
          mobileImage.setAttribute(
            'src',
            `${initUrl}${json.topBanners[i].mobileImg}`
          );
          mobileImage.setAttribute('alt', 'Mobile header banner');
          imgLink.appendChild(mobileImage);
        }
      }
    } else {
      headerSection.style.display = 'none';
      console.log('Não há banners na Api');
    }

    getEventHeaderSlide();
  } catch (e) {
    console.warn(e);
  }
}

function getEventHeaderSlide() {
  try {
    ('use strict');

    const slideWrapperHeader = document.querySelector(
      '[data-slide="wrapper-header"]'
    );
    const slideListHeader = document.querySelector(
      '[data-slide="list-header"]'
    );
    const navPreviousButtonHeader = document.querySelector(
      '[data-slide="nav-previous-button-header"]'
    );
    const navNextButtonHeader = document.querySelector(
      '[data-slide="nav-next-button-header"]'
    );
    const controlsWapperHeader = document.querySelector(
      '[data-slide="controls-wrapper-header"]'
    );
    let slideItemsHeader = document.querySelectorAll(
      '[data-slide="item-header"]'
    );
    let controlButtonsHeader;
    let slideIntervalHeader;

    const stateHeader = {
      startingPointHeader: 0,
      savedPositionHeader: 0,
      currentPointHeader: 0,
      movementHeader: 0,
      currentSlideIndexHeader: 0,
      autoPlayHeader: true,
      timeIntervalHeader: 0,
    };

    //Mudar slides
    function translateSlideHeader({ positionHeader }) {
      stateHeader.savedPositionHeader = positionHeader;
      slideListHeader.style.transform = `translateX(${positionHeader}px)`;
    }

    function getCenterPositionHeader({ idxheader }) {
      const slideItemHeader = slideItemsHeader[idxheader];
      const slideWidthHeader = slideItemHeader.clientWidth;
      const windowWidthHeader = document.body.clientWidth;
      const margin = (windowWidthHeader - slideWidthHeader) / 2;
      const positionHeader = margin - idxheader * slideWidthHeader;
      return positionHeader;
    }

    function setVisibleSlideHeader({ idxheader, animateHeader }) {
      if (idxheader === 0 || idxheader === slideItemsHeader.length - 1) {
        idxheader = stateHeader.currentSlideIndexHeader;
      }
      const positionHeader = getCenterPositionHeader({ idxheader });
      stateHeader.currentSlideIndexHeader = idxheader;
      slideListHeader.style.transition =
        animateHeader === true ? 'transform 1s' : 'none';
      activeControlButtonHeader({ idxheader });
      translateSlideHeader({ positionHeader: positionHeader });
    }

    function nextSlideHeader() {
      setVisibleSlideHeader({
        idxheader: stateHeader.currentSlideIndexHeader + 1,
        animateHeader: true,
      });
    }

    function previousSlideHeader() {
      setVisibleSlideHeader({
        idxheader: stateHeader.currentSlideIndexHeader - 1,
        animateHeader: true,
      });
    }

    function createControlButtonsHeader() {
      slideItemsHeader.forEach(function () {
        const controlButtonHeader = document.createElement('button');
        controlButtonHeader.classList.add('slide-control-button-header');
        controlButtonHeader.classList.add('fas');
        controlButtonHeader.classList.add('fa-circle');
        controlButtonHeader.dataset.slide = 'control-button-header';
        controlsWapperHeader.append(controlButtonHeader);
      });
    }

    function activeControlButtonHeader({ idxheader }) {
      const slideItemHeader = slideItemsHeader[idxheader];
      const dataIndexHeader = Number(slideItemHeader.dataset.idxheader);
      const controlButtonHeader = controlButtonsHeader[dataIndexHeader];
      controlButtonsHeader.forEach(function (controlButtonItem) {
        controlButtonItem.classList.remove('active');
      });
      if (controlButtonHeader) controlButtonHeader.classList.add('active');
    }

    function createSlideCloneHeader() {
      const firstSlideHeader = slideItemsHeader[0].cloneNode(true);
      firstSlideHeader.classList.add('slide-cloned');
      firstSlideHeader.dataset.idxheader = slideItemsHeader.length;

      const secundSlideHeader = slideItemsHeader[1].cloneNode(true);
      secundSlideHeader.classList.add('slide-cloned');
      secundSlideHeader.dataset.idxheader = slideItemsHeader.length + 1;

      const lastSlideHeader =
        slideItemsHeader[slideItemsHeader.length - 1].cloneNode(true);
      lastSlideHeader.classList.add('slide-cloned');
      lastSlideHeader.dataset.idxheader = -1;

      const penultimateSlideHeader =
        slideItemsHeader[slideItemsHeader.length - 2].cloneNode(true);
      penultimateSlideHeader.classList.add('slide-cloned');
      penultimateSlideHeader.dataset.idxheader = -2;

      //Criar no final da lista
      slideListHeader.append(firstSlideHeader);
      slideListHeader.append(secundSlideHeader);
      //Criar no início da lista
      slideListHeader.prepend(lastSlideHeader);
      slideListHeader.prepend(penultimateSlideHeader);

      slideItemsHeader = document.querySelectorAll(
        '[data-slide="item-header"]'
      );
    }

    //Apertar
    function onMouseDownHeader(eventHeader, idxheader) {
      const slideItemHeader = eventHeader.currentTarget;
      stateHeader.startingPointHeader = eventHeader.clientX;
      stateHeader.currentPointHeader =
        stateHeader.startingPointHeader - stateHeader.savedPositionHeader;
      stateHeader.currentSlideIndexHeader = idxheader;
      slideListHeader.style.transition = 'none';
      // slideItemHeader.addEventListener('mousemove', onMouseMoveHeader);
    }
    //Evento de mover mouse
    // function onMouseMoveHeader(eventHeader, index) {
    //   stateHeader.movementHeader = eventHeader.clientX - stateHeader.startingPointHeader;
    //   const positionHeader = eventHeader.clientX - stateHeader.currentPointHeader;
    //   translateSlideHeader({ positionHeader });
    // }
    //Soltar
    function noMouseUpHeader(eventHeader) {
      const pointsToMoveHeader = eventHeader.type.includes('touch') ? 50 : 150;
      // console.log(eventHeader.type);
      const slideItemHeader = eventHeader.currentTarget;
      if (stateHeader.movementHeader < -pointsToMoveHeader) {
        nextSlideHeader();
      } else if (stateHeader.movementHeader > pointsToMoveHeader) {
        previousSlideHeader();
      } else {
        setVisibleSlideHeader({
          idxheader: stateHeader.currentSlideIndexHeader,
          animateHeader: true,
        });
      }

      // slideItemHeader.removeEventListener('mousemove', onMouseMoveHeader);
    }

    function onTouchStartHeader(eventHeader, idxheader) {
      eventHeader.clientX = eventHeader.touches[0].clientX;
      onMouseDownHeader(eventHeader, idxheader);
      const slideItemHeader = eventHeader.currentTarget;
      slideItemHeader.addEventListener('touchmove', onTouchMoveHeader);
    }

    function onTouchMoveHeader(eventHeader) {
      eventHeader.clientX = eventHeader.touches[0].clientX;
      // onMouseMoveHeader(eventHeader);
    }
    function onTouchEndHeader(eventHeader) {
      noMouseUpHeader(eventHeader);
      const slideItemHeader = eventHeader.currentTarget;
      slideItemHeader.removeEventListener('touchmove', onTouchMoveHeader);
    }

    function onControlButtonClickHeader(idxheader) {
      setVisibleSlideHeader({ idxheader: idxheader + 2, animateHeader: true });
    }

    function onSlideListTransitionEndHeader() {
      const slideItemHeader =
        slideItemsHeader[stateHeader.currentSlideIndexHeader];

      if (
        slideItemHeader.classList.contains('slide-cloned') &&
        Number(slideItemHeader.dataset.idxheader) > 0
      ) {
        setVisibleSlideHeader({ idxheader: 2, animateHeader: false });
      }
      if (
        slideItemHeader.classList.contains('slide-cloned') &&
        Number(slideItemHeader.dataset.idxheader) < 0
      ) {
        setVisibleSlideHeader({
          idxheader: slideItemsHeader.length - 3,
          animateHeader: false,
        });
      }
    }

    function setAutoPlayHeader() {
      if (stateHeader.autoPlayHeader) {
        slideIntervalHeader = setInterval(function () {
          setVisibleSlideHeader({
            idxheader: stateHeader.currentSlideIndexHeader + 1,
            animateHeader: true,
          });
        }, stateHeader.timeIntervalHeader);
      }
    }

    function setListenersHeader() {
      controlButtonsHeader = document.querySelectorAll(
        '[data-slide="control-button-header"]'
      );
      slideItemsHeader = document.querySelectorAll(
        '[data-slide="item-header"]'
      );

      //Adicionar eventHeadero nos indicatons
      controlButtonsHeader.forEach(function (controlButtonHeader, idxheader) {
        controlButtonHeader.addEventListener('click', function (eventHeader) {
          onControlButtonClickHeader(idxheader);
        });
      });

      //Eventos do mouse
      slideItemsHeader.forEach(function (slideItemHeader, idxheader) {
        //Arrastar
        slideItemHeader.addEventListener('dragstart', function (eventHeader) {
          eventHeader.preventDefault();
        });
        //Apertar
        slideItemHeader.addEventListener('mousedown', function (eventHeader) {
          onMouseDownHeader(eventHeader, idxheader);
        }),
          //Soltar no mobile
          slideItemHeader.addEventListener('mouseup', noMouseUpHeader);

        //Apertar no mobile
        slideItemHeader.addEventListener('touchstart', function (eventHeader) {
          onTouchStartHeader(eventHeader, idxheader);
        }),
          //Soltar
          slideItemHeader.addEventListener('touchend', onTouchEndHeader);
      });

      navNextButtonHeader.addEventListener('click', nextSlideHeader);
      navPreviousButtonHeader.addEventListener('click', previousSlideHeader);
      //Evento para voltar o slide de forma que o usuário não perceba
      slideListHeader.addEventListener(
        'transitionend',
        onSlideListTransitionEndHeader
      );
      slideWrapperHeader.addEventListener('mouseenter', function () {
        clearInterval(slideIntervalHeader);
      });
      slideWrapperHeader.addEventListener('mouseleave', function () {
        setAutoPlayHeader();
      });
      //Manter posicionamento padrão
      let resizeTimeOutHeader;
      window.addEventListener('resize', function () {
        this.clearTimeout(resizeTimeOutHeader);
        resizeTimeOutHeader = setTimeout(function () {
          setVisibleSlideHeader({
            idxheader: stateHeader.currentSlideIndexHeader,
            animateHeader: true,
          });
        }, 1000);
      });
    }

    function initSliderHeader({
      startAtIndexHeader = 0,
      autoPlayHeader = true,
      timeIntervalHeader = 4000,
    }) {
      stateHeader.autoPlayHeader = autoPlayHeader;
      stateHeader.timeIntervalHeader = timeIntervalHeader;
      createControlButtonsHeader();
      createSlideCloneHeader();
      setListenersHeader();
      setVisibleSlideHeader({
        idxheader: startAtIndexHeader + 2,
        animateHeader: true,
      });
      setAutoPlayHeader();
    }

    initSliderHeader({
      autoPlayHeader: true,
      startAtIndexHeader: 0,
      timeIntervalHeader: 4000,
    });
  } catch (e) {
    console.warn(e);
  }
}
// End of Header section

// Emphasis section
function getTestimonials(json) {
  console.log(json);
  try {
    // Why Choose Us section
    let instituteName = document.querySelector('.instituteName');
    instituteName.innerHTML = json.PortalEducacional || json.pageTitle;
    // End of Why Choose Us section
    let testimoniesSection = document.querySelector('.emphasisSection');
    let testimoniesBox = document.querySelector('.emphasisSlide-list');
    let emphasisList = document.querySelectorAll(
      '[data-slide="emphasis-slide-item"]'
    );

    // if (json.PortalEducacional)
    if (json.featuredCourses.courses) {
      let count = -1;
      for (let i = 0; i < json.featuredCourses.courses.length; i++) {
        let courseId = json.featuredCourses.courses[i].id;
        count++;
        //Eacth testimonies
        let testimoniesBoxes = document.createElement('div');
        testimoniesBoxes.classList.add('emphasisSlide-item');
        testimoniesBoxes.dataset.slide = 'emphasis-slide-item';
        testimoniesBoxes.dataset.indice_emphasis = emphasisList.length + count;
        testimoniesBoxes.addEventListener('click', () => {
          for (let x = 0; x < pageLinksList.length; x++) {
            if (pageLinksList[x].page === 'Curso') {
              window.location.href = `${initUrl}/pages/${pageLinksList[x].id}/Detalhe Curso?courseId=${courseId}`;
            }
          }
        });
        testimoniesBox.appendChild(testimoniesBoxes);
        //Testimonies content
        let courseImg = document.createElement('img');
        courseImg.setAttribute(
          'src',
          `${initUrl}${json.featuredCourses.courses[i].img}`
        );
        courseImg.setAttribute('alt', 'Course image');
        courseImg.classList.add('emphasisSlide-content');
        testimoniesBoxes.appendChild(courseImg);

        //Course name
        let authorName = document.createElement('p');
        authorName.classList.add('emphasisCourseName');
        authorName.innerHTML = json.featuredCourses.courses[i].title;
        testimoniesBoxes.appendChild(authorName);
        //Course
        let courseName = document.createElement('p');
        courseName.classList.add('emphasisCourseType');
        courseName.innerHTML = json.featuredCourses.courses[i].author;
        testimoniesBoxes.appendChild(courseName);
      }
    } else if (json.featuredCourses.courses) {
      testimoniesSection.style.display = 'none';
      console.log('Não há emphasis de alunos');
    }
    slideEvents();
  } catch (e) {
    console.warn(e);
  }
}
function slideEvents() {
  try {
    const emphasisSlideWrapper = document.querySelector(
      '[data-slide="emphasisSlide-wrapper"]'
    );
    const emphasisSlideList = document.querySelector(
      '[data-slide="emphasis-slide-list"]'
    );
    const emphasisPreviousBtn = document.querySelector(
      '[data-slide="emphasis-previous-btn"]'
    );
    const emphasisNextBtn = document.querySelector(
      '[data-slide="emphasis-next-btn"]'
    );
    const emphasisControlsWapper = document.querySelector(
      '[data-slide="emphasis-slide-controls-wrapper"]'
    );
    let emphasisSlideItems = document.querySelectorAll(
      '[data-slide="emphasis-slide-item"]'
    );
    let emphasisControlButtons;
    let emphasisSlideInterval;

    const emphasisState = {
      emphasisStartingPoint: 0,
      emphasisSavedPosition: 0,
      emphasisCurrentPoint: 0,
      emphasisMovement: 0,
      currentEmphasisSlideIndex: 0,
      emphasisAutoPlay: true,
      emphasisTimeInterval: 0,
    };

    //Mudar slides
    function translateEmphasisSlide({ emphasisPosition }) {
      emphasisState.emphasisSavedPosition = emphasisPosition;
      emphasisSlideList.style.transform = `translateX(${emphasisPosition}px)`;
    }

    function getCenterEmphasisPosition({ indice_emphasis }) {
      const emphasisSlideItem = emphasisSlideItems[indice_emphasis];
      const emphasisSlideWidth = emphasisSlideItem.clientWidth;
      const windowEmphasisWidth = document.body.clientWidth;
      const marginEmphasis = (windowEmphasisWidth - emphasisSlideWidth) / 2;
      const emphasisPosition =
        marginEmphasis - indice_emphasis * emphasisSlideWidth;
      return emphasisPosition;
    }

    function setVisibleEmphasisSlide({ indice_emphasis, animateEmphasis }) {
      if (
        indice_emphasis === 0 ||
        indice_emphasis === emphasisSlideItems.length - 1
      ) {
        indice_emphasis = emphasisState.currentEmphasisSlideIndex;
      }
      const emphasisPosition = getCenterEmphasisPosition({ indice_emphasis });
      emphasisState.currentEmphasisSlideIndex = indice_emphasis;
      emphasisSlideList.style.transition =
        animateEmphasis === true ? 'transform 1s' : 'none';
      activeEmphasisControlButton({ indice_emphasis });
      translateEmphasisSlide({ emphasisPosition: emphasisPosition });
    }

    function nextEmphasisSlide() {
      setVisibleEmphasisSlide({
        indice_emphasis: emphasisState.currentEmphasisSlideIndex + 1,
        animateEmphasis: true,
      });
    }

    function previousEmphasisSlide() {
      setVisibleEmphasisSlide({
        indice_emphasis: emphasisState.currentEmphasisSlideIndex - 1,
        animateEmphasis: true,
      });
    }

    function createEmphasisControlButtons() {
      emphasisSlideItems.forEach(function () {
        const emphasisControlButton = document.createElement('button');
        emphasisControlButton.classList.add('emphasisSlide-control-button');
        emphasisControlButton.classList.add('fas');
        emphasisControlButton.classList.add('fa-circle');
        emphasisControlButton.dataset.slide = 'emphasis-control-btn';
        emphasisControlsWapper.append(emphasisControlButton);
      });
    }

    function activeEmphasisControlButton({ indice_emphasis }) {
      const emphasisSlideItem = emphasisSlideItems[indice_emphasis];
      const dataindice_emphasis = Number(
        emphasisSlideItem.dataset.indice_emphasis
      );
      const emphasisControlButton = emphasisControlButtons[dataindice_emphasis];
      emphasisControlButtons.forEach(function (emphasisControlButtonItem) {
        emphasisControlButtonItem.classList.remove('activeEmphasisSlideItem');
      });
      if (emphasisControlButton)
        emphasisControlButton.classList.add('activeEmphasisSlideItem');
    }

    function createEmphasisSlideClone() {
      const firstEmphasisSlide = emphasisSlideItems[0].cloneNode(true);
      firstEmphasisSlide.classList.add('emphasisSlide-cloned');
      firstEmphasisSlide.dataset.indice_emphasis = emphasisSlideItems.length;

      const secundEmphasisSlide = emphasisSlideItems[1].cloneNode(true);
      secundEmphasisSlide.classList.add('emphasisSlide-cloned');
      secundEmphasisSlide.dataset.indice_emphasis =
        emphasisSlideItems.length + 1;

      const lastEmphasisSlide =
        emphasisSlideItems[emphasisSlideItems.length - 1].cloneNode(true);
      lastEmphasisSlide.classList.add('emphasisSlide-cloned');
      lastEmphasisSlide.dataset.indice_emphasis = -1;

      const penultimateEmphasisSlide =
        emphasisSlideItems[emphasisSlideItems.length - 2].cloneNode(true);
      penultimateEmphasisSlide.classList.add('emphasisSlide-cloned');
      penultimateEmphasisSlide.dataset.indice_emphasis = -2;

      //Criar no final da lista
      emphasisSlideList.append(firstEmphasisSlide);
      emphasisSlideList.append(secundEmphasisSlide);
      //Criar no início da lista
      emphasisSlideList.prepend(lastEmphasisSlide);
      emphasisSlideList.prepend(penultimateEmphasisSlide);

      emphasisSlideItems = document.querySelectorAll(
        '[data-slide="emphasis-slide-item"]'
      );
    }

    //Apertar
    function onEmphasisMouseDown(evento, indice_emphasis) {
      const emphasisSlideItem = evento.currentTarget;
      emphasisState.emphasisStartingPoint = evento.clientX;
      emphasisState.emphasisCurrentPoint =
        emphasisState.emphasisStartingPoint -
        emphasisState.emphasisSavedPosition;
      emphasisState.diaDiaCurrentSlideindice_emphasis = indice_emphasis;
      emphasisSlideList.style.transition = 'none';
      emphasisSlideItem.addEventListener('mousemove', onEmphasisMouseMove);
    }
    //Evento de mover mouse
    function onEmphasisMouseMove(evento, indice_emphasis) {
      emphasisState.emphasisMovement =
        evento.clientX - emphasisState.emphasisStartingPoint;
      const emphasisPosition =
        evento.clientX - emphasisState.emphasisCurrentPoint;
      translateEmphasisSlide({ emphasisPosition });
    }
    //Soltar
    function noEmphasisMouseUp(evento) {
      const pointsToMoveEmphasis = evento.type.includes('touch') ? 50 : 150;
      // console.log(evento.type);
      const emphasisSlideItem = evento.currentTarget;
      if (emphasisState.emphasisMovement < -pointsToMoveEmphasis) {
        nextEmphasisSlide();
      } else if (emphasisState.emphasisMovement > pointsToMoveEmphasis) {
        previousEmphasisSlide();
      } else {
        setVisibleEmphasisSlide({
          indice_emphasis: emphasisState.currentEmphasisSlideIndex,
          animateEmphasis: true,
        });
      }

      emphasisSlideItem.removeEventListener('mousemove', onEmphasisMouseMove);
    }

    function onEmphasisTouchStart(evento, indice_emphasis) {
      evento.clientX = evento.touches[0].clientX;
      onEmphasisMouseDown(evento, indice_emphasis);
      const emphasisSlideItem = evento.currentTarget;
      emphasisSlideItem.addEventListener('touchmove', onEmphasisTouchMove);
    }

    function onEmphasisTouchMove(evento) {
      evento.clientX = evento.touches[0].clientX;
      onEmphasisMouseMove(evento);
    }
    function onEmphasisTouchEnd(evento) {
      noEmphasisMouseUp(evento);
      const emphasisSlideItem = evento.currentTarget;
      emphasisSlideItem.removeEventListener('touchmove', onEmphasisTouchMove);
    }

    function onEmphasisControlButtonClick(indice_emphasis) {
      setVisibleEmphasisSlide({
        indice_emphasis: indice_emphasis + 2,
        animateEmphasis: true,
      });
    }

    function onEmphasisSlideListTransitionEnd() {
      const emphasisSlideItem =
        emphasisSlideItems[emphasisState.currentEmphasisSlideIndex];

      if (
        emphasisSlideItem.classList.contains('emphasisSlide-cloned') &&
        Number(emphasisSlideItem.dataset.indice_emphasis) > 0
      ) {
        setVisibleEmphasisSlide({ indice_emphasis: 2, animateEmphasis: false });
      }
      if (
        emphasisSlideItem.classList.contains('emphasisSlide-cloned') &&
        Number(emphasisSlideItem.dataset.indice_emphasis) < 0
      ) {
        setVisibleEmphasisSlide({
          indice_emphasis: emphasisSlideItems.length - 3,
          animateEmphasis: false,
        });
      }
    }

    function setEmphasisAutoPlay() {
      if (emphasisState.emphasisAutoPlay) {
        emphasisSlideInterval = setInterval(function () {
          setVisibleEmphasisSlide({
            indice_emphasis: emphasisState.currentEmphasisSlideIndex + 1,
            animateEmphasis: true,
          });
        }, emphasisState.emphasisTimeInterval);
      }
    }

    function setEmphasisListeners() {
      emphasisControlButtons = document.querySelectorAll(
        '[data-slide="emphasis-control-btn"]'
      );
      emphasisSlideItems = document.querySelectorAll(
        '[data-slide="emphasis-slide-item"]'
      );

      //Adicionar evento nos indicatons
      emphasisControlButtons.forEach(function (
        emphasisControlButton,
        indice_emphasis
      ) {
        emphasisControlButton.addEventListener('click', function (evento) {
          onEmphasisControlButtonClick(indice_emphasis);
        });
      });

      //Eventos do mouse
      emphasisSlideItems.forEach(function (emphasisSlideItem, indice_emphasis) {
        //Arrastar
        emphasisSlideItem.addEventListener('dragstart', function (evento) {
          evento.preventDefault();
        });
        //Apertar
        emphasisSlideItem.addEventListener('mousedown', function (evento) {
          onEmphasisMouseDown(evento, indice_emphasis);
        }),
          //Soltar no mobile
          emphasisSlideItem.addEventListener('mouseup', noEmphasisMouseUp);

        //Apertar no mobile
        emphasisSlideItem.addEventListener('touchstart', function (evento) {
          onEmphasisTouchStart(evento, indice_emphasis);
        }),
          //Soltar
          emphasisSlideItem.addEventListener('touchend', onEmphasisTouchEnd);
      });

      emphasisNextBtn.addEventListener('click', nextEmphasisSlide);
      emphasisPreviousBtn.addEventListener('click', previousEmphasisSlide);

      //Evento para voltar o slide de forma que o usuário não perceba
      emphasisSlideList.addEventListener(
        'transitionend',
        onEmphasisSlideListTransitionEnd
      );
      emphasisSlideWrapper.addEventListener('mouseenter', function () {
        clearInterval(emphasisSlideInterval);
      });
      emphasisSlideWrapper.addEventListener('mouseleave', function () {
        setEmphasisAutoPlay();
      });

      //Manter posicionamento padrão
      let emphasisResizeTimeOut;
      window.addEventListener('resize', function () {
        clearTimeout(emphasisResizeTimeOut);
        emphasisResizeTimeOut = setTimeout(function () {
          setVisibleEmphasisSlide({
            indice_emphasis: emphasisState.currentEmphasisSlideIndex,
            animateEmphasis: true,
          });
        }, 500);
      });
    }

    function initEmphasisSlider({
      startAtindice_emphasis = 0,
      emphasisAutoPlay = true,
      emphasisTimeInterval = 3000,
    }) {
      emphasisState.emphasisAutoPlay = emphasisAutoPlay;
      emphasisState.emphasisTimeInterval = emphasisTimeInterval;
      createEmphasisControlButtons();
      createEmphasisSlideClone();
      setEmphasisListeners();
      setVisibleEmphasisSlide({
        indice_emphasis: startAtindice_emphasis + 2,
        animateEmphasis: true,
      });
      setEmphasisAutoPlay();
    }

    initEmphasisSlider({
      emphasisAutoPlay: true,
      startAtindice_emphasis: 0,
      emphasisTimeInterval: 4000,
    });
  } catch (e) {
    console.warn(e);
  }
}
// End of Emphasis section

// All Categories section
//Seach input
let seachInput = document.getElementById('courseName');
let seachInputIcon = document.querySelector('.seachInputIcon');
let textWarn = document.querySelector('.textWarn');
let backToStartLabel = document.querySelector('.backToStartLabel');
let backToStartBtn = document.querySelector('.backToStartBtn');
let seachIcon = document.createElement('i');
seachIcon.classList.add('fa-sharp', 'fa-solid', 'fa-magnifying-glass');
seachInput.appendChild(seachIcon);
const categoryList = [];
let allCourseBox = document.querySelector('.allCourseForCategory');
const courseContainer = document.querySelector('.teachingContainer');
const coursesList = [];

seachInput.addEventListener('input', () => {
  if (seachInput.value.length > 2) {
    backToStartBtn.style.display = 'flex';
    backToStartLabel.innerHTML = seachInput.value;
    textWarn.innerHTML = '';
    textWarn.style.display = 'none';
  }
});
seachInput.addEventListener('blur', () => {
  if (seachInput.value.length < 3) {
    textWarn.innerHTML = '';
    textWarn.style.display = 'none';
  }
});

seachInput.addEventListener('keyup', (e) => {
  let seachName = seachInput.value;

  if (e.keyCode === 13) {
    if (seachInput.value.length < 3) {
      textWarn.style.display = 'block';
      textWarn.innerHTML = 'Para buscar um curso, digite pelo menos 3 letras.';
    } else {
      let showMoreCourses = document.querySelector('.showMoreCourses');
      if (showMoreCourses) showMoreCourses.remove();
      fecthSeachCourse(seachName);
      console.log(seachInput.value);
      seachInput.value = '';
      textWarn.innerHTML = '';
      coursesList.length = 0;
      countPage = 1;
    }
  }
});
seachInputIcon.addEventListener('click', (e) => {
  seachName = seachInput.value;
  if (seachInput.value.length < 3) {
    textWarn.style.display = 'block';
    textWarn.innerHTML = 'Para buscar um curso, digite pelo menos 3 letras.';
  } else {
    let showMoreCourses = document.querySelector('.showMoreCourses');
    if (showMoreCourses) showMoreCourses.remove();
    fecthSeachCourse(seachName);
    console.log(seachInput.value);
    seachInput.value = '';
    textWarn.innerHTML = '';
    coursesList.length = 0;
    countPage = 1;
  }
});

backToStartBtn.addEventListener('click', () => {
  let showMoreCourses = document.querySelector('.showMoreCourses');
  if (showMoreCourses) showMoreCourses.remove();
  allCourseBox.innerHTML = '';
  coursesList.length = 0;
  countPage = 1;
  backToStartBtn.style.display = 'none';
  fetchallJsonCourseCategories();
});

function fetchallJsonCourseCategories() {
  try {
    fetch(`${initUrl}/api/getJson.aspx?type=tutors_app_new`)
      .then((answer) => answer.json())
      .then((allCategory) => {
        getCategoryTitles(allCategory);
        createCourseForCategory(allCategory);
      });
  } catch (e) {
    console.warn(e);
  }
}

function getCategoryTitles(allCategory) {
  try {
    for (let i = 0; i <= allCategory.tutorsList.length; i++) {
      let categoryName = [];
      categoryList.push(categoryName);
    }
  } catch (e) {
    console.warn(e);
  }
}

function createCourseForCategory(allCategory) {
  try {
    for (let i = 0; i < allCategory.tutorsList.length; i++) {
      let categoryName = allCategory.tutorsList[i].name;
      let categoryId = allCategory.tutorsList[i].id;
      let categoryImg = allCategory.tutorsList[i].img;
      //Box of each category
      let boxOfEachCategory = document.createElement('div');
      boxOfEachCategory.id = categoryId;
      boxOfEachCategory.classList.add('boxOfEachCategory');
      allCourseBox.appendChild(boxOfEachCategory);
      //boxFromImg
      let boxFromImg = document.createElement('div');
      boxFromImg.classList.add('boxFromImg');
      boxOfEachCategory.appendChild(boxFromImg);
      //Image box
      let imageBox = document.createElement('div');
      imageBox.classList.add('imageBox');
      imageBox.style.backgroundImage = `url(${initUrl}${categoryImg})`;
      imageBox.addEventListener('click', () => {
        for (let y = 0; y < pageLinksList.length; y++) {
          if (pageLinksList[y].page === 'Nossos Cursos') {
            window.location.href = `${initUrl}/pages/${pageLinksList[y].id}/Nossos-Cursos?categoryId=${categoryId}`;
          }
        }
      });
      //https://catalogo.drmeducacao.com.br/pages/396298/TemplateClassicCategoria
      //https://catalogo.drmeducacao.com.br/pages/396298/Nossos-Cursos?categoryId=1145045
      boxFromImg.appendChild(imageBox);
      //Texts box
      let textsBox = document.createElement('div');
      textsBox.classList.add('textsBox');
      boxOfEachCategory.appendChild(textsBox);
      //Category title
      let categoryTitle = document.createElement('p');
      categoryTitle.innerHTML = categoryName;
      categoryTitle.classList.add('categoryTitle');
      textsBox.appendChild(categoryTitle);
      // //Number of courses
      // let NumberOfCourses = document.createElement('p');
      // NumberOfCourses.classList.add('NumberOfCourses');
      // getQuantityCoursesByCategory(NumberOfCourses, categoryId);
      // textsBox.appendChild(NumberOfCourses);

      // //Category information
      // let categoryInfo = document.createElement('p');
      // categoryInfo.innerHTML = 'Aulas presenciais ou 100% on-line';
      // categoryInfo.classList.add('categoryInfo');
      // textsBox.appendChild(categoryInfo);
      // //Last box Category
      // let lastBoxCategory = document.createElement('div');
      // lastBoxCategory.classList.add('lastBoxCategory');
      // boxOfEachCategory.appendChild(lastBoxCategory);
      // //Bar
      // let categoryBar = document.createElement('hr');
      // categoryBar.classList.add('categoryBar');
      // lastBoxCategory.appendChild(categoryBar);
      // //Category button
      // let categoryLink = document.createElement('a');
      // categoryLink.innerHTML = 'Confira os Cursos';
      // categoryLink.classList.add('categoryLink');
      // for (let y = 0; y < pageLinksList.length; y++) {
      //   if (pageLinksList[y].page === 'Nossos Cursos') {
      //     categoryLink.setAttribute(
      //       'href',
      //       `${initUrl}/pages/${pageLinksList[y].id}/Nossos Cursos?categoryId=${categoryId}`
      //     );
      //   }
      // }
      // lastBoxCategory.appendChild(categoryLink);
    }
    // console.log(allCategory);
  } catch (e) {
    console.warn(e);
  }
}

function getQuantityCoursesByCategory(NumberOfCourses, categoryId) {
  try {
    fetch(
      `${initUrl}/api/getJson.aspx?type=courses_list_app&tutor_id=${categoryId}`
    )
      .then((answer) => answer.json())
      .then((json) => {
        // let strQuantityCourse;
        // console.log(json);
        if (json.total === '1') {
          NumberOfCourses.innerHTML = `${json.total} Curso disponível`;
        } else if (json.total > '1') {
          NumberOfCourses.innerHTML = `${json.total} Cursos disponíveis`;
        } else if (json.total < 1) {
          NumberOfCourses.innerHTML = `Saiba mais`;
        }
        // NumberOfCourses.innerHTML = `${json.total} ${strQuantityCourse} `;
      });
  } catch (e) {
    console.warn(e);
  }
}
function fecthSeachCourse(seachName) {
  try {
    fetch(
      `${initUrl}/api/getJson.aspx?type=courses_list_app&page_total=9&txt_search=${seachName}`
    )
      .then((resposta) => resposta.json())
      .then((json) => {
        allCourseBox.innerHTML = '';
        searchForCoursesSearched(json);
      });
  } catch (e) {
    console.warn(e);
  }

  function createUrlPageMoreCouses() {
    countPage++;
    fecthNewPageWithMoreCourses(countPage);
  }
  //Show more course button
  let showMoreCourses = document.createElement('p');
  showMoreCourses.classList.add('showMoreCourses');
  showMoreCourses.innerHTML = 'Mostrar mais...';
  showMoreCourses.style.display = 'none';
  courseContainer.appendChild(showMoreCourses);
  showMoreCourses.addEventListener('click', () => {
    createUrlPageMoreCouses();
  });

  function fecthNewPageWithMoreCourses(countPage) {
    try {
      let newPage = `${initUrl}/api/getJson.aspx?type=courses_list_app&page=${countPage}&page_total=9&txt_search=${seachName}`;

      fetch(newPage)
        .then((resposta) => resposta.json())
        .then((json) => {
          console.log(newPage);
          searchForCoursesSearched(json);
        });
    } catch (e) {
      console.warn(e);
    }
  }

  function searchForCoursesSearched(json) {
    try {
      console.log(json);
      let numberCourse = Number(json.total);
      if (numberCourse === 0) {
        let infoTextBox = document.createElement('div');
        infoTextBox.style.cssText =
          'width:100%; height: auto; display: block; text-align: center;';
        allCourseBox.appendChild(infoTextBox);
        let infoText = document.createElement('h2');
        infoText.classList.add('infoText');
        infoText.innerHTML = 'Desculpe, ainda não temos o curso pesquisado.';
        infoTextBox.appendChild(infoText);
        showMoreCourses.style.display = 'none';
        const showBtnList = Array.prototype.slice.call(
          document.querySelectorAll('.showMoreCourses')
        );
        showBtnList.forEach((e) => e.remove());
      }
      if (
        json.coursesList.course.length === 1 ||
        typeof json.coursesList.course.length === 'undefined'
      ) {
        let categoryName = json.coursesList.course.title;
        let courseId = json.coursesList.course.id;
        let categoryImg = json.coursesList.course.img;
        let ysnPacote = json.coursesList.course.ysnPacote;
        let courseCategoryName = json.coursesList.course.categoria.name;
        // let courseCategoryId = json.coursesList.course.categoria.id;
        let courseThemeName = json.coursesList.course.temaCourse;
        //Box of each category
        let boxOfEachCategory = document.createElement('div');
        boxOfEachCategory.id = courseId;
        boxOfEachCategory.classList.add('boxOfEachCategory');
        coursesList.push(boxOfEachCategory);
        allCourseBox.appendChild(boxOfEachCategory);
        //boxFromImg
        let boxFromImg = document.createElement('div');
        boxFromImg.classList.add('boxFromImg');
        boxOfEachCategory.appendChild(boxFromImg);
        //Image box
        let imageBox = document.createElement('div');
        imageBox.classList.add('imageBox');
        imageBox.style.backgroundImage = `url(${initUrl}${categoryImg})`;
        imageBox.addEventListener('click', () => {
          for (let y = 0; y < pageLinksList.length; y++) {
            if (pageLinksList[y].page === 'Nossos Cursos') {
              window.location.href = `${initUrl}/pages/${pageLinksList[y].id}/Detalhe Curso?courseId=${courseId}&ysnPacote=${ysnPacote}`;
            }
          }
        });
        boxFromImg.appendChild(imageBox);
        //Texts box
        let textsBox = document.createElement('div');
        textsBox.classList.add('textsBox');
        boxOfEachCategory.appendChild(textsBox);
        //Category title
        let categoryTitle = document.createElement('p');
        if (categoryName.length > 45) {
          categoryTitle.innerHTML = `${categoryName.slice(0, 45)}...`;
        } else {
          categoryTitle.innerHTML = categoryName;
        }
        categoryTitle.classList.add('categoryTitle');
        textsBox.appendChild(categoryTitle);
        // //Number of courses
        // let NumberOfCourses = document.createElement('p');
        // NumberOfCourses.classList.add('NumberOfCourses');
        // NumberOfCourses.innerHTML = courseCategoryName;
        // textsBox.appendChild(NumberOfCourses);
        // //Category information
        // let categoryInfo = document.createElement('p');
        // categoryInfo.innerHTML = `${courseThemeName}`;
        // categoryInfo.classList.add('categoryInfo');
        // textsBox.appendChild(categoryInfo);
        // //Last box Category
        // let lastBoxCategory = document.createElement('div');
        // lastBoxCategory.classList.add('lastBoxCategory');
        // boxOfEachCategory.appendChild(lastBoxCategory);
        // //Bar
        // let categoryBar = document.createElement('hr');
        // categoryBar.classList.add('categoryBar');
        // lastBoxCategory.appendChild(categoryBar);
        // //Category button
        // let categoryLink = document.createElement('a');
        // categoryLink.innerHTML = 'Saiba mais...';
        // categoryLink.classList.add('categoryLink');
        // for (let y = 0; y < pageLinksList.length; y++) {
        //   if (pageLinksList[y].page === 'Curso') {
        //     categoryLink.setAttribute(
        //       'href',
        //       `${initUrl}/pages/${pageLinksList[y].id}/Detalhe Curso?courseId=${courseId}&ysnPacote=${ysnPacote}`
        //     );
        //   }
        // }
        // console.log(coursesList.length);
        // lastBoxCategory.appendChild(categoryLink);
      } else {
        for (let i = 0; i < json.coursesList.course.length; i++) {
          let categoryName = json.coursesList.course[i].title;
          let courseId = json.coursesList.course[i].id;
          let categoryImg = json.coursesList.course[i].img;
          let ysnPacote = json.coursesList.course[i].ysnPacote;
          let courseCategoryName = json.coursesList.course[i].categoria.name;
          let courseCategoryId = json.coursesList.course[i].categoria.id;
          let courseThemeName = json.coursesList.course[i].temaCourse;
          //Box of each category
          let boxOfEachCategory = document.createElement('div');
          boxOfEachCategory.id = courseId;
          boxOfEachCategory.classList.add('boxOfEachCategory');
          coursesList.push(boxOfEachCategory);
          allCourseBox.appendChild(boxOfEachCategory);
          //boxFromImg
          let boxFromImg = document.createElement('div');
          boxFromImg.classList.add('boxFromImg');
          boxOfEachCategory.appendChild(boxFromImg);
          //Image box
          let imageBox = document.createElement('div');
          imageBox.classList.add('imageBox');
          imageBox.style.backgroundImage = `url(${initUrl}${categoryImg})`;
          imageBox.addEventListener('click', () => {
            for (let y = 0; y < pageLinksList.length; y++) {
              if (pageLinksList[y].page === 'Nossos Cursos') {
                window.location.href = `${initUrl}/pages/${pageLinksList[y].id}/Detalhe Curso?courseId=${courseId}&ysnPacote=${ysnPacote}`;
              }
            }
          });
          boxFromImg.appendChild(imageBox);
          //Texts box
          let textsBox = document.createElement('div');
          textsBox.classList.add('textsBox');
          boxOfEachCategory.appendChild(textsBox);
          //Category title
          let categoryTitle = document.createElement('p');
          if (categoryName.length > 45) {
            categoryTitle.innerHTML = `${categoryName.slice(0, 45)}...`;
          } else {
            categoryTitle.innerHTML = categoryName;
          }
          categoryTitle.classList.add('categoryTitle');
          textsBox.appendChild(categoryTitle);
          // //Number of courses
          // let NumberOfCourses = document.createElement('p');
          // NumberOfCourses.classList.add('NumberOfCourses');
          // NumberOfCourses.innerHTML = courseCategoryName;
          // textsBox.appendChild(NumberOfCourses);
          // //Category information
          // let categoryInfo = document.createElement('p');
          // categoryInfo.innerHTML = `${courseThemeName}`;
          // categoryInfo.classList.add('categoryInfo');
          // textsBox.appendChild(categoryInfo);
          // //Last box Category
          // let lastBoxCategory = document.createElement('div');
          // lastBoxCategory.classList.add('lastBoxCategory');
          // boxOfEachCategory.appendChild(lastBoxCategory);
          // //Bar
          // let categoryBar = document.createElement('hr');
          // categoryBar.classList.add('categoryBar');
          // lastBoxCategory.appendChild(categoryBar);
          // //Category button
          // let categoryLink = document.createElement('a');
          // categoryLink.innerHTML = 'Saiba mais...';
          // categoryLink.classList.add('categoryLink');
          // for (let y = 0; y < pageLinksList.length; y++) {
          //   if (pageLinksList[y].page === 'Curso') {
          //     categoryLink.setAttribute(
          //       'href',
          //       `${initUrl}/pages/${pageLinksList[y].id}/Detalhe Curso?courseId=${courseId}&ysnPacote=${ysnPacote}`
          //     );
          //   }
          // }
          // console.log(coursesList.length);
          // lastBoxCategory.appendChild(categoryLink);
        }
      }

      console.log(coursesList.length);
      console.log(numberCourse);
      //courseContainer
      numberCourse > coursesList.length
        ? (showMoreCourses.style.display = 'block')
        : (showMoreCourses.style.display = 'none');
    } catch (e) {
      console.warn(e);
    }
  }
}
// End of All Categories section

// Why Choose Us section
//Note: The title code for this session is between lines 577 and 580 of this file
//Cards links
let onlineClassLink = Array.prototype.slice.call(
  document.querySelectorAll('.whyChooseUsBtnBox')
);
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Quem Somos') {
    onlineClassLink[0].setAttribute(
      'href',
      `${initUrl}/pages/${pageLinksList[i].id}/Quem Somos`
    );
  }
}
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === 'Nossos Cursos') {
    onlineClassLink[1].setAttribute(
      'href',
      `${initUrl}/pages/${pageLinksList[i].id}/Nossos Cursos`
    );
  }
}
// End of Why Choose Us section

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
fetchallJsonCourseCategories();
