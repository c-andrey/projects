
var create = document.getElementById("create")
var remove = document.getElementById("remove")
var update = document.getElementById("update")
var todos = document.getElementById("all")

window.onload = () => {

	document.getElementById("create").classList.toggle("hide")
	document.getElementById("remove").classList.toggle("hide")
	document.getElementById("update").classList.toggle("hide")
	document.getElementById("all").classList.toggle("hide")
	
}
function dropCreate() {
	var create = document.getElementById("create")
	if(create.classList.contains("hide")) {
		create.classList.remove("hide")
		create.classList.toggle("show")
} else {
	create.classList.remove("show")
	create.classList.toggle("hide")
}
	
}
function dropRemove() {
	var remove = document.getElementById("remove")
	if(remove.classList.contains("hide")) {
		remove.classList.remove("hide")
		remove.classList.toggle("show")
} else {
	remove.classList.remove("show")
	remove.classList.toggle("hide")
}
	
}
function dropUpdate() {
	var update = document.getElementById("update")
	if(update.classList.contains("hide")) {
		update.classList.remove("hide")
		update.classList.toggle("show")
} else {
	update.classList.remove("show")
	update.classList.toggle("hide")
}
	
}
function dropAll() {
	var todos = document.getElementById("all")
	if(todos.classList.contains("hide")) {
		todos.classList.remove("hide")
		todos.classList.toggle("show")
} else {
	todos.classList.remove("show")
	todos.classList.toggle("hide")
}
	
}