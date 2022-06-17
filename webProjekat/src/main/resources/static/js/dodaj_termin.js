//************* provera uloge preko id-a na backendu *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikTrener/"+idKorisnika,   //korisnik controller trazi ulogu tog korisnika
        dataType: "json",
        contentType: "application/json",

        success: function (res){
            console.log(res);
        },

        error: function (){
            alert("Nemate pristup stranici, niste trener!");
            window.location.href = "http://localhost:63342/webProjekat/static/index.html?_ijt=k78nv9sb3e1cdo9qe6tb337tvp";
        }
    });
});

//************* DODAVANJE TERMINA **************
$(document).ready(function () {
    //padajuci meni za sale
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/sala",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);
                for (i = 0; i < res.length; i++) {
                    let option = "<option value='" + res[i].id + "'>";
                    option += res[i].oznakaSale;
                    option += "</option>";
                    $('#salaId').append(option);
                }
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });

});


//posle dugmeta dodaj
$(document).on("submit", "#termin", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var vremeTermina = $("#vreme").val();
    var cena = $("#cena").val();
    var naziv = $("#naziv").val();
    var opis = $("#opis").val();
    var tipTreninga = $("#tipTreninga").val();
    var trajanje = $("#trajanje").val();

    var id = $("#salaId").val();

    // kreiramo objekat
    var trening = {
        naziv,
        opis,
        tipTreninga,
        trajanje,
    }
    var sala = {id};
    var termin = {vremeTermina, cena, trening, sala};
    console.log(termin);

    // ajax poziv
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/termini",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(termin),

        success: function (res) {
            console.log(res);
            alert("Termin " + res.id + " je uspesno kreiran!");
        },
        error: function (data) {
            alert("Greska! Termin nije kreiran.");
            console.log(data);
        }
    });
});