  //パララックス呼び出し
parallax();

//Intersection Observer + Scroll Event Parallax Vanilla JS
function parallax() {
	'use strict';

	//class設定
	//表示エリア class
	const targetClass = '.js-parallax-elm-box';
	//動かす要素 class
	const childClass = '.js-parallax-elm';

	//表示エリア取得
	const targets = Array.prototype.slice.call(document.querySelectorAll(targetClass),0);
	//表示エリアが存在するかチェック
	if(targets.length === 0) {
		return false;
	}
  
	//ウィンドウの高さ取得
	let winH = window.innerHeight;
	window.addEventListener('resize', function(){
		winH = window.innerHeight;
	});

	//observer設定
	let observer = new IntersectionObserver(observerFunc, {
		root: null,
		rootMargin: '0px',
		threshold: 0
	});

	//初期設定
	let setListener =  [];
	targets.forEach((target,index) => {
		//Listener設定取得用の判別番号をセット
		target.setAttribute('data-index',index);
		//scrollイベントへ渡すlistener設定
		setListener.push(
			{
				target: target,
				handleEvent: function handleEvent () {
					parallaxFunk(target);
				}
			}
		);
		//初期表示の位置調整
		parallaxFunk(target);
		//observer監視開始
		observer.observe(target);
	});

	//observer処理
	function observerFunc(entries) {
		entries.forEach(entry => {
			//listener設定取得
			const listener =  setListener[entry.target.getAttribute('data-index')];
			if(entry.isIntersecting) {
				//画面に表示されている要素のみスクロールイベントへ追加
				window.addEventListener('scroll', listener, false);
			} else {
				//画面外のときはスクロールイベント削除
				window.removeEventListener('scroll', listener, false);
			}
		});
	}

	//パララックス位置調整関数
	function parallaxFunk(target) {
			//動かす要素を取得
			const child = target.querySelector(childClass);
			//動かす要素が存在するかチェック
			if(!child) {
				return false;
			}

			//スクロール量（ウィンドウの上端）取得
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			//スクロール量（ウィンドウの下端）取得
			const scrollBottom = scrollTop + winH;

			//表示エリアの位置取得
			const targetPosi =  target.getBoundingClientRect().top + scrollTop;
			//表示エリアの高さ取得
			const targetHeight =  target.clientHeight;

			//動かす要素の高さ取得
			const childHeight = child.clientHeight;
			//パララックス スクロールできる最大量を取得
			const maxVal = childHeight - targetHeight;
			//ウィンドウの高さに対するスクロール量を取得（小数点第2以下は四捨五入）
			const setVal = ((scrollBottom - targetPosi) * (maxVal/(winH+targetHeight))).toFixed(1);
			//スクロール値を設定
			child.style.transform = 'translate3d(0,'+(-setVal)+'px,0)';
	}
}