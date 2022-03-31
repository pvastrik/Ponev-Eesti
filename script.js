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
        "location": "tartumaa",
        "cat": "veepark vesi "
    },
    {
        "name": "pärnu spa",
        "image": "parnu",
        "location": "parnumaa",
        "cat": "veepark vesi "
    },
    {
        "name": "aura veekeskus",
        "image": "aura",
        "location": "tartumaa",
        "cat": "veepark vesi "
    },
    {
        "name": "vembu-tembumaa",
        "image": "vembu-tembu",
        "location": "harjumaa",
        "alt": "vembu tembumaa",
        "cat": "veepark vesi "
    },
    {
        "name": "kumu",
        "image": "kumu",
        "location": "harjumaa",
        "alt": "muuseum kunsti eesti"
    },
    {
        "name": "erm",
        "image": "erm",
        "location": "tartumaa",
        "alt": "eesti rahva muuseum"
    },
    {
        "name": "mänguasja-muuseum",
        "image": "manguasja",
        "location": "tartumaa",
        "alt": "mänguasja muuseum"
    },
    {
        "name": "spordi-muuseum",
        "image": "spordi",
        "location": "tartumaa"
    },
    {
        "name": "taevaskoja",
        "image": "taevaskoja",
        "location": "põlvamaa",
        "alt": "liivakivi paljand",
        "cat": "loodus"
    },
    {
        "name": "peipsi järv",
        "image": "peipsi",
        "location": "tartumaa jõgevamaa idavirumaa põlvamaa",
        "alt": "liivakivi paljand",
        "cat": "loodus"
    },
    {
        "name": "endla loodus-kaitseala",
        "image": "endla",
        "location": "järvamaa jõgevamaa läänevirumaa",
        "alt": "soomatk metsamaja matkarada puhkekoht",
        "cat": "loodus"
    },
    {
        "name": "meremõisa",
        "image": "meremoisa",
        "location": "harjumaa",
        "alt": "rand vesi vee",
        "cat": "loodus"
    },

]
// veeparkide lehe laadimisel kontrollib hashi
window.onload = function() {
    var leht = location.pathname;
    if(leht.match("otsing.html")) {
        if (window.location.hash === "") {
            render(places);
        } else {
            var hashValue = window.location.hash.substring(1);
            hashValue = hashValue.replaceAll("%20", " ");
            searchPlaces(hashValue);

        }
    }else if (leht.match("Muuseumid.html")) {
        searchPlaces("muuseum");
    }else if (leht.match("Veepargid.html")) {
        searchPlaces("veepark");
    }else if (leht.match("looduspuhkus.html")) {
        searchPlaces("loodus");
    }
}
// laeb veeparkide lehe koos hashiga
function giveHash(event) {
    var hash = document.getElementById("search-text").value;
    window.location = "otsing.html#" + hash;
    searchPlaces(hash);

}

// võrdleb antud inputi kõigi kohtade kõikide atribuutidega,
function searchPlaces(input) {

    var tokens = input.toLowerCase().split(' ').filter(function(token) {
        return token.trim() !== '';
    });
    if(tokens.length) {
        filteredList = filterList(places, tokens);
        render(filteredList);
        document.querySelector("#title").scrollIntoView();
    }
}
function filterList(list, tokens) {
    var searchRegex = new RegExp(tokens.join("|", 'gim'));
    var filteredList = list.filter(function(place) {
        var placeString = '';
        for (var key in place) {
            if(place.hasOwnProperty(key) && place[key] !== '') {
                placeString += place[key].toString().toLowerCase().trim() + ' ';
            }
        }
        return placeString.match(searchRegex);
    });
    return filteredList;
}

function dropdownFilter(input) {
    var hashValue = window.location.hash.substring(1);
    var tokens = hashValue.split("%20");
    var inputs = input.split(" ");
    var filteredList;
    var leht = window.location.toString().split("/");
    leht = leht[leht.length-1];
    if(tokens.length) {
        filteredList = filterList(places, tokens);
    }
    filteredList = filterList(filteredList, inputs);
    if (leht.match("Muuseumid.html")) {
        filteredList = filterList(filteredList, "muuseum".split(" "));
    }else if (leht.match("Veepargid.html")) {
        filteredList = filterList(filteredList, "veepark".split(" "));
    }else if (leht.match("looduspuhkus.html")) {
        filteredList = filterList(filteredList, "loodus".split(" "));
    }

    render(filteredList);
    document.querySelector("#title").scrollIntoView();

}


// lisab piltide divi antud objektide pildid

function render(data) {
    var div = document.querySelector(".gallery-links");
    var divHTMLString = "<h2 class='noresult'>Kahjuks selliseid kohti meie lehel ei leidu.</h2>"

    if(data.length!==0) {
        divHTMLString = data.map(function (place) {
            var image = "img/" + place.image + ".jpg";
            var name = place.name.toUpperCase()
            return `<a href="#" class="gallery-image">
                <div class="container">
                    <img src=` + image + " alt=" + place.name + `>
                    <p class="post-header">` + name + `</p>
                </div>
            </a>`;
        }).join('');
    }
    div.innerHTML = divHTMLString;
    }

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