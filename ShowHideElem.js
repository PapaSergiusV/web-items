/*
 *	Функция плавного всплытия скрытого элемента: 
 *	opacity 0 --> 1; display: none --> block;
 *	Пример вызова функции: <a href="#1" onclick="showElem(1);"> через showElem
 */
function myFadeIn(elem, ms, cadrs){
	elem.style.display = 'block';
	var i = 0;
	var step = 1.0 / cadrs;
	ms = ms / cadrs;

	var fade = setInterval(function(){
		i += step; 
		elem.style.opacity = i; 
		if(i >= 1) {
			i = 1;
			stopFade();
		}
	}, ms);

	function stopFade(){
  		clearInterval(fade);
	}
}

/*
 *	Функция плавного скрытия элемента: 
 *	opacity --> 0; display --> none;
 *	вызывается аналогично: <a href="#1" class="closePW" onclick="hideElem()">Закрыть</a> через hideElem
 */
function myFadeOut(elem, ms, cadrs){
	var i = 1.0;
	var step = 1.0 / cadrs;
	ms = ms / cadrs;

	var fade = setInterval(function(){
		i -= step; 
		elem.style.opacity = i;
		if(i <= 0) {
			i = 0;
			stopFade();
		}
	}, ms);

	function stopFade(){
  		clearInterval(fade);
  		elem.style.display = 'none';
	}
}


function showElem(num){
	var page = document.getElementById('popUpWindow');	// элемент, который будет показан
	myFadeIn(page, 300, 20);							// вызов FadeIn
	var inPage = document.getElementsByClassName('inPopW')[0];
	
	// Формируем содержимое элемента, который будет показан

}

function hideElem(){
	var page = document.getElementById('popUpWindow');	// элемент, который будет скрыт
	myFadeOut(page, 300, 20);
}