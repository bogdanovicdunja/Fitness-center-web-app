//************* provera uloge preko id-a na backendu *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikClan/"+idKorisnika,   //korisnik controller trazi ulogu tog korisnika
        dataType: "json",
        contentType: "application/json",

        success: function (res){
            console.log(res);
        },

        error: function (){
            alert("Nemate pristup ovoj stranici, niste clan!");
            window.location.href = "http://localhost:63342/webProjekat/static/index.html?_ijt=k78nv9sb3e1cdo9qe6tb337tvp";
        }
    });
});


//************* PRIKAZ NEOCENJENIH TRENINGA *************
$(document).ready(function () {
    // ajax poziv
    let korisnickoIme =  document.cookie.split("&")[1].split("=")[1]

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/prijavaTreningaOdradjeniBezOcene/korisnik/"+korisnickoIme,
        dataType: "json",

        success: function (res) {   //res je lista odradjenih treninga za korisnika sa tim korImenom cija je ocena = 0
            console.log("SUCCESS:\n", res);

            $("#treninziTabela").append("<tbody>");
            for (i = 0; i < res.length; i++) {
                let row = "<tr>";
                row += "<td>" + res[i].termin.trening.naziv + "</td>";
                row += "<td>" + res[i].termin.trening.tipTreninga + "</td>";
                row += "<td>" + res[i].termin.trening.opis + "</td>";
                row += "<td>" + res[i].termin.trening.trajanje + "</td>";
                row += "<td>" + res[i].termin.vremeTermina + "</td>";
                row += "<td>" + res[i].termin.cena + "</td>";
                row += "<td> <form id='ocenjivanje' method='post'> <input type='hidden' value='" + res[i].id +  " '> <input type='number' min='1' max='5' id='ocena'> <input type='submit' value='Oceni'></form> </td>";


                row += "</tr>";
                $('#treninziTabela').append(row);
            }
            $("#treninziTabela").append("</tbody>");
        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});

//**************** OCENJIVANJE TRENINGA ********************
$(document).on("submit", "#ocenjivanje", function (event) {
    event.preventDefault();

    // preuzimamo vrednost te prijave sto je skriveni id od gore nakon klika na submit dugme Oceni
    var id = $(this).find('input:hidden').val();
    var ocena = $(this).find('#ocena').val();


    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/prijavaTreningaOcenjivanje/"+id+"/?ocena="+ocena,

        success: function (res) {
            console.log(res);
            alert("Uspesno ocenjen!");
            location.reload();
        },
        error: function (data) {
            alert("Neuspešno ocenjen.");
            console.log(data);
        }
    });
});