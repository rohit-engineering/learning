function submitProject() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var technology = document.getElementById("technology").value;
    
    if (title && description && technology) {
        document.getElementById("outputTitle").innerText = title;
        document.getElementById("outputDescription").innerText = description;
        document.getElementById("outputTechnology").innerText = technology;
        document.getElementById("projectOutput").style.display = "block";
    } else {
        alert("Please fill all fields!");
    }
}