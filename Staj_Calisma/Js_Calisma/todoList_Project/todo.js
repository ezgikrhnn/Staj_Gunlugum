//projemizin ilk kısımlarında elementleri seçmeyle işe başlayalm: TÜM ELEMENTLERİ SEÇME:
const form = document.querySelector("#todo-form");  //idsini # ile seçtim.
const todoInput = document.querySelector("#todo");  //ekleme yapabilmek için inputu da seçiyorum.
const todolist = document.querySelector(".list-group");  //ul listi için parentin classını . ile seçtim.
const firstCardBody = document.querySelectorAll(".card-body")[0]; //i 2 tane card-body sınıfı olduğu için 1. olanı alıyorum.
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter"); //filter inputu da seçiyorum
const clearButton = document.querySelector("#clear-todos");


//forma submit olayı kazandırabilmem lazım yani submit edildiğinde todo'mu list item olarak elde etmem gerekiyor.
//bu nedenle ilk olarak bir fonksiyon yazıyorum.
// bu fonksiyonda tüm event listenerları ekleyeceğim yani fonksiyonun görevi eventlistenerları atamak olacak.
eventListeners();
function eventListeners(){  
    form.addEventListener("submit", addTodo); //submit oldugunda addTodo'yu çalıştırması için bir tane event listener atıyorum.
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);  //to-doları localstoragedan alıp UIa getirebilmek için eventListener ekliyorum.

    // secondCardBody'de carpılara tıklandıgında todolar silinsin istiyorum.
    secondCardBody.addEventListener("click", deleteTodo);
}
function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){ //eger sadece fafaremove sınıfına tıklandıysa yani x'lara tıklandıysa
        e.target.parentElement.parentElement.remove();  //2 kere parent element bakyorum cunku en büyük li'ye de erişmem gerekiyor.
        showAlert("success", "todo başarıyla silindi..."); //yeşil renkli yani success alerti ekranda görünecek.
    }

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage(); //arrayimi bu fonksiyonu çağırarak aldım.
    todos.array.array.forEach(element => {
        
    });
}


function addTodo(e){
    //inputtaki degerleri almam lazım:
    const newTodo = todoInput.value.trim(); //diye inputları alıyorum.trim() ile boşlukla girilen değerleri düzeltiyorum.
    

    if(newTodo === ""){
        showAlert("danger", "lutfen bir todo girin"); //input boşsa uyarı verilsin
    }else{
        addTodoToUI(newTodo);//aldıgım degeri arayüze göndermesi için bu fonksiyonu cagırıyorum 
        //arayüze eklediğim todoları local storage'da eklemem gerekiyor.
        addTodoToStorage(newTodo);
        showAlert("success", "todo başarıyla eklendi");
    }
    //ilk olarak formumuz tekrardan sayfaya yönlenmesin diye default olan özelliği engelliyorum:
    e.preventDefault();
}


function getTodosFromStorage(){ //bu fonksiyon direkt storagedan bütün todoları alır.
    let todos;
    if (localStorage.getItem("todos" === null)){ //localStorage'da todos isimli bir key var mı kontrolunu yapıyorum.
        todos = [];//eger yoksa todos arrayini boş bir şekilde başlat.
    }else{
        todos =JSON.parse(localStorage.getItem("todos")); //içerisi string olduğu için bunu arraye ceviriyorum.
    }
    return todos;

}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage(); //yukarıdaki fonks. cağırdım.
    todos.push(newTodo);

    //degerimi guncellemem gerekiyor:
    localStorage.setItem("todos", JSON.stringify(todos)) //arrayleri string hale cevirmek için stringfy kullanılır.
    
}


function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = 'alert alert-${type}';
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    //alertin bir sn sonra silinmesini istiyorum. setTimeout metodu kullanıyorum.
    //setTimeout 2 deger alır: fonsiyon ve ne zamanda calışacağı degerleri.
    setTimeout(function(){
        alert.remove();
    },1000);  //1000 milisn yani 1 sn sonra fonksiyon çalışsın.

}


function addTodoToUI(newTodo){  // bu fonksiyon aldıgı string degerini list item olarak UI'ya ekleyecek.

    /*  <!-- <li class="list-group-item d-flex justify-content-between">
                            To-do1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>--> */

    //LIST ITEM OLUŞTURMA
    const listItem = document.createElement("li"); //yeni bir li elementi oluşturuyorum.
    //LİNK OLUŞTURMA
    const link = document.createElement("a");  //bir tane de link oluşturuyorum
    link.href = "#"; //oluşturduğum linkime href özelliği veriyorum.
    link.className = "delete-item"; //linkime class adı veriyorum.
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    //TEXT NODE EKLEME
    //(todo1 'i) gelen texti listItem'a text node olarak eklemem gerekiyor
    //text node bunun bir cocugu oldugu için appendChild olarak ekliyorum:
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link); //oluşturdugum linki de ekliyorum.

    // TO-DoOlİSTE LİSTİTEM'I EKLEME
    //en başta ouşturdugum ul'lere yani todoList'e listitem'i ekleyecegım
    todolist.appendChild(listItem);
}
