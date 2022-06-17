
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

//************* DODAVANJE SALE/FORMA **************
//padajuci meni za fitness centar
$(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/fitness-centar",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);
                for (i = 0; i < res.length; i++) {
                    let option = "<option value='" + res[i].id +  "'>";
                    option += res[i].naziv;
                    option += "</option>";
                    $('#fitnessCentarId').append(option);
                }
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});


//posle dugmeta dodaj
$(document).on("submit", "#sala", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var kapacitet = $("#kapacitet").val();
    var oznakaSale = $("#oznaka").val();
    var id = $("#fitnessCentarId").val();
    var fitnessCentar = {id}

    // kreiramo objekat SALA
    var sala = {
        kapacitet,
        oznakaSale,
        fitnessCentar,
    }
    console.log(sala);

    // ajax poziv
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/sala",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sala),

        success: function (res) {
            console.log(res);
            alert("Sala " + res.id + " je uspesno kreirana!");
        },
        error: function (data) {
            alert("Greska! Sala nije kreirana.");
            console.log(data);
        }
    });
});