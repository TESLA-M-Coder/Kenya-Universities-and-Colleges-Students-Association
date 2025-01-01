// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Feature with Suggestions
const searchBar = document.querySelector('#search-bar input');
const suggestionsBox = document.createElement('div');
suggestionsBox.id = 'search-suggestions';
suggestionsBox.style.position = 'absolute';
suggestionsBox.style.background = '#fff';
suggestionsBox.style.border = '1px solid #ccc';
suggestionsBox.style.borderRadius = '5px';
suggestionsBox.style.padding = '10px';
suggestionsBox.style.display = 'none';
document.querySelector('#search-bar').appendChild(suggestionsBox);

searchBar.addEventListener('input', function () {
    const query = searchBar.value.toLowerCase();
    const suggestions = [];

    document.querySelectorAll('main section').forEach(section => {
        const chapterTitle = section.querySelector('h2').innerText.toLowerCase();
        const chapterContent = section.querySelector('p').innerText.toLowerCase();

        if (chapterTitle.includes(query) || chapterContent.includes(query)) {
            suggestions.push(section.querySelector('h2').innerText);
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Update suggestions box
    if (query && suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions.map(suggestion => `<p>${suggestion}</p>`).join('');
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
});

// Collapsible Sections
document.querySelectorAll('main section').forEach(section => {
    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Toggle Content';
    toggleButton.style.margin = '10px 0';
    section.insertBefore(toggleButton, section.querySelector('p'));

    toggleButton.addEventListener('click', () => {
        const content = section.querySelector('p');
        if (content.style.display === 'none') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
});

// Navigation Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.id;

        if (rect.top <= 150 && rect.bottom >= 150) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Hero Section Animation
window.addEventListener('load', () => {
    const heroText = document.querySelector('#hero h1 .dynamic-text');
    const logo = document.querySelector('#hero img');

    heroText.style.opacity = '0';
    logo.style.opacity = '0';

    setTimeout(() => {
        logo.style.transition = 'opacity 2s';
        logo.style.opacity = '1';

        setTimeout(() => {
            heroText.style.transition = 'opacity 2s';
            heroText.style.opacity = '1';
        }, 500);
    }, 500);
});




//Add this script to allow users to click on an article heading to expand or collapse the content
document.querySelectorAll('.article h2').forEach(articleHeading => {
    articleHeading.addEventListener('click', () => {
      const content = articleHeading.nextElementSibling;
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });
  

 // Function to toggle chapter visibility
function toggleChapter(button) {
    const content = button.nextElementSibling; // Get the chapter content div
    if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "block"; // Show content
      button.innerText = button.innerText.replace("Show", "Hide"); // Change button text
    } else {
      content.style.display = "none"; // Hide content
      button.innerText = button.innerText.replace("Hide", "Show"); // Change button text
    }
  }
  
  // Function to scroll to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling effect
    });
  }

  
  //Bookmark Chapters
  function bookmarkChapter(chapterId) {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (!bookmarks.includes(chapterId)) {
      bookmarks.push(chapterId);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      alert("Chapter bookmarked!");
    } else {
      alert("Chapter already bookmarked!");
    }
  }
  
  function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.forEach((id) => {
      document.getElementById(id).classList.add("highlight");
    });
  }
    
  
//Chapter Progress Bar
  function updateProgressBar(chapterId) {
    const chapter = document.getElementById(chapterId);
    const progressBar = chapter.querySelector(".progress-bar");
    const scrollHeight = chapter.scrollHeight;
    const scrollTop = chapter.scrollTop;
    const clientHeight = chapter.clientHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progressBar.style.width = scrollPercentage + "%";
  }
  
//Save Reading Progress
  function toggleNightMode() {
    document.body.classList.toggle("night-mode");
  }

  
  function saveProgress(chapterId) {
    localStorage.setItem("lastRead", chapterId);
  }
  
  function loadProgress() {
    const lastRead = localStorage.getItem("lastRead");
    if (lastRead) {
      document.getElementById(lastRead).scrollIntoView({ behavior: "smooth" });
    }
  }
  