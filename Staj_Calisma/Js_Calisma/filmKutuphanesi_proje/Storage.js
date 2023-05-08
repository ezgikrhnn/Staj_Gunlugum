//amac filmlerimizi local storage'a eklemek:


//constructor oluşturuyorum.
function Storage(){  //herhangi bir özelliği olmayacak, prototype ile diğer fonksiyonları oluşturacağım.

}
Storage.prototype.addFilmToStorage = function(newFilm){
    let films = this.getFilmsFromStorage(); //fonskiyonunu burada cağırıyorum.
    
    films.push(newFilm);  //arrayime direkt aldığım newFilm'i eklemeye çalışıyorum.
    
    //filmimi arraye ekledim, şimdi arrayimi yeniden localStorage'a eklemem gerekiyor:
    localStorage.setItem("films",JSON.stringify(films)); //arrayi stringe cevirmek için JSON.strigify kullanabiliyorduk.
    
}
Storage.prototype.getFilmsFromStorage = function(){
    let films;

    if (localStorage.getItem("films") === null){ //film keyimiz burada var mı kontrolünü ediyorum.
        films = [];     //eger bu keyimiz yoksa burada boş bir array oluştursun
    }  
    else{    //eger varsa da bu arrayimizi JSON.parse() diyerek alıyoruz
        films = JSON.parse(localStorage.getItem("films"));  //locallStorage sadece string degerler aldıgı için burada parse ederek arraye ceviriyorum.
    }
    return films;

}
Storage.prototaype.deleteFilmFromStorage = function(filmTitle){
    //bana bir filmtitle gelecek ve bunu arrayimden silmeye çalışacağım.
    let films = this.getFilmsFromStorage(); //diyerek bu arrayimi alyorum.

    //film arrayi uzerinde foreach kullanarak gezinmem gerekiyot.
    films.forEach(function(film, index){
        if(film.title === filmTitle){   //şuanki bulunduğum objemin title'i gönderdiğimiz filmtitle'a eşitse arrayden sileceğiz.
                //arrayden silmek için splice() kullanılır.
                films.splice(index,1);
        }
    });

    //array içinden objemi sildim localstorage'a yeniden yazmam gerekiyor.
    localStorage.setItem("films", JSON.stringify(films));

}
Storage.prototype.clearAllFilmFromStorage = function(){
    localStorage.removeItem("films");
    
}