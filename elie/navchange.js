var oldlink = 'index'
var oldtext = "HOME";
function changeLinks(dest, clicked) {
	if (dest == "CLIENTS"){
		hide('main_home');
	    show('main_clients');
	    hide('main_about');
	    hide('main_press');
	    hide('main_shop');
	}else if (dest == "ABOUT"){
		hide('main_home');
	    hide('main_clients');
	    show('main_about');
	    hide('main_press');
	    hide('main_shop');
	}else if (dest == "PRESS"){
	    hide('main_home');
	    hide('main_clients');
	    hide('main_about');
	    show('main_press');
	    hide('main_shop');
	}else if (dest == "SHOP"){
		hide('main_home');
	    hide('main_clients');
	    hide('main_about');
	    hide('main_press');
	    show('main_shop');
	}else if (dest == "HOME"){
		show('main_home');
	    hide('main_clients');
	    hide('main_about');
	    hide('main_press');
	    hide('main_shop');
	}
	$("#" + clicked).text(oldtext);
	oldtext = dest;
}

function show(page) {
    $("#" + page).removeClass( "hidden" ).addClass( "visible" );          
}
function hide(page) {
    $("#" + page).removeClass( "visible" ).addClass( "hidden" ); 
}
$(".nav").click(function(e){
    e.preventDefault();
    changeLinks(e.target.text, e.target.id);
});