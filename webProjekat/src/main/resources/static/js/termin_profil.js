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


//************* PRIKAZ TERMINA *************
$(document).ready(function () {
    var id = window.localStorage.getItem('idTermin')    //dobavljanje idTermina

    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini/"+id,    //vraca nam termin sa tim id-em
        dataType: "json",

        success: function (res) {
            console.log("SUCCESS:\n", res);

            $("#cena").html(res["cena"]);   //izvlaci vrednosti atributa tog termina
            $("#brojPrijavljenihClanova").html(res["brojPrijavljenihClanova"]);
            $("#vremeTermina").html(res["vremeTermina"]);
            $("#trening").html(res["trening"]["naziv"]);
            $("#sala").html(res["sala"]["oznakaSale"]);
            $("#fitnessCentar").html(res["fitnessCentar"]["naziv"]);
            $("#idTermin").val(res["id"]);

        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});

//************** PRIJAVA NA TRENING ****************
//posle klika na submit dugme Prijava na profilu termina
$(document).on("submit", "form", function (event) {
    event.preventDefault();

    // preuzimamo vrednost tog termina sto je SKRIVENI id nakon klika na SUBMIT DUGME Prijava
    var id = $(this).find('input:hidden').val();
    let korisnickoIme =  document.cookie.split("&")[1].split("=")[1]

    // ajax poziv
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/prijavaTreninga?terminId=" + id +"&korisnickoIme="+korisnickoIme,   //

        success: function (res) {
            console.log(res);
            alert("Uspešna prijava za trening!");
            location.reload();
        },
        error: function (data) {
            alert("Neuspešna prijava. Nema slobodnih mesta ili ste već prijavljeni.");
            console.log(data);
        }
    });
});


