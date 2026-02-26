/**
* Template Name: Personal - v4.7.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }
  
  /**
   * Hero type effect
   */
   const typed = select('.typed')
   if (typed) {
     let typed_strings = typed.getAttribute('data-typed-items')
     typed_strings = typed_strings.split(',')
     new Typed('.typed', {
       strings: typed_strings,
       loop: true,
       typeSpeed: 100,
       backSpeed: 50,
       backDelay: 2000
     });
   }
 

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true
  },
  fpsLimit: 60,
  particles: {
    groups: {
      z5000: {
        number: {
          value: 70
        },
        zIndex: {
          value: 5000
        }
      },
      z7500: {
        number: {
          value: 30
        },
        zIndex: {
          value: 75
        }
      },
      z2500: {
        number: {
          value: 50
        },
        zIndex: {
          value: 25
        }
      },
      z1000: {
        number: {
          value: 40
        },
        zIndex: {
          value: 10
        }
      }
    },
    number: {
      value: 200,
      density: {
        enable: false,
        value_area: 800
      }
    },
    color: {
      value: "#fff",
      animation: {
        enable: false,
        speed: 20,
        sync: true
      }
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 1,
      random: false,
      animation: {
        enable: false,
        speed: 3,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: 3
    },
    links: {
      enable: false,
      distance: 100,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      angle: {
        value: 10,
        offset: 0
      },
      enable: true,
      speed: 5,
      direction: "right",
      random: false,
      straight: true,
      outModes: {
        default: "out"
      },
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    },
    zIndex: {
      value: 5,
      opacityRate: 0.5
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: false,
        mode: "repulse"
      },
      onClick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        quantity: 4,
        groups: ["z5000", "z7500", "z2500", "z1000"]
      },
      remove: {
        quantity: 2
      }
    }
  },
  detectRetina: true,
  background: {
    color: "#000000",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover"
  },
  emitters: {
    position: {
      y: 55,
      x: -30
    },
    rate: {
      delay: 7,
      quantity: 1
    },
    size: {
      width: 0,
      height: 0
    },
    particles: {
      shape: {
        type: "images",
        options: {
          images: [
            {
              src: "https://particles.js.org/images/amongus_blue.png",
              width: 205,
              height: 267
            },
            {
              src: "https://particles.js.org/images/amongus_cyan.png",
              width: 207,
              height: 265
            },
            {
              src: "https://particles.js.org/images/amongus_green.png",
              width: 204,
              height: 266
            },
            {
              src: "https://particles.js.org/images/amongus_lime.png",
              width: 206,
              height: 267
            },
            {
              src: "https://particles.js.org/images/amongus_orange.png",
              width: 205,
              height: 265
            },
            {
              src: "https://particles.js.org/images/amongus_pink.png",
              width: 205,
              height: 265
            },
            {
              src: "https://particles.js.org/images/amongus_red.png",
              width: 204,
              height: 267
            },
            {
              src: "https://particles.js.org/images/amongus_white.png",
              width: 205,
              height: 267
            }
          ]
        }
      },
      size: {
        value: 40
      },
      move: {
        speed: 10,
        outModes: {
          default: "destroy",
          left: "none"
        },
        straight: true
      },
      zIndex: {
        value: 0
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 10,
          sync: true
        }
      }
    }
  }
});
})()


var language; 
function getLanguage() {
  // Attempt to load the language file from the first URL

    $.ajax({ 
      url: 'language/' + localStorage.getItem('language') + '.json', 
      dataType: 'json', 
      async: false,
      success: function (lang) { language = lang }
    });
  if (language == null) {
  $.ajax({ 
    url: '/CV/language/' + localStorage.getItem('language') + '.json', 
    dataType: 'json', 
    async: false,
    success: function (lang) { language = lang }
  });
  }
  // If the language file wasn't found at the first URL, try a different URL
  if (language == null) {
    $.ajax({ 
      url: 'CV/language/' + localStorage.getItem('language') + '.json', 
      dataType: 'json', 
      async: false,
      success: function (lang) { language = lang }
    });
  }
}
  function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

window.addEventListener('DOMContentLoaded', (event) => {

    if(localStorage.getItem('language') == null){
      setLanguage('en');
    }
    getLanguage();
    var html1 = "<h2> " + language.intro + "<span id='intro1'> " + language.intro1 +" </span> " + language.intro0 + "</h2>";
    document.getElementById('intro1').innerHTML = html1;
    //var html2 = language.intro2 + "<span class='typed' data-typed-items='" + language.intro3 +"'></span>"
    //document.getElementById('intro2').innerHTML = html2;
    document.getElementById("navLanguage").textContent = language.nav.navLanguage;
    document.getElementById("navLanguage").setAttribute('onclick', language.nav.navLanguageBtn);
    document.getElementById("navHome").textContent = language.nav.navHome;
    document.getElementById("navAbout").textContent = language.nav.navAbout;
    document.getElementById("navResume").textContent = language.nav.navResume;
    document.getElementById("navServices").textContent = language.nav.navServices;
    document.getElementById("navPortfolio").textContent = language.nav.navPortfolio;
    document.getElementById("navContact").textContent = language.nav.navContact;

    //About
    document.getElementById("aboutTitle1").textContent = language.about.aboutTitle1;
    document.getElementById("aboutTitle2").textContent = language.about.aboutTitle2;
    document.getElementById("aboutText1").textContent = language.about.aboutText1;
    document.getElementById("birthday").textContent = language.about.birthday;
    document.getElementById("birthdayValue").textContent = language.about.birthdayValue;
    document.getElementById("website").textContent = language.about.website;
    document.getElementById("websiteValue").textContent = language.about.websiteValue;
    document.getElementById("phone").textContent = language.about.phone;
    document.getElementById("phoneValue").textContent = language.about.phoneValue;
    document.getElementById("city").textContent = language.about.city;
    document.getElementById("cityValue").textContent = language.about.cityValue;
    document.getElementById("age").textContent = language.about.age;
    document.getElementById("ageValue").textContent = language.about.ageValue;
    document.getElementById("degree").textContent = language.about.degree;
    document.getElementById("degreeValue").textContent = language.about.degreeValue;
    document.getElementById("email1").textContent = language.about.email1;
    document.getElementById("email1Value").textContent = language.about.email1Value;
    document.getElementById("freelance").textContent = language.about.freelance;
    document.getElementById("freelanceValue").textContent = language.about.freelanceValue;
    document.getElementById("aboutText2").textContent = language.about.aboutText2;
    document.getElementById("countProcess").textContent = language.about.counts.countProcess;
    document.getElementById("countProjects").textContent = language.about.counts.countProjects;
    document.getElementById("countHoursSupport").textContent = language.about.counts.countHoursSupport;
    document.getElementById("countHoursCoding").textContent = language.about.counts.countHoursCoding;
    document.getElementById("aboutSkills").textContent = language.about.aboutSkills;
    document.getElementById("interestsTitle").textContent = language.about.interestsTitle;
    document.getElementById("interest1").textContent = language.about.interests.interest1;
    document.getElementById("interest2").textContent = language.about.interests.interest2;
    document.getElementById("interest3").textContent = language.about.interests.interest3;
    document.getElementById("interest4").textContent = language.about.interests.interest4;
    document.getElementById("interest5").textContent = language.about.interests.interest5;
    document.getElementById("interest6").textContent = language.about.interests.interest6;
    document.getElementById("interest7").textContent = language.about.interests.interest7;
    document.getElementById("interest8").textContent = language.about.interests.interest8;
    document.getElementById("interest9").textContent = language.about.interests.interest9;
    document.getElementById("interest10").textContent = language.about.interests.interest10;
    document.getElementById("interest11").textContent = language.about.interests.interest11;
    document.getElementById("interest12").textContent = language.about.interests.interest12;

    //Resume
    document.getElementById("resumeTitle").textContent = language.resume.resumeTitle;
    document.getElementById("resumeTitle0").textContent = language.resume.resumeTitle0;
    document.getElementById("resumeTitle1").textContent = language.resume.resumeTitle1;
    document.getElementById("pdfDownload").href = language.resume.pdfDownload;
    document.getElementById("pdfDownload").textContent = language.resume.pdfDownloadText;
    document.getElementById("resumeSummary").textContent = language.resume.resumeSummary;
    document.getElementById("resumeTitle2").textContent = language.resume.resumeTitle2;
    document.getElementById("resumeEduItem1Title").textContent = language.resume.resumeEduItem1.resumeEduItem1Title;
    document.getElementById("resumeEduItem1Date").textContent = language.resume.resumeEduItem1.resumeEduItem1Date;
    document.getElementById("resumeEduItem1Local").textContent = language.resume.resumeEduItem1.resumeEduItem1Local;
    document.getElementById("resumeEduItem1Desc").textContent = language.resume.resumeEduItem1.resumeEduItem1Desc;
    document.getElementById("resumeEduItem2Title").textContent = language.resume.resumeEduItem2.resumeEduItem2Title;
    document.getElementById("resumeEduItem2Date").textContent = language.resume.resumeEduItem2.resumeEduItem2Date;
    document.getElementById("resumeEduItem2Local").textContent = language.resume.resumeEduItem2.resumeEduItem2Local;
    document.getElementById("resumeEduItem2Desc").textContent = language.resume.resumeEduItem2.resumeEduItem2Desc;
    document.getElementById("resumeEduItem3Title").textContent = language.resume.resumeEduItem3.resumeEduItem3Title;
    document.getElementById("resumeEduItem3Date").textContent = language.resume.resumeEduItem3.resumeEduItem3Date;
    document.getElementById("resumeEduItem3Local").textContent = language.resume.resumeEduItem3.resumeEduItem3Local;
    document.getElementById("resumeEduItem3Desc").textContent = language.resume.resumeEduItem3.resumeEduItem3Desc;
    document.getElementById("resumeEduItem4Title").textContent = language.resume.resumeEduItem4.resumeEduItem4Title;
    document.getElementById("resumeEduItem4Date").textContent = language.resume.resumeEduItem4.resumeEduItem4Date;
    document.getElementById("resumeEduItem4Local").textContent = language.resume.resumeEduItem4.resumeEduItem4Local;
    document.getElementById("resumeEduItem4Desc").textContent = language.resume.resumeEduItem4.resumeEduItem4Desc;
    document.getElementById("resumeTitle3").textContent = language.resume.resumeTitle3;
    document.getElementById("resumeProfItem1Title").textContent = language.resume.resumeProfItem1.resumeProfItem1Title;
    document.getElementById("resumeProfItem1Date").textContent = language.resume.resumeProfItem1.resumeProfItem1Date;
    document.getElementById("resumeProfItem1Local").textContent = language.resume.resumeProfItem1.resumeProfItem1Local;
    document.getElementById("resumeProfItem1Desc1").textContent = language.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc1;
    document.getElementById("resumeProfItem1Desc2").textContent = language.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc2;
    document.getElementById("resumeProfItem1Desc3").textContent = language.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc3;
    document.getElementById("resumeProfItem1Desc4").textContent = language.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc4;
    document.getElementById("resumeProfItem1Desc5").textContent = language.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc5;
    document.getElementById("resumeProfItem1Desc6").textContent = language.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc6;
    document.getElementById("resumeProfItem2Title").textContent = language.resume.resumeProfItem2.resumeProfItem2Title;
    document.getElementById("resumeProfItem2Date").textContent = language.resume.resumeProfItem2.resumeProfItem2Date;
    document.getElementById("resumeProfItem2Local").textContent = language.resume.resumeProfItem2.resumeProfItem2Local;
    document.getElementById("resumeProfItem2Desc1").textContent = language.resume.resumeProfItem2.resumeProfItem2Desc.resumeProfItem2Desc1;
    document.getElementById("resumeProfItem2Desc2").textContent = language.resume.resumeProfItem2.resumeProfItem2Desc.resumeProfItem2Desc2;
    document.getElementById("resumeProfItem2Desc3").textContent = language.resume.resumeProfItem2.resumeProfItem2Desc.resumeProfItem2Desc3;
    document.getElementById("resumeProfItem3Title").textContent = language.resume.resumeProfItem3.resumeProfItem3Title;
    document.getElementById("resumeProfItem3Date").textContent = language.resume.resumeProfItem3.resumeProfItem3Date;
    document.getElementById("resumeProfItem3Local").textContent = language.resume.resumeProfItem3.resumeProfItem3Local;
    document.getElementById("resumeProfItem3Desc1").textContent = language.resume.resumeProfItem3.resumeProfItem3Desc.resumeProfItem3Desc1;
    document.getElementById("resumeProfItem3Desc2").textContent = language.resume.resumeProfItem3.resumeProfItem3Desc.resumeProfItem3Desc2;
    document.getElementById("resumeProfItem3Desc3").textContent = language.resume.resumeProfItem3.resumeProfItem3Desc.resumeProfItem3Desc3;

    //services
    document.getElementById("servicesTitle").textContent = language.services.servicesTitle;
    document.getElementById("servicesTitle1").textContent = language.services.servicesTitle1;
    document.getElementById("service1Title").textContent = language.services.services1.service1Title;
    document.getElementById("service1Description").textContent = language.services.services1.service1Description;
    document.getElementById("service2Title").textContent = language.services.services2.service2Title;
    document.getElementById("service2Description").textContent = language.services.services2.service2Description;
    document.getElementById("service3Title").textContent = language.services.services3.service3Title;
    document.getElementById("service3Description").textContent = language.services.services3.service3Description;
    document.getElementById("service4Title").textContent = language.services.services4.service4Title;
    document.getElementById("service4Description").textContent = language.services.services4.service4Description;
    document.getElementById("service4Title").textContent = language.services.services4.service4Title;
    document.getElementById("service4Description").textContent = language.services.services4.service4Description;
    document.getElementById("service5Title").textContent = language.services.services5.service5Title;
    document.getElementById("service5Description").textContent = language.services.services5.service5Description;
    document.getElementById("service6Title").textContent = language.services.services6.service6Title;
    document.getElementById("service6Description").textContent = language.services.services6.service6Description;

    //portfolio
    document.getElementById("portfolioTitle1").textContent = language.portfolio.portfolioTitle1;
    document.getElementById("portfolioTitle2").textContent = language.portfolio.portfolioTitle2;
    document.getElementById("filter1").textContent = language.portfolio.filters.filter1;
    document.getElementById("filter2").textContent = language.portfolio.filters.filter2;
    document.getElementById("filter3").textContent = language.portfolio.filters.filter3;
    document.getElementById("filter4").textContent = language.portfolio.filters.filter4;
    document.getElementById("portfolio1Title").textContent = language.portfolio.portfolio1.portfolio1Title;
    document.getElementById("portfolio1Desc").textContent = language.portfolio.portfolio1.portfolio1Desc;
    document.getElementById("portfolio2Title").textContent = language.portfolio.portfolio2.portfolio2Title;
    document.getElementById("portfolio2Desc").textContent = language.portfolio.portfolio2.portfolio2Desc;
    document.getElementById("portfolio3Title").textContent = language.portfolio.portfolio3.portfolio3Title;
    document.getElementById("portfolio3Desc").textContent = language.portfolio.portfolio3.portfolio3Desc;
    document.getElementById("portfolio4Title").textContent = language.portfolio.portfolio4.portfolio4Title;
    document.getElementById("portfolio4Desc").textContent = language.portfolio.portfolio4.portfolio4Desc;
    document.getElementById("portfolio5Title").textContent = language.portfolio.portfolio5.portfolio5Title;
    document.getElementById("portfolio5Desc").textContent = language.portfolio.portfolio5.portfolio5Desc;
    document.getElementById("portfolio6Title").textContent = language.portfolio.portfolio6.portfolio6Title;
    document.getElementById("portfolio6Desc").textContent = language.portfolio.portfolio6.portfolio6Desc;
    document.getElementById("portfolio7Title").textContent = language.portfolio.portfolio7.portfolio7Title;
    document.getElementById("portfolio7Desc").textContent = language.portfolio.portfolio7.portfolio7Desc;
    document.getElementById("portfolio8Title").textContent = language.portfolio.portfolio8.portfolio8Title;
    document.getElementById("portfolio8Desc").textContent = language.portfolio.portfolio8.portfolio8Desc;
    document.getElementById("portfolio9Title").textContent = language.portfolio.portfolio9.portfolio9Title;
    document.getElementById("portfolio9Desc").textContent = language.portfolio.portfolio9.portfolio9Desc;

    //Contacts
    document.getElementById("contactTitle1").textContent = language.contact.contactTitle1;
    document.getElementById("contactTitle2").textContent = language.contact.contactTitle2;
    document.getElementById("contactAdress1").textContent = language.contact.contactAdress1;
    document.getElementById("contactAdress2").textContent = language.contact.contactAdress2;
    document.getElementById("contactSocial").textContent = language.contact.contactSocial;
    document.getElementById("contactEmail1").textContent = language.contact.contactEmail1;
    document.getElementById("contactEmail2").textContent = language.contact.contactEmail2;
    document.getElementById("contactPhone1").textContent = language.contact.contactPhone1;
    document.getElementById("contactPhone2").textContent = language.contact.contactPhone2;
    document.getElementById("name").placeholder = language.contact.form.name;
    document.getElementById("email").placeholder = language.contact.form.email; 
    document.getElementById("subject").placeholder = language.contact.form.subject;
    document.getElementById("message").placeholder = language.contact.form.message;
    document.getElementById("liveAlertBtn").textContent = language.contact.form.liveAlertBtn;
  
    //ContactForm
    document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.send("service_mwvejg5", "template_mo4vbzk", {
        "from_name":"CV-website",
        "CV_name": contactForm.name.value,
        "CV_email": contactForm.email.value,
        "CV_subject": contactForm.subject.value,
        "CV_message": contactForm.message.value
      })
      .then(function(response) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  
        const alert = (message, type) => {
                    const wrapper = document.createElement('div')
                    wrapper.innerHTML = [
                        `<div id="alert1" class="alert alert-${type} alert-dismissible" role="alert">`,
                        `   <div>${message}</div>`,
                        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                        '</div>'
                    ].join('')
  
                    alertPlaceholder.append(wrapper)
                    }

                alert('Mensagem enviada com sucesso!', 'success')
  
        console.log('SUCCESS!');
      }, function(error) {
        console.log('FAILED...', error);
      });
  });
});