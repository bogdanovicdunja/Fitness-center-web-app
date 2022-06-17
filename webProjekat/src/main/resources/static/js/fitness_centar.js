
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

//************* DODAVANJE FITNESS CENTRA **************
$(document).on("submit", "#fitnessCentar", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var naziv = $("#naziv").val();
    var adresa = $("#adresa").val();
    var brojTelefona = $("#brojTelefona").val();
    var eMail = $("#eMail").val();

    // kreiramo objekat fitnessCentar
    var fitnessCentar = {
        naziv,
        adresa,
        brojTelefona,
        eMail,
    }
    console.log(fitnessCentar);

    // ajax poziv
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/fitness-centar",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(fitnessCentar),

        success: function (res) {
            console.log(res);
            alert("Fitness Centar " + res.id + " je uspesno kreiran!");
        },
        error: function (data) {
            //alert("Greska! Fitness centar nije kreiran.");
            console.log(data);
        }
    });
});