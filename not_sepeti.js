
    
const yeni_Gorev= document.querySelector('.input-gorev');
// formumun içinde gorevi almak için        <inputa      gittik
// classına bakınca        class="form-item input-gorev"
// form-item  buttondada olduğundan        . input-gorev diye çağırdık

const yeni_Gorev_Ekle_Btn= document.querySelector('.btn-gorev-ekle');
// formumun içinde buttonu almak için        <button        gittik
// classına bakınca       class="form-item btn-gorev-ekle"
// form-item    inputta kullanıldığından      .btn-gorev-ekle diye çağırdık


const gorev_Listesi = document.querySelector('.gorev-listesi');
// containerın içinde         <ul        gittik




// yeni gorev ekle ne zaman click tıklanırsa gorev_Ekle fuctionuna gider
yeni_Gorev_Ekle_Btn.addEventListener('click',  gorev_Ekle);

gorev_Listesi.addEventListener('click',gorevSil_tamamlanınca);          // click yapınca sil ve ekle buttonlarını seçer
//gorevSil_tamamlanınca
document.addEventListener('DOMContentloaded',localStorage_Oku)      // "DOMContentloaded" VAR OLAN TÜM DOM YAPISI OLUŞUNCA ÇAĞIR
                                                                    // localStorage_Oku fonk çağır




function gorevSil_tamamlanınca(e){
""

    const tiklananEleman = e.target;        // target içeriği demek
                                            // tıklanan elemanın içeriğine bakarak işlem yaparız


    if(tiklananEleman.classList.contains('gorev-btn-tamamlandi')){     // tiklananElemanın classı eğer gorev-btn-tamamlandi ise checked buttonu tıklandı
        console.log('checked tıklandı');
        tiklananEleman.parentElement.classList.toggle('gorev-tamamlandi');  //tıklananELemanın sınıf listesine git varsa 'gorev-tamamlandi' yoksa ekle -- varsa sil
    }
    

    if(tiklananEleman.classList.contains('gorev-btn-sil')){      // tiklananElemanın classı eğer gorev-btn-sil ise sil buttonu tıklandı
        console.log('sil tıklandı');
        tiklananEleman.parentElement.classList.toggle('kaybol');                // kaybolma animasyonu

        const silinecekGorev = tiklananEleman.parentElement.children[0].innerText;
        console.log(silinecekGorev);
        localStorage_Sil();
        tiklananEleman.parentElement.addEventListener('transitionend',function(){

            tiklananEleman.parentElement.remove();
        })

    }
}



    function gorev_Ekle(e){

        e.preventDefault(); // başkabir sekmeye geçmesin diye


//*************************************************** */
        gorevItemolustur(yeni_Gorev.value);         




        //localStorage kaydettik
        local_StorageKaydet(yeni_Gorev.value);  // 

        yeni_Gorev.value= '';       //yeni_Gorev.value bu eklenme alanından sonra sil boşalt



}




function localStorage_arrayedönüştür(){

           
    let gorevler;

    if(localStorage.getItem('gorevler')== null){            // gorevler adlı bir arr yoksa oluştur gorevler[] arrayi

        gorevler = [];
    }
    else{
        gorevler =JSON.parse(localStorage.getItem('gorevler'));         // gorevler arryi varsa --> JSON formatında aldığımız arryi buna atadık
    }


    return gorevler;
}


    
    //LOCAL STORAGE KAYDETME
function local_StorageKaydet(yeni_Gorev){
        
     let gorevler=localStorage_arrayedönüştür();  //localStorage_arrayedönüştür fonksiyonuna git

    gorevler.push(yeni_Gorev);      //yeni_Gorev buna atadık kaydettik 


    localStorage.setItem('gorevler',JSON.stringify(gorevler));        // yen elemanı tekra yazma
}


// gorevler ilk açıldığında kapatıp açıldığında kadetmek için
function localStorage_Oku(){

       let gorevler=localStorage_arrayedönüştür();  //localStorage_arrayedönüştür fonksiyonuna git

    gorevler.foreach(function (gorev){          // her bir gorevi tektek gezer

        gorevItemolustur(gorev);
        
    });
}



function gorevItemolustur(gorev){

           // DİV OLUŞTURMA
        const gorevDiv =document.createElement('div');          //????????//   // Div oluşturma     
        gorevDiv.classList.add('gorev-item');                   // gorevDive  add (ekleme) görev-item  **classını ekleme**


        //Lİ OLUŞTURMA
        const gorevLi=document.createElement('li');             // li oluşturduk
        gorevLi.classList.add('gorev-tanim');                   //gorevLi ye gorev-tanimi ekledik
        
        gorevLi.innerText= gorev;                    // texti yeni_Gorev deki değerini aldık

        gorevDiv.appendChild(gorevLi);                      // gorevLi yi gorevDive ekliycez


        // GorevTamamlandı Buttonu oluşturuldu
        const gorev_Tamamlandı_Buttonu =document.createElement('button');       // bu buttonunda classları var
                                
        gorev_Tamamlandı_Buttonu.classList.add('gorev-btn');                   // gorev-btn ve gorev-btn-tamamlandı classını arar ve onu gorev_Tamamlandı_Buttonuna ekler
        gorev_Tamamlandı_Buttonu.classList.add('gorev-btn-tamamlandi');
        gorev_Tamamlandı_Buttonu.innerHTML=' <i class="fas fa-check-circle"></i>';   // görev tamamlandıktan sonra html kodu eklenir
        gorevDiv.appendChild(gorev_Tamamlandı_Buttonu);                                 // görev tamamlandı butonu ekledik 



        
        // gorev_sil_Buttonu Buttonu oluşturuldu
        const gorev_sil_Buttonu =document.createElement('button');       // bu buttonunda classları var
                                
        gorev_sil_Buttonu.classList.add('gorev-btn');                   // gorev-btn ve gorev-btn-tamamlandı classını arar ve onu gorev_Tamamlandı_Buttonuna ekler
        gorev_sil_Buttonu.classList.add('gorev-btn-sil');
        gorev_sil_Buttonu.innerHTML='  <i class="fas fa-trash-alt"></i> ';   // görev tamamlandıktan sonra html kodu eklenir
        gorevDiv.appendChild(gorev_sil_Buttonu);                                 // görev sil butonu ekledik 


        
        // UL YE OLUŞTURDUĞUMUZ DİVİ EKLEYELİM
        gorev_Listesi.appendChild(gorevDiv);

}


function localStorage_Sil(gorev){

    let gorevler=localStorage_arrayedönüştür;  //localStorage_arrayedönüştür fonksiyonuna git



   // SPLİCE İLE SİL
   const silinecekelemanIndex =gorevler.indexOf(gorev);
    console.log(silinecekelemanIndex);
    gorevler.splice(silinecekelemanIndex);
    gorevler.splice(silinecekelemanIndex,1);

    localStorage.setItem('gorevler',JSON.stringify(gorevler));

}

