//************* provera uloge preko id-a na backendu *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikAdmin/"+idKorisnika,   //korisnik controller trazi ulogu tog korisnika
        dataType: "json",
        contentType: "application/json",

        success: function (res){
            console.log(res);
        },

        error: function (){
            alert("Nemate pristup ovoj stranici, niste administrator!");
            window.location.href = "http://localhost:63342/webProjekat/static/index.html?_ijt=k78nv9sb3e1cdo9qe6tb337tvp";
        }
    });
});

//*************** DOBAVLJANJE CENTRA KOJI SE AZURIRA *****************
$(document).ready(function () {
    var id = window.localStorage.getItem("idFitness"); //PREUZMEMO id centra koji admin zeli da izmeni

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/fitness-centar/"+id,  //lepimo taj id centra i vratimo FC sa tim id-em
        dataType: "json",

        success: function (res) {
            $("#idFitness").val(res["id"]);
            $("#naziv").val(res["naziv"]);  //izvlacim vrednosti atributa vracenog centra
            $("#adresa").val(res["adresa"]);
            $("#brojTelefona").val(res["brojTelefona"]);
            $("#eMail").val(res["eMail"]);
        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});

//******************* AZURIRANJE SALE *********************
//posle submit dugmeta Izmeni u formi ciji je id=fitness -> fitness_centar_izmeni.html
$(document).on("submit", "#fitness", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var naziv = $("#naziv").val();
    var adresa = $("#adresa").val();
    var brojTelefona = $("#brojTelefona").val();
    var eMail = $("#eMail").val();

    var id = $("#idFitness").val(); //da bi ga azurirao, a ne napravio novi FC

    // kreiramo objekat centar
    var centar = {
        naziv,
        adresa,
        brojTelefona,
        eMail,
        id,
    }
    console.log(centar);

    // ajax poziv
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/fitness-centar",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(centar),

        success: function (res) {
            console.log(res);
            alert("Centar " + res.id + " je uspesno azuriran!");
        },
        error: function (data) {
            alert("Greska! Centar nije azuriran.");
            console.log(data);
        }
    });
});