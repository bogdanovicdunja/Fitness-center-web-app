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

//padajuci meni za fitness centre
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

//*************** DOBAVLJANJE SALE KOJA SE AZURIRA *****************
$(document).ready(function () {
    var id = window.localStorage.getItem("idSala"); //PREUZMEMO id Sale KOJU ADMIN MENJA

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/sala/"+id,  //lepimo taj id Sale i vratimo salu sa tim id-em
            dataType: "json",

            success: function (res) {
                $("#idSala").val(res["id"]);
                $("#kapacitet").val(res["kapacitet"]); //izvlaci vrednosti atributa te vracene sale
                $("#oznaka").val(res["oznakaSale"]);
                $("#fitnessCentarId").val(res["fitnessCentar"]["id"]);


            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});

//******************* AZURIRANJE SALE *********************
//posle submit dugmeta Izmeni u formi ciji je id=sala -> sala_izmeni.html
$(document).on("submit", "#sala", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var id = $("#idSala").val();    //da ne bi napravio novu salu, vec azurirao
    var kapacitet = $("#kapacitet").val();
    var oznakaSale = $("#oznaka").val();
    var idFitnessCentar = $("#fitnessCentarId").val();
    var fitnessCentar = {"id":idFitnessCentar}

    // kreiramo objekat SALA
    var sala = {
        id,
        kapacitet,
        oznakaSale,
       fitnessCentar,
    }
    console.log(sala);

    // ajax poziv
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/sala",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sala),

        success: function (res) {
            console.log(res);
            alert("Sala " + res.id + " je uspesno azurirana!");
        },
        error: function (data) {
            alert("Greska! Sala nije azurirana.");
            console.log(data);
        }
    });
});