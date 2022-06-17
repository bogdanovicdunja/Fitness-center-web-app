//********** dobavljamo korisnika i njegove podatke *********
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikClan/"+idKorisnika,
        dataType: "json",

        success: function (res) {
            $("#ime").val(res["ime"]);  //izvlacim podatke dobavljenog korisnika
            $("#prezime").val(res["prezime"]);
            $("#korisnickoIme").val(res["korisnickoIme"]);
            $("#lozinka").val(res["lozinka"]);
            $("#kontaktTelefon").val(res["kontaktTelefon"]);
            $("#eMail").val(res["eMail"]);
            $("#datumRodjenja").val(moment(res["datumRodjenja"]).format("YYYY-MM-DDTHH:mm"));


        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});


//************** AZURIRANJE ****************
//na submit dugme Azuriraj
$(document).on("submit", "#izmenaClan", function (event) {
    event.preventDefault();
    var id = localStorage.getItem("id");    //pamtim i id korisnika da ne bi napravio novog clana vec izmenio tog postojeceg

    //preuzimamo vrednosti iz forme
    var korisnickoIme = $("#korisnickoIme").val();
    var lozinka = $("#lozinka").val();
    var ime = $("#ime").val();
    var prezime = $("#prezime").val();
    var kontaktTelefon = $("#kontaktTelefon").val();
    var eMail = $("#eMail").val();
    var datumRodjenja = $("#datumRodjenja").val();


    // kreiramo objekat Clan
    var clan = {
        id,
        korisnickoIme,
        lozinka,
        ime,
        prezime,
        kontaktTelefon,
        eMail,
        datumRodjenja
    }
    console.log(clan);

    // ajax poziv
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/izmenaClan",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(clan),

        success: function (res) {
            console.log(res);
            alert("Clan " + res.id + " je uspesno azuriran!");
        },
        error: function (data) {
            alert("Greska! Neuspesno auriranje.");
            console.log(data);
        }
    });
});

