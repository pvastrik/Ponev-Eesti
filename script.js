// karusselli automaatne liikumine
$('.carousel').carousel({
    interval: 5000
});

// enteri kasutamiseks
$("#search-text").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        giveHash();
    }
});

// kohtade objektide massiivid
var places = [
    {
        "name": "vudila", // hiljem pannakse uppercase
        "image": "vudila", // ilma jpg-ta
    },
    {
        "name": "pärnu spa",
        "image": "parnu",
    },
    {
        "name": "aura veekeskus",
        "image": "aura",
    },
    {
        "name": "vembu-tembumaa",
        "image": "vembu-tembu",
        "alt": "vembu tembumaa"
    },
]
// veeparkide lehe laadimisel kontrollib hashi
window.onload = function() {
    if(location.pathname.match("veepargid.html")) {
        if (window.location.hash === "") {
            render(places);
        } else {
            var hashValue = window.location.hash.substring(1);
            hashValue = hashValue.replaceAll("%20", " ");
            searchPlaces(hashValue);

        }
    }
}
// laeb veeparkide lehe koos hashiga
function giveHash(event) {
    var hash = document.getElementById("search-text").value;
    window.location = "veepargid.html#" + hash;
    searchPlaces(hash);

}

// võrdleb antud inputi kõigi kohtade kõikide atribuutidega,
function searchPlaces(input) {

    var tokens = input.toLowerCase().split(' ').filter(function(token) {
        return token.trim() !== '';
    });
    if(tokens.length) {
        var searchRegex = new RegExp(tokens.join("|", 'gim'));
        var filteredList = places.filter(function(place) {
            var placeString = '';
            for (var key in place) {
                if(place.hasOwnProperty(key) && place[key] !== '') {
                    placeString += place[key].toString().toLowerCase().trim() + ' ';
                }
            }
            return placeString.match(searchRegex);
        });
        render(filteredList);
        document.querySelector("#title").scrollIntoView();
    }
}
// lisab piltide divi antud objektide pildid

function render(data) {
    var div = document.querySelector(".gallery-links");

    var divHTMLString = data.map(function(place) {
        var image = "img/" + place.image +".jpg";
        var name = place.name.toUpperCase()
        return `<a href="#" class="gallery-image">
                <div class="container">
                    <img src=` + image + " alt="+place.name + `>
                    <p class="post-header">` + name + `</p>
                </div>
            </a>`;
    }).join('');

    div.innerHTML = divHTMLString;
    };

// võimalik viis kohtade tekstide suuruse muutmiseks vastavalt pikkusele (ei saanud tööle prg)
// const input = document.querySelector('input');
// const postHeaders = document.getElementsByClassName('.post-header');
// const outputContainer = document.querySelector('.container');
//
// for (let i = 0; i < postHeaders.length; i++) {
//     resizePostHeader(postHeaders[i]);
// }
// function resizePostHeader(postHeader) {
//     let fontSize = postHeader.style.fontSize;
//     postHeader.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
//
//     if (postHeader.clientWidth >= 200) {
//         resizePostHeader();
//     }
// }