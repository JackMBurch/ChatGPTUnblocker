// ==UserScript==
// @name     ChatGPT Unblocker
// @version  1
// @grant    none
// @author       Jack Burch
// @description  Easily export the whole ChatGPT conversation history for further analysis or sharing.
// @match        https://chat.openai.com/chat
// ==/UserScript==
var keepgoing = true;
var lastmsg;
main();

async function  main() {
	var msglist = document.querySelectorAll('[class^="request-:r0:-"]');
	if (msglist.length > 0) {
		var latestmsg = msglist[msglist.length - 1];
		console.log(latestmsg.innerText);
		console.log(latestmsg);
		if (latestmsg.innerText == 'Contents may violate our content policy') {
			console.log('lastmsg:');
			console.log(lastmsg);
			latestmsg.insertAdjacentElement('afterend', lastmsg);
			lastmsg.parentNode.removeChild(latestmsg);
			//keepgoing = false;
			setTimeout(clearErr, 0);
		}
		else {
			setTimeout(clearErr, 0);
			lastmsg = latestmsg.cloneNode(true);
		}
	}
	if (keepgoing) {
		setTimeout(main, 25);
	}
}

async function clearErr() {
	var warningIcon = document.querySelectorAll('.bg-red-500, .bg-orange-500')[0];
	if (warningIcon !== undefined) {
		warningIcon.parentNode.removeChild(warningIcon);
	}
	var warning = document.querySelectorAll('.border-red-500, .border-orange-500')[0];
	if (warning !== undefined) {
		if (warning.innerText === 'This content may violate our content policy. If you believe this to be in error, please submit your feedback — your input will aid our research in this area.') {
			warning.parentNode.removeChild(warning);
		}
	}
	var warningText = document.getElementsByClassName('text-orange-500')[0];
	if (warningText !== undefined) {
		warningText.classList.removeAttribute('text-orange-500');
		warningText.classList.add('text-grey-500');
	}
}