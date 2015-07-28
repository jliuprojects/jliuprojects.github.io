function placeNotes() {
	var notes = $('.stickyNote');
	for (var i = 0; i < notes.length; i++){
		console.log(notes[i]);
		$(notes[i]).css({top: Math.floor((Math.random() * 80) + 0) + "%", left: Math.floor((Math.random() * 60) + 20) + "%"});
	}
}