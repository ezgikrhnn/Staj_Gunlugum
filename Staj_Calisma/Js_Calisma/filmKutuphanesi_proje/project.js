//ana js dosyası burasıdır.
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];   //2. card-body'yi seçiyorum.
const clear = document.getElementById("clear-films");

// uı objesini başlatma:
const ui = new UI();
//storage objesi üret:
const storage = new Storage();
//tüm eventleri yükleme:
eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);       //submit olduğunda addFilm fonksiyonunu calıştırsın.
    document.addEventListener("DOMContentLoaded", function(){       //sayfa yüklendiğinde eventi
        //ilk olarak local storagedan tüm arrayimi almam gerekiyor.
        let films = storage.getFilmFromStorage();
        ui.loadAllFilm(films); //sayfamız yüklendiğinde bu iki fonksiyonu biz kullanmış olduk.
    });

    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click",clearAllFilms);  //click oldugunda clearAllFilms fonk. çalıştırsın.


}
function addFilm(e){
    const title = titleElement.value; //3 input degerini aldım
    const director = directorElement.value;
    const url = urlElement.value;

    //yukarıdakilerin en az 1 tanesi bile boşsa hata yazdırsın:
    if(title === "" || director === "" || url === ""){
        //HATA alert ile
        ui.displayMessages("tüm alanları doldurun..", "danger");
    }else{
        //yeni film
        const newFilm = new Film(title, director, url);
        
        //ui objesi üzerinde fonksiyon cagırıyorum. filmi arayüze eklemeye clışıyorum.
        ui.addFilmToUI(newFilm); //arayğze film ekleme.
        storage.addFilmToStorage(newFilm);  //storage'a film ekleme.
        ui.displayMessages("film başarıyla eklendi..", "success");

    }

    //her ekleme yaptığımda inputun içindeki değer boşalacağından clearInputs fonksiyonunu burada cağırıyorum.
    //burası filmi sil kısmı değil,filmi ekledikten sonra inputun yeniden boş kalması için yapılan adım.
    ui.clearInputs(titleElement, urlElement, directorElement);


    e.preventDefault(); //formun submitini önlemek için
}
function deleteFilm(e){ //e = event objesi
    if (e.target.id ==="delete-film"){
        ui.deleteFilmFromUI(e.target); //a etiketini buraya gönderdim

        //filmi local storagedan silmek için:
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)  //önceki element kardeşimizi buluyoruz. text content ile içeriğini alıyoruz.);
        
        //silme işlemi için bilgilendirme mesajı yayınlıyorum:
        ui.displayMessages("silme işlemi başarılı..","success");
    }
}
function clearAllFilms(){
    if (confirm("Tümünü silmek istediğinize emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
    
}
