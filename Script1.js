/* -----------------------------
Global Variables
------------------------------*/
var houses = [];
var apartments = [];

/* -----------------------------
Global Listeners
------------------------------*/

$("select#dpdType").change(function () {
    if ($(this).val() === "house") {
        $("div#apartment").prop("hidden", true);
        $("div#house").prop("hidden", false);
    } else if ($(this).val() === "apartment") {
        $("div#apartment").prop("hidden", false);
        $("div#house").prop("hidden", true);
        $('.money').mask('#.##0,00', {
            reverse: true
        });
    }

    $('.phone').mask('(00) Z 0000-0000', {
        translation: {
            'Z': {
                pattern: /9/,
                optional: true
            }
        }
    });
});

/* -----------------------------
Functions for Houses
------------------------------*/
function SaveHouse() {

    var address = $("input#houseAddress").val();
    var number = $("input#houseNumber").val();
    var complement = $("input#houseComplement").val();
    var phone = $("input#housePhone").val();

    var house = {
        address: address,
        number: number,
        complement: complement,
        phone: phone
    };

    var id = parseInt($("input#btnSubmitHouse").attr("data-index-position").toString());

    if (id > -1) {
        houses[id] = house;
    } else {
        houses.push(house);
    }

    HousesFillTable();

}

function HousesFillTable() {
    $("div#house-info table.table tbody").html(function () {
        var html = "";

        for (var i = 0; i < houses.length; i++) {
            html += "<tr>";
            html += "<td scope=\"row\">" + houses[i].address + "</td>";
            html += "<td scope=\"row\">" + houses[i].number + "</td>";
            html += "<td scope=\"row\">" + houses[i].complement + "</td>";
            html += "<td scope=\"row\">" + houses[i].phone + "</td>";
            html += "<td scope=\"row\"><button type=\"button\" class=\"btn btn-warning\" onclick=\"HouseEdit(" + i + ")\">Editar</button>";
            html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"HouseDelete(" + i + ")\">Excluir</button></td>";
            html += "</tr>";
        }
        return html;
    });

    HouseResetForm();
}

function HouseDelete(position) {
    houses.splice(position, 1);
    HousesFillTable();
}

function HouseEdit(position) {
    $("input#houseAddress").val(houses[position].address);
    $("input#houseNumber").val(houses[position].number);
    $("input#houseComplement").val(houses[position].complement);
    $("input#housePhone").val(houses[position].phone);
    $("input#btnSubmitHouse").val("Salvar alterações");
    $("input#btnSubmitHouse").attr("data-index-position", position);
    $("input#btnSubmitHouse").attr("class", "btn btn-warning");
}

function HouseResetForm() {
    $("form#house-form").trigger("reset");
    $("input#btnSubmitHouse").attr("data-index-position", "-1");
    $("input#btnSubmitHouse").attr("class", "btn btn-success");
    $("input#btnSubmitHouse").val("Salvar");


    if (houses.length < 1) {
        $("div#house-info").prop("hidden", true);
    } else $("div#house-info").prop("hidden", false);
}

/* -----------------------------
Functions for Apartments
------------------------------*/
function SaveApartment() {

    var address = $("input#apartmentAddress").val();
    var number = $("input#apartmentNumber").val();
    var complement = $("input#apartmentComplement").val();
    var phone = $("input#apartmentPhone").val();
    var garage = $("input[name='apartmentGarage']:checked").val();
    var pool = $("input[name='apartmentPool']:checked").val();
    var court = $("input[name='apartmentCourt']:checked").val();
    var date = $("input#apartmentDate").val();
    var price = "R$ "+$("input#apartmentPrice").val();

    var apartment = {
        address: address,
        number: number,
        complement: complement,
        phone: phone,
        garage: garage,
        pool: pool,
        court: court,
        date: date,
        price: price
    };

    var id = parseInt($("input#btnSubmitApartment").attr("data-index-position").toString());

    if (id > -1) {
        apartments[id] = apartment;
    } else {
        apartments.push(apartment);
    }

    ApartmentsFillTable();
}

function ApartmentsFillTable() {
    $("div#apartment-info table.table tbody").html(function () {
        var html = "";

        for (var i = 0; i < apartments.length; i++) {
            html += "<tr>";
            html += "<td scope=\"row\">" + apartments[i].address + "</td>";
            html += "<td scope=\"row\">" + apartments[i].number + "</td>";
            html += "<td scope=\"row\">" + apartments[i].complement + "</td>";
            html += "<td scope=\"row\">" + apartments[i].phone + "</td>";
            html += "<td scope=\"row\">" + apartments[i].garage + "</td>";
            html += "<td scope=\"row\">" + apartments[i].date + "</td>";
            html += "<td scope=\"row\">" + apartments[i].price + "</td>";
            html += "<td scope=\"row\">" + apartments[i].pool + "</td>";
            html += "<td scope=\"row\">" + apartments[i].court + "</td>";
            html += "<td scope=\"row\"><button type=\"button\" class=\"btn btn-warning\" onclick=\"ApartmentEdit(" + i + ")\">Editar</button>";
            html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"ApartmentDelete(" + i + ")\">Excluir</button></td>";
            html += "</tr>";
        }
        return html;
    });

    ApartmentResetForm();
}

function ApartmentResetForm() {
    $("form#apartment-form").trigger("reset");
    $("input#btnSubmitApartment").attr("data-index-position", "-1");
    $("input#btnSubmitApartment").attr("class", "btn btn-success");
    $("input#btnSubmitApartment").val("Salvar");


    if (apartments.length < 1) {
        $("div#apartment-info").prop("hidden", true);
    } else $("div#apartment-info").prop("hidden", false);
}

function ApartmentDelete(position) {
    apartments.splice(position, 1);
    ApartmentsFillTable();
}

function ApartmentEdit(position) {
    $("input#apartmentAddress").val(apartments[position].address);
    $("input#apartmentNumber").val(apartments[position].number);
    $("input#apartmentComplement").val(apartments[position].complement);
    $("input#apartmentPhone").val(apartments[position].phone);
    $("input#apartmentDate").val(apartments[position].date);
    $("input#apartmentPrice").val(apartments[position].price);

    if (apartments[position].garage == "Sim")
        $("input[name='apartmentGarage'][value='Sim']").prop("checked", true);
    else $("input[name='apartmentGarage'][value='Não']").prop("checked", true);

    if (apartments[position].pool == "Sim")
        $("input[name='apartmentPool'][value='Sim']").prop("checked", true);
    else $("input[name='apartmentPool'][value='Não']").prop("checked", true);

    if (apartments[position].court == "Sim")
        $("input[name='apartmentCourt'][value='Sim']").prop("checked", true);
    else $("input[name='apartmentCourt'][value='Não']").prop("checked", true);

    $("input#btnSubmitApartment").val("Salvar alterações");
    $("input#btnSubmitApartment").attr("data-index-position", position);
    $("input#btnSubmitApartment").attr("class", "btn btn-warning");
}
