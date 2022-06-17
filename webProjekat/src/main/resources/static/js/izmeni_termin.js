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

//******** PADAJUCI MENI ZA SALE ********
$(document).ready(function () {
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

//************* DOBAVLJANJE TERMINA **************
$(document).ready(function () {
    var idTermina = localStorage.getItem("idTermina");  //dobavimo idTermina koji trener zeli da izmeni

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/termini/"+idTermina,
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);
                $("#idTermina").val(res.id);
                $("#cena").val(res.cena);
                $("#vreme").val(moment(res["vremeTermina"]).format("YYYY-MM-DDTHH:mm"));
                $("#naziv").val(res.trening.naziv);
                $("#opis").val(res.trening.opis);
                $("#tipTreninga").val(res.trening.tipTreninga);
                $("#trajanje").val(res.trening.trajanje);
                $("#salaId").val(res.sala.id);

            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });

});


//*********** IZMENA TERMINA ************
//posle dugmeta Azuriraj termin
$(document).on("submit", "#termin", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var idTermina = $("#idTermina").val();  //da bi azurirao trenutni, a ne napravio novi
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
    var termin = {"id": idTermina, vremeTermina, cena, trening, sala};
    console.log(termin);

    // ajax poziv
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/termini",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(termin),

        success: function (res) {
            console.log(res);
            alert("Termin " + res.id + " je uspesno azuriran!");
        },
        error: function (data) {
            alert("Greska! Termin nije azuriran.");
            console.log(data);
        }
    });
});