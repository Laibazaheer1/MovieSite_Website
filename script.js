//  SEARCH FUNCTION
document.getElementById("query").addEventListener("input", function () {
    let filter = this.value.toLowerCase(); 
    let cards = document.querySelectorAll(".card");
    let found = false;

    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(filter)) {
            card.parentElement.style.display = "";
            found = true;
        } else {
            card.parentElement.style.display = "none"; 
        }
    });
// If no movie matches, show message
    if (!found) {
        if (!document.querySelector(".no-results")) {
            let msg = document.createElement("p");
            msg.textContent = "No movies found!";
            msg.className = "no-results";
            msg.style.color = "white";
            msg.style.textAlign = "center";
            msg.style.width = "100%";
            document.querySelector(".row").appendChild(msg);
        }
    } else {
        let msg = document.querySelector(".no-results");
        if (msg) msg.remove(); 
    }
});
// NAVBAR TRANSPARENCY ON SCROLL
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("transparent"); 
    } else {
        navbar.classList.remove("transparent"); 
    }
});
//  FILTER FUNCTION (with dropdowns)
document.addEventListener('DOMContentLoaded', function () {
    const selects = document.querySelectorAll('.filter-bar select');
    const cards   = Array.from(document.querySelectorAll('.row .card'));
    const grid    = document.querySelector('.row');
function filterMovies() {
        const genre  = (document.getElementById('genreFilter')?.value || 'all').toLowerCase();
        const year   = (document.getElementById('yearFilter')?.value || 'all');
        const rating = (document.getElementById('ratingFilter')?.value || 'all').toLowerCase();
        let anyVisible = false;
// If all dropdowns are set to "all", show everything
        if (genre === 'all' && year === 'all' && rating === 'all') {
            cards.forEach(card => {
                const wrapper = card.closest('.column') || card;
                wrapper.style.display = '';
            });
            let msg = document.getElementById('noResultsMsg');
            if (msg) msg.remove();
            return;
        }
// Normal filtering (check dataset attributes of each card)
        cards.forEach(card => {
            const g = (card.dataset.genre  || '').toLowerCase();
            const y = (card.dataset.year   || '');
            const r = (card.dataset.rating || '').toLowerCase();
            const match =
                (genre  === 'all' || g === genre) &&
                (year   === 'all' || y === year) &&
                (rating === 'all' || r === rating);

            const wrapper = card.closest('.column') || card;
            wrapper.style.display = match ? '' : 'none';
            if (match) anyVisible = true;
        });
// Show "no results" message if nothing matches
        let msg = document.getElementById('noResultsMsg');
        if (!anyVisible) {
            if (!msg) {
                msg = document.createElement('p');
                msg.id = 'noResultsMsg';
                msg.className = 'no-results';
                msg.textContent = 'No movies match your filters.';
                msg.style.color = 'white';
                msg.style.textAlign = 'center';
                grid.after(msg);
            }
        } else if (msg) {
            msg.remove();
        }
    }
// Run filter whenever dropdowns change
    selects.forEach(s => s.addEventListener('change', filterMovies));
    filterMovies(); 
});
//  TYPING EFFECT FOR HERO SECTION
document.addEventListener("DOMContentLoaded", function () {
    const heroTitle = document.querySelector(".hero-content h1");
    const heroText = document.querySelector(".hero-content p");
    const titleText = heroTitle.textContent;     
    const paragraphText = heroText.textContent;  
     heroTitle.textContent = ""; 
    heroText.textContent = "";
    let i = 0, j = 0;
    // Type title letter by letter
    function typeTitle() {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeTitle, 100);
        } else {
            setTimeout(typeParagraph, 500); 
        }
    }
// Type paragraph letter by letter
    function typeParagraph() {
        if (j < paragraphText.length) {
            heroText.textContent += paragraphText.charAt(j);
            j++;
            setTimeout(typeParagraph, 50);
        }
    }
typeTitle(); 
});
// REVEAL MOVIE CARDS ON SCROLL
const cards = document.querySelectorAll(".card");
function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < trigger) {
            card.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
