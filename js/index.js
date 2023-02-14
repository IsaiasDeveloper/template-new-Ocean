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
// let initUrl = 'https://faculdadesucesso.edu.br'; //Tem 3 depoimentos
// let initUrl = 'https://uniflor.edu.br'; //Tem 9 depoimentos
// let initUrl = 'http://facigma.edu.br'; // SÓ ESSE ESTÁ DANDO ERRO! //
// let initUrl = 'https://reboucasdigital.com.br'; // SÓ ESSE ESTÁ DANDO ERRO! //

// Navbar
//Create all menu informations
function fetchJsonNavbarLinks() {
  try {
    fetch(`${initUrl}${menuInfo}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getLogo(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
function getLogo(json) {
  try {
    let logoBox = document.querySelector('.navbarImg');
    //Logo image
    let logoImg = document.createElement('img');
    logoImg.setAttribute('src', `${initUrl}${json.logo}`);
    logoBox.appendChild(logoImg);
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
// End of Navbar

//Header section
function fetchMenuInfo() {
  try {
    fetch(`${initUrl}${jsonFile}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getHeaderSlide(json);
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
//Header section
//Call functions
fetchJsonNavbarLinks();
fetchMenuInfo();
