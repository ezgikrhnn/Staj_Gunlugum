
//veritiplerini stringe donusturme

value= 123;
console.log(value);
console.log(typeof value); //number oldugunu gorduk
value = String(123);  //bu sekilde string donusumu yapılıyor.

donus = String(true);
donus = String(3.14);
donus = String(function(){console.log()});


sayi = (10).toString(); //bunun da yukarıdakilerden çok bir farkı yok


//veri tiplerini sayılara cevirme:
value = number("123");
value = number(null);
value = number(undefined);
//bir fonksiyonu sayıya ceviremeyiz.
value = parseFloat("3.14");
value = parseInt("3");  //bu ik, metod da numbera donusturmede kullanılabilir.
