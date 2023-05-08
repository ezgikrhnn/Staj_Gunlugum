function UI(){
    
}
UI.prototype.addFilmToUI = function(newFilm){
    /* 
    <!-- <tr>
    <td><img src="" class="img-fluid img-thumbnail"></td>
    <td></td>
    <td></td>
    <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
    </tr> --> */

    //bu yapımızı tbody kısmına yerleştirmemiz gerekiyor.
    const filmList = document.getElementById("films"); //bodymin ıd'si filmLİst şeklindeydi.

    filmList.innerHTML += `
    <tr>
        <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
        <td>${newFilm.title}</td>
        <td>${newFilm.directory}</td>
        <td><a href="#" id="delete-film" class="btn btn-danger">Filmi Sil</a></td>
    </tr>`; //bu bizin arayüzümüze filmimizi eklemiş olacak.

}
UI.prototype.clearInputs = function (element1, element2, element3){
    element1.value ="";     //elemen'in içindeki value'yu boşaltmak istiyorum
    element2.value = "";    //element2'nin içindekini boşaltıyorum
    element3.value = "";    // element3'ün içindeki value'yu boşaltıyorum.

}
UI.prototype.displayMessages = function(message, type){
    //burada bir tane div oluşturup html formun altına hr olarak yani child olarak eklemem gerekiyor.
    const cardBody = document.querySelector(".card-body");
    
    //daha sonra alert divini oluşturmam gerekiyor.
    const div = document.createElement("div"); //div elementinde tipi success veya dangersa ona gore success veya danger yazmam gerekiyor.
    div.className = `alert-alert-${type}`;
    div.textContent = message;

    //card-body'me yeni bir çocuk olarak bu divi eklemem gerekiyor.
    cardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },1000); //1 sn sonra silinmesi için de setTimeout yaptım.
}
UI.prototype.loadAllFilms = function(film){
    const filmList = document.getElementById("films");
    films.forEach(function(film){
        filmList.innerHTML += `<tr>
        <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>
        <td>${film.title}</td>
        <td>${film.directory}</td>
        <td><a href="#" id="delete-film" class="btn btn-danger">Filmi Sil</a></td>
    </tr>`;
    })
}
UI.prototype.deleteFilmFromUI = function(element){
    //a elementinin bir üst elementine yani parentine gitmem gerekiyor.
    element.parentElement.parentElement.remove(); //bu şekilde Filmi Sil tıklanınca silinecek.
}
UI.prototype.clearAllFilmsFromUI = function(){
    const filmList = document.getElementById("films");
    
    while(filmList.firstElementChild !== null){ //child oldugu sürece
        filmList.firstElementChild.remove();    //şeklinde kaldırıyorum.
        
    }
}
